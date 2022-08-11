// react
import { useState, useEffect } from "react";

// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// API axios instance
import { callApi } from "@/configs/apis/axiosAPI";

// static components
const ProcessDefinitionPreviewWidget = dynamic(
  () => import("@/components/process/processPreview"),
  {
    ssr: false,
  }
);

// components
import { Button, toastEmitter } from "@anchor/react-components";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import ProcessInstanceDetailsTabs from "@/components/process/processInstance/processInstanceDetailsTabs";
import LeftPanel from "@/components/process/leftPanel";

// constants
import { getProcessDefinitionApiConfig, postProcessApiConfig } from "@/configs/actions/process";
import {
  apiGateway,
  processDefinitionXMLWithId,
  processInstancesUrl,
  taskFormProcessInstanceByIdUrl,
} from "@/configs/apis/apiEndPoints";
import { getDataBasedOnUrl } from "@/configs/actions/process";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

// styles
import { ProcessDefinitionsRoute } from "@styles/pages/process/process-definitions.styles";
import {
  ProcessDefinitionHeaderContainer,
  ProcessDefinitionHeaderButtonContainer,
  ProcessDefinitionSubPageContainer,
  ProcessDefinitionSubPageContainerRight,
} from "@styles/pages/process/details/process-definition-details.styles";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";

// redux
import { useAppSelector } from "src/redux/hook";
import { selectProcess } from "src/redux/selectors/processSelector";

/**
 * @name ProcessDefinitionInstanceDetails
 * @description Method for generating the JSX for the Process Definition Details Route
 * @returns JSX
 */
