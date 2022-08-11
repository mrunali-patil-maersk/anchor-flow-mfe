// react
import { useEffect, useState } from "react";

// API axios instance
import { API, callApi } from "@/configs/apis/axiosAPI";

// actions
import { postBpmnDeployments } from "@/configs/actions/file";
import { bpmnDeploymentUrl } from "@/configs/apis/apiEndPoints";

// bpmn styles
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

// components
import { Button, Input, toastEmitter } from "@anchor/react-components";
import { BpmnRenderModelerClass } from "./bpmnModdlePropertiesPanel";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// configs
import { initialBpmnDiagram } from "@/configs/modeler.constant";

// utils
import { debounce, getRandomInt } from "src/utils/utils";

// styles
import {
  BpmnModeler,
  BpmnModelerContainer,
  BpmnModelerContainerCanvas,
  BpmnModelerButtons,
  BpmnModelerSectionModal,
  BpmnModelerModal,
  // BpmnModelerSectionModalText,
  BpmnModelerSectionModalInputContainer,
} from "src/styles/components/modeler/bpmnModeler.styles";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

// api axios
import { getDeploymentConfig } from "@/configs/actions/deployment";
import { apiGateway, deploymentBpmnUrlWithId } from "@/configs/apis/apiEndPoints";

/**
 * @name BpmnModelerPage
 * @description Method for generating the JSX for the BpmnModelerPage
 * @param deploymentId
 * @param deploymentResourceId
 * @returns JSX
 */
const BpmnModelerPage = ({
  deploymentId = "",
  deploymentResourceId = "",
}: {
  deploymentId: string | string[] | undefined;
  deploymentResourceId: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diagram, setDiagram] = useState<string>("");
  const [renderModeler, setRenderModeler] = useState<any>({});

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [deploymentName, setDeploymentName] = useState<string>("");
  const [tenantId, setTenantId] = useState<string>("");
  const [restEndpoint, setRestEndpoint] = useState<string>("");
  const [files, setFiles] = useState<object | undefined>([]);

  // method to fetch the BPMN file on load
  const getBpmn = async (deployment_id, deployment_resource_id) => {
    try {
      setIsLoading(true);
      // used to set the default BPMN Diagram
      if (deployment_id.includes("default")) {
        return setDiagram(initialBpmnDiagram(getRandomInt()));
      }

      const url: string = deploymentBpmnUrlWithId(deployment_id, deployment_resource_id);
      const config: any = getDeploymentConfig(url);
      // const { data } = await API(config);
      const { data } = await callApi(apiGateway + url);
      setDiagram(data);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get the BPMN diagram` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "bpmnModelerToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // used for api call method
  useEffect(() => {
    getBpmn(deploymentId, deploymentResourceId);
  }, [deploymentId, deploymentResourceId]);

  // used to set the instance of the class BpmnRenderModelerClass
  useEffect(() => {
    if (diagram.length && isLoading === false) {
      setRenderModeler(new BpmnRenderModelerClass(diagram));
    }
  }, [diagram, isLoading]);

  // saves the xml as a BPMN file
  const saveClick = () => {
    renderModeler.download();
  };

  // method to deploy the diagrams
  const deploy = () => {
    setModalOpen(false);
    (async function () {
      const data = await renderModeler.save();
      try {
        const config: any = postBpmnDeployments({
          file: data,
          tenantId: tenantId || "",
          deploymentName: deploymentName,
        });
        // await API(config);
        await callApi(apiGateway + bpmnDeploymentUrl, config);
      } catch (error) {
        toastEmitter(
          { title: `"Failed to deploy the BPMN file, Please try again later.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "bpmnModelerDeployToast",
          }
        );
        console.error(error);
      }
    })();
    handleModalClose();
  };

  // debounces to the save method
  const handleSaveClick = debounce(() => saveClick(), 500);

  // debounces to the deploy method
  const handleDeploy = debounce(() => deploy(), 500);

  // syncing the uploaded files with the state (not required for v1 release)
  // const handleUploadChange = (files) => {
  //   setFiles(files);
  // };

  // method closes the deploy modal
  const handleModalClose = () => {
    setModalOpen(false);
    setDeploymentName("");
    setTenantId("");
    setRestEndpoint("");
    setFiles([]);
  };

  return (
    <BpmnModeler>
      {isLoading && (
        <LoadingWrrapper>
          <LoadingSpinner />
        </LoadingWrrapper>
      )}
      {!isLoading && (
        <BpmnModelerContainer>
          <BpmnModelerContainerCanvas id="modeler__bpmn__canvas"></BpmnModelerContainerCanvas>
          <section id="modeler__bpmn__properties"></section>
        </BpmnModelerContainer>
      )}
      <BpmnModelerButtons>
        <Button variant="filled" label="Save" onClick={() => handleSaveClick()} />
        <Button
          variant="plain"
          icon="caret-down"
          label="Deploy"
          onClick={() => setModalOpen(true)}
        />
      </BpmnModelerButtons>
      <BpmnModelerModal
        zindex="99999"
        heading="Deploy Diagram"
        showCloseIcon={true}
        open={modalOpen}
        onClose={() => handleModalClose()}
        actions={{
          primaryAction: (
            <Button
              label="Deploy"
              disabled={!deploymentName.length}
              onClick={() => handleDeploy()}
            />
          ),
          secondaryAction: (
            <Button variant="outlined" label="Cancel" onClick={() => setModalOpen(false)} />
          ),
        }}
        size="medium"
      >
        <BpmnModelerSectionModal>
          <BpmnModelerSectionModalInputContainer>
            <Input
              label="Deployment Name"
              id="deployment-name"
              placeholder="Enter the deployment name"
              required={true}
              fit="medium"
              variant="default"
              errorMessage="Deployment Name is required"
              error={!deploymentName.length}
              value={deploymentName}
              onChange={({ target: { value } }) => setDeploymentName(value)}
            />
          </BpmnModelerSectionModalInputContainer>
          <BpmnModelerSectionModalInputContainer>
            <Input
              label="Tenant Id"
              id="tenant-id"
              placeholder="Enter the tenant id (optional)"
              required={false}
              fit="medium"
              variant="default"
              value={tenantId}
              onChange={({ target: { value } }) => setTenantId(value)}
            />
          </BpmnModelerSectionModalInputContainer>
          {/* The following code is not required for v1 release */}
          {/* <BpmnModelerSectionModalText variant="body1" fontStyle="bold" paragraph>
            <span>End point configuration</span>
          </BpmnModelerSectionModalText> */}
          {/* <BpmnModelerSectionModalInputContainer>
            <Input
              label="REST Endpoint"
              id="rest-endpoint"
              placeholder="Enter the REST endpoint URL"
              required={true}
              fit="medium"
              variant="default"
              errorMessage="REST Endpoint is required"
              error={!restEndpoint.length}
              value={restEndpoint}
              onChange={({ target: { value } }) => setRestEndpoint(value)}
            />
          </BpmnModelerSectionModalInputContainer>
          <BpmnModelerSectionModalText variant="body1" fontStyle="bold" paragraph>
            <span>Include additional files</span>
          </BpmnModelerSectionModalText>
          <Upload onChange={handleUploadChange} /> */}
        </BpmnModelerSectionModal>
      </BpmnModelerModal>
    </BpmnModeler>
  );
};

export default BpmnModelerPage;
