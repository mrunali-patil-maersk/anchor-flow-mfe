// react
import { useState, useEffect } from "react";

// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// API axios instance
import { callApi } from "@/configs/apis/axiosAPI";

// redux
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";

// static components
const ProcessDefinitionPreviewWidget = dynamic(
  () => import("@/components/process/processPreview"),
  {
    ssr: false,
  }
);

// components
import { Button, Switch, toastEmitter } from "@anchor/react-components";
import ProcessDefinationTabs from "@/components/process/processDefinationTabs";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import ProcessModal from "@/components/process/processModal";

// constants
import { getProcessDefinitionApiConfig } from "@/configs/actions/process";
import {
  apiGateway,
  processDefinitionApiUrl,
  processDefinitionXMLWithId,
  processInstanceCountApiUrl,
} from "@/configs/apis/apiEndPoints";
import { getDataBasedOnUrl } from "@/configs/actions/process";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

// styles
import {
  ProcessDefinitionsRoute,
  ProcessDefinitionHeader,
} from "@styles/pages/process/process-definitions.styles";
import {
  ProcessDefinitionHeaderContainer,
  ProcessDefinitionHeaderButtonContainer,
  ProcessDefinitionSubPageContainer,
  ProcessDefinitionSubPageContainerRight,
  ProcessDefinitionSubPageContainerRightHeader,
} from "@styles/pages/process/details/process-definition-details.styles";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";
import LeftPanel from "@/components/process/leftPanel";

// redux
import { selectProcess } from "src/redux/selectors/processSelector";
import { updateProcessDefinitionData } from "src/redux/feature/processSlice";
import { activateProcess, suspendProcess } from "@/configs/process.constant";
import ChangeJobPriorityModal from "@/components/process/changeJobPriority";

/**
 * @name ProcessDefinitionDetails
 * @description Method for generating the JSX for the Process Definition Details Route
 * @returns JSX
 */