const ProcessDefinitionInstanceDetails = ({
  sidebarIsExpanded,
}: {
  sidebarIsExpanded: boolean;
}) => {
  const router = useRouter();
  const { id, processId } = router.query;

  // redux states
  const processState = useAppSelector(selectProcess);

  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [process, setProcess] = useState<any>({});
  const [processInstanceData, setProcessInstanceData] = useState<any>({});
  const [supperProcessInstance, setSuperProcessInstance] = useState<any>({});
  const [leftPanelData, setLeftPanelData] = useState<any>([]);

  // feature toggle: foresight feature!
  const isSidebarPanelActive = true;

  // method to fetch the BPMN file on load
  const getBpmnXml = async (id) => {
    try {
      setIsLoading(true);
      const url: string = processDefinitionXMLWithId(id);
      const config: any = getDataBasedOnUrl(url);
      const { bpmn20Xml: xml } = await callApi(apiGateway + url, config);
      setProcess({
        id: id,
        name: id,
        xml: xml,
        runningInstance: 0,
      });
    } catch (error) {
      toastEmitter(
        { title: `Failed to get the BPMN diagram.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "fetchProcessIdBpmn",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProcessInstanceById = async (processId) => {
    if (processId) {
      try {
        const config: any = getProcessDefinitionApiConfig(
          `${taskFormProcessInstanceByIdUrl(processId)}`
        );
        const result = await callApi(
          apiGateway + `${taskFormProcessInstanceByIdUrl(processId)}`,
          config
        );
        setProcessInstanceData(result);
      } catch (error) {
        toastEmitter(
          { title: `Failed to get Process Instance By Id.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "fetchProcessInstanceById",
          }
        );
        console.error(error);
      }
    }
  };

  const fetchSuperProcessInstance = async (processId) => {
    try {
      const body = { subProcessInstance: processId };
      const processInstanceConfig: any = postProcessApiConfig(
        `${processInstancesUrl}?maxResults=1`,
        body
      );
      const processInstance = await callApi(
        apiGateway + `${processInstancesUrl}?maxResults=1`,
        processInstanceConfig
      );
      setSuperProcessInstance(processInstance[0]);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get supper process instance data.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "fetchProcessInstanceData",
        }
      );
      console.error(error);
    }
  };

  const buildLeftPanelConfig = () => {
    const leftPanelData: any = [];

    if (Object.keys(processInstanceData).length > 0) {
      leftPanelData.push({
        label: "Instance ID",
        value: processInstanceData?.id || "-",
      });

      leftPanelData.push({
        label: "Business Key",
        value: processInstanceData?.businessKey || "-",
      });

      leftPanelData.push({
        label: "Definition version",
        value: processState.processDefinitionData?.version || "-",
      });

      leftPanelData.push({
        label: "Definition ID",
        value: processState.processDefinitionData?.id || "-",
      });

      leftPanelData.push({
        label: "Definition key",
        value: processState.processDefinitionData?.key || "-",
      });

      leftPanelData.push({
        label: "Definition name",
        value: processState.processDefinitionData?.name || "-",
      });

      leftPanelData.push({
        label: "Tenant ID",
        value: processInstanceData?.tenantId || "-",
      });

      leftPanelData.push({
        label: "Deploymenty ID",
        value: processState.processDefinitionData?.deploymentId || "-",
      });
    }

    leftPanelData.push({
      label: "Super process instance ID",
      value: supperProcessInstance?.id || "-",
    });

    setLeftPanelData(leftPanelData);
  };

  // used for api call method
  useEffect(() => {
    getBpmnXml(id);
  }, [id]);

  // calls api to get left panel data of process instance screen
  useEffect(() => {
    fetchProcessInstanceById(processId);
    fetchSuperProcessInstance(processId);
  }, [processId]);

  useEffect(() => {
    buildLeftPanelConfig();
  }, [processInstanceData]);

  // @TODO - Add the handle suspend process functionality once available
  const handleSuspendProcess = () => {
    console.log("Handle suspend process clicked.");
  };

  // @TODO - Add the handle change job priority functionality once available
  const handleChangePriority = () => {
    console.log("Handle change job priority clicked.");
  };

  const isProcessLoaded = !isLoading && Object.keys(process)?.length > 0;
  const processInstanceHeadingName = processId; // to do
  /*isProcessLoaded && processDefinitionData
      ? processDefinitionData.name || processDefinitionData.key
      : "";*/

  return (
    <ProcessDefinitionsRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ProcessDefinitionHeaderContainer>
        <MainHeading fontStyle="normal" variant="h3">
          {processInstanceHeadingName}
        </MainHeading>
        <ProcessDefinitionHeaderButtonContainer>
          <Button
            label="Delete Running process"
            variant="outlined"
            icon="trash"
            iconPosition="left"
          />
          <Button label="Add Variable" variant="outlined" icon="plus" iconPosition="left" />
          <Button label="Suspend Process" variant="outlined" icon="cog" iconPosition="left" />
        </ProcessDefinitionHeaderButtonContainer>
      </ProcessDefinitionHeaderContainer>
      <ProcessDefinitionSubPageContainer
        className={isSidebarPanelActive ? "grid-col-2" : "grid-col-full"}
      >
        <LeftPanel isActive={isSidebarPanelActive} data={leftPanelData} />
        <ProcessDefinitionSubPageContainerRight>
          {isLoading && (
            <LoadingWrrapper>
              <LoadingSpinner />
            </LoadingWrrapper>
          )}
          {isProcessLoaded && (
            <ProcessDefinitionPreviewWidget
              key={process.id}
              title={process.name}
              xml={process.xml}
              instance={process.runningInstance}
              uniqueId={`process-details-${Math.floor(Math.random() * 100000)}`}
              isDetailsPage={true}
            />
          )}
          <ProcessInstanceDetailsTabs
            processInstanceId={processId}
            processDefinitionId={processInstanceData?.definitionId}
          />
        </ProcessDefinitionSubPageContainerRight>
      </ProcessDefinitionSubPageContainer>
    </ProcessDefinitionsRoute>
  );
};

// Protected routes
ProcessDefinitionInstanceDetails.requireAuth = true;
export default ProcessDefinitionInstanceDetails;
