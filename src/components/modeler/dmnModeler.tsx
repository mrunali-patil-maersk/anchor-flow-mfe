// react
import { useEffect, useState } from "react";

// API axios instance
import { callApi } from "@/configs/apis/axiosAPI";

// bpmn styles
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-font/css/dmn.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-codes.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-embedded.css";
import "dmn-js-properties-panel/dist/assets/dmn-js-properties-panel.css";

// components
import { Button, Input, toastEmitter } from "@anchor/react-components";
import { DmnRenderModelerClass } from "./dmnModdlePropertiesPanel";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// configs
import { initialDmnDiagram } from "@/configs/modeler.constant";

// utils
import { debounce, getRandomInt } from "src/utils/utils";

// styles
import {
  DmnModelerSection,
  DmnModelerSectionContainer,
  DmnModelerSectionContainerCanvas,
  DmnModelerSectionButtons,
  DmnModelerSectionModal,
  DmnModelerModal,
  // DmnModelerSectionModalText,
  DmnModelerSectionModalInputContainer,
} from "src/styles/components/modeler/dmnModeler.styles";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

// api axios
import { getDeploymentConfig } from "@/configs/actions/deployment";
import { apiGateway, deploymentDmnUrlWithId } from "@/configs/apis/apiEndPoints";

/**
 * @name DmnModelerPage
 * @description Method for generating the JSX for the DmnModelerPage
 * @param deploymentId
 * @returns JSX
 */
const DmnModelerPage = ({ deploymentId }: { deploymentId: string | string[] | undefined }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [diagram, setDiagram] = useState<string>("");
  const [renderModeler, setRenderModeler] = useState<any>({});

  // modal states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deploymentName, setDeploymentName] = useState<string>("");
  const [tenantId, setTenantId] = useState<string>("");
  const [restEndpoint, setRestEndpoint] = useState<string>("");
  const [files, setFiles] = useState<object | undefined>([]);

  // method to fetch the DMN file on load
  const getDmn = async (deployment_id) => {
    try {
      setIsLoading(true);

      // used to set the default DMN Diagram
      if (deployment_id.includes("default")) {
        return setDiagram(initialDmnDiagram(getRandomInt()));
      }

      const url: string = deploymentDmnUrlWithId(deployment_id);
      const config: any = getDeploymentConfig(url);
      // const {
      //   data: { dmnXml },
      // }: any = await API(config);
      const {
        data: { dmnXml },
      } = await callApi(apiGateway + url, config);
      setDiagram(dmnXml);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get the DMN diagram.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "dmnModelerToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // used for api call method
  useEffect(() => {
    getDmn(deploymentId);
  }, [deploymentId]);

  // used to render the updated diagram
  useEffect(() => {
    if (diagram.length && isLoading === false) {
      setRenderModeler(new DmnRenderModelerClass(diagram));
    }
  }, [diagram, isLoading]);

  // saves the xml as a DMN file
  const saveClick = () => {
    renderModeler.download();
  };

  // method to deploy the diagrams
  const deploy = () => {
    setModalOpen(false);
    (async function () {
      const data = await renderModeler.save();
      console.log(data);
    })();

    // @TODO - Integrate it with the API once the APIs are ready
    console.log(deploymentName);
    console.log(tenantId);
    console.log(restEndpoint);
    console.log(files);
  };

  // debounces to the save method
  const handleSaveClick = debounce(() => saveClick(), 500);

  // debounces to the deploy method
  const handleDeploy = debounce(() => deploy(), 500);

  // syncing the uploaded files with the state (not required for v1 release)
  // const handleUploadChange = (files) => {
  //   setFiles(files);
  // };

  return (
    <DmnModelerSection>
      {isLoading && (
        <LoadingWrrapper>
          <LoadingSpinner />
        </LoadingWrrapper>
      )}
      {!isLoading && (
        <DmnModelerSectionContainer>
          <DmnModelerSectionContainerCanvas id="modeler__dmn__canvas"></DmnModelerSectionContainerCanvas>
          <section id="modeler__dmn__properties" className="modeler__dmn__properties"></section>
        </DmnModelerSectionContainer>
      )}
      <DmnModelerSectionButtons>
        <Button variant="filled" label="Save" onClick={() => handleSaveClick()} />
        <Button
          variant="plain"
          icon="caret-down"
          label="Deploy"
          onClick={() => setModalOpen(true)}
        />
      </DmnModelerSectionButtons>
      <DmnModelerModal
        zindex="99999"
        heading="Deploy Diagram"
        showCloseIcon={true}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
        <DmnModelerSectionModal>
          <DmnModelerSectionModalInputContainer>
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
          </DmnModelerSectionModalInputContainer>
          <DmnModelerSectionModalInputContainer>
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
          </DmnModelerSectionModalInputContainer>
          {/* The following code is not required for v1 release */}
          {/* <DmnModelerSectionModalText variant="body1" fontStyle="bold" paragraph>
            <span>End point configuration</span>
          </DmnModelerSectionModalText>
          <DmnModelerSectionModalInputContainer>
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
          </DmnModelerSectionModalInputContainer>
          <DmnModelerSectionModalText variant="body1" fontStyle="bold" paragraph>
            <span>Include additional files</span>
          </DmnModelerSectionModalText>
          <Upload onChange={handleUploadChange} /> */}
        </DmnModelerSectionModal>
      </DmnModelerModal>
    </DmnModelerSection>
  );
};

export default DmnModelerPage;