const ProcessDefinitionDetails = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const router = useRouter();
  const { id: processId, suspended } = router.query;
  const processIdState = Boolean(suspended);
  // redux
  const processState = useAppSelector(selectProcess);
  const dispatch = useAppDispatch();

  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [process, setProcess] = useState<any>({});
  const [activityInstance, setActivityInstance] = useState<boolean>(false);
  const [currentVersionCount, setCurrentVersionCount] = useState<number>();
  const [allVersionCount, setAllVersionCount] = useState<number>();
  const [leftPanelData, setLeftPanelData] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPriorityModal, setShowPriorityModal] = useState<boolean>(false);
  const [suspendedState, setSuspendedState] = useState<boolean>(processIdState);
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
          toastId: "processDefinitionDetailsGetBpmn",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProcessDefinitionById = async (id) => {
    if (id) {
      try {
        const config: any = getProcessDefinitionApiConfig(`${processDefinitionApiUrl}/${id}`);
        const result = await callApi(apiGateway + `${processDefinitionApiUrl}/${id}`, config);
        dispatch(updateProcessDefinitionData(result));
      } catch (error) {
        toastEmitter(
          { title: `Failed to get Process Definition.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "fetchProcessDefinitionDetails",
          }
        );
        console.error(error);
      }
    }
  };

  const fetchCurrentVersionProcessInstanceCount = async (id) => {
    if (id) {
      try {
        const currentVersionCountApiConfig: any = getProcessDefinitionApiConfig(
          `${processInstanceCountApiUrl}?processDefinitionId=${id}`
        );
        const { count } = await callApi(
          apiGateway + `${processInstanceCountApiUrl}?processDefinitionId=${id}`,
          currentVersionCountApiConfig
        );
        setCurrentVersionCount(count);
      } catch (error) {
        toastEmitter(
          { title: `Failed to get current version process instance count.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "fetchProcessInstanceCountDetails",
          }
        );
        console.error(error);
      }
    }
  };

  const fetchAllVersionProcessInstanceCount = async (id) => {
    if (id) {
      try {
        const allVersionCountApiConfig: any = getProcessDefinitionApiConfig(
          `${processInstanceCountApiUrl}?processDefinitionKey=${id.split(":")[0]}`
        );
        const { count } = await callApi(
          apiGateway + `${processInstanceCountApiUrl}?processDefinitionKey=${id.split(":")[0]}`,
          allVersionCountApiConfig
        );
        setAllVersionCount(count);
      } catch (error) {
        toastEmitter(
          { title: `Failed to get all version process instance count.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "fetchAllProcessInstanceCountDetails",
          }
        );
        console.error(error);
      }
    }
  };

  const buildLeftPanelConfig = () => {
    const leftPanelData: any = [];

    if (Object.keys(processState.processDefinitionData).length > 0) {
      leftPanelData.push({
        label: "Definition version",
        value: processState.processDefinitionData?.version || "-",
        type: "selectBox",
      });

      leftPanelData.push({
        label: "Version tag",
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
        label: "History time to live",
        value: processState.processDefinitionData?.historyTimeToLive || "-",
      });

      leftPanelData.push({
        label: "Tenant ID",
        value: processState.processDefinitionData?.tenantId || "-",
      });

      leftPanelData.push({
        label: "Deploymenty ID",
        value: processState.processDefinitionData?.deploymentId || "-",
      });
    }

    leftPanelData.push({
      label: "Instances running",
      subLabel: [
        {
          label: "Current version",
          value: currentVersionCount || "-",
        },
        {
          label: "All versions",
          value: allVersionCount || "-",
        },
      ],
    });

    setLeftPanelData(leftPanelData);
  };

  // used for api call method, calls api to get left panel data of process definition
  useEffect(() => {
    getBpmnXml(processId);
    fetchProcessDefinitionById(processId);
    fetchCurrentVersionProcessInstanceCount(processId);
    fetchAllVersionProcessInstanceCount(processId);
  }, [processId, suspendedState]);

  // calls buildLeftPanelConfig() function to build left panel config of process definition
  useEffect(() => {
    buildLeftPanelConfig();
  }, [processState.processDefinitionData, allVersionCount, currentVersionCount, suspendedState]);

  // handle suspend process functionality
  const handleSuspendProcess = () => {
    setShowModal(true);
  };

  // Add the handle change job priority functionality once available
  const handleChangePriority = () => {
    setShowPriorityModal(true);
  };
  // handle page reload based upon operation
  const reloadPage = (processExcecute) => {
    if (processExcecute == "immediately") {
      router.push({ query: { ...router.query, suspended: !suspendedState } });
      setShowModal(false);
      setSuspendedState(!suspendedState);
    } else {
      setShowModal(false);
    }
  };
  //handle modal show hide
  const handleShowModal = (value) => {
    setShowModal(value);
  };

  //handle change priority modal show hide
  const handleChangePriorityModal = (value) => {
    setShowPriorityModal(value);
  };
  const isProcessLoaded =
    !isLoading && Object.keys(process)?.length > 0 && leftPanelData.length > 1;
  const processHeadingName =
    isProcessLoaded && processState.processDefinitionData
      ? processState.processDefinitionData.name || processState.processDefinitionData.key
      : "";
  return (
    <ProcessDefinitionsRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ProcessDefinitionHeaderContainer>
        <MainHeading fontStyle="normal" variant="h3">
          {processHeadingName}
        </MainHeading>
        <ProcessDefinitionHeaderButtonContainer>
          <Button
            label={suspendedState ? "Activate Process" : "Suspend Process"}
            variant="outlined"
            icon={suspendedState ? "play" : "pause"}
            iconPosition="left"
            onClick={() => handleSuspendProcess()}
          />
          <Button
            label="Change job priority"
            variant="outlined"
            icon="cog"
            iconPosition="left"
            onClick={() => handleChangePriority()}
          />
          {showModal && (
            <ProcessModal
              showModalValue={true}
              processId={processId}
              suspendState={suspendedState}
              processObject={suspendedState ? activateProcess : suspendProcess}
              onHandlePageReload={(processExcecute) => reloadPage(processExcecute)}
              handleModalShowHide={(value) => handleShowModal(value)}
            />
          )}

          {showPriorityModal && (
            <ChangeJobPriorityModal
              showModalValue={true}
              processId={processId}
              handleModalShowHide={(value) => handleChangePriorityModal(value)}
            />
          )}
        </ProcessDefinitionHeaderButtonContainer>
      </ProcessDefinitionHeaderContainer>
      <ProcessDefinitionSubPageContainer
        className={isSidebarPanelActive ? "grid-col-2" : "grid-col-full"}
      >
        {leftPanelData.length > 1 && <LeftPanel isActive={true} data={leftPanelData} />}
        <ProcessDefinitionSubPageContainerRight>
          <ProcessDefinitionSubPageContainerRightHeader>
            <Switch
              checked={activityInstance}
              type="standard"
              id="process_definition_details_activity_instance"
              label="Activity instance statistics:"
              onChange={() => setActivityInstance(!activityInstance)}
              orientation="vertical"
            />
          </ProcessDefinitionSubPageContainerRightHeader>
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
          <ProcessDefinationTabs processDefinitionId={processId} />
        </ProcessDefinitionSubPageContainerRight>
      </ProcessDefinitionSubPageContainer>
    </ProcessDefinitionsRoute>
  );
};

// Protected routes
ProcessDefinitionDetails.requireAuth = true;
export default ProcessDefinitionDetails;
