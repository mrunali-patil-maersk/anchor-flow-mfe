// react
import { useEffect, useState } from "react";

// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// components
import ProcessList from "src/components/process/processList";
import { toastEmitter } from "@anchor/react-components";

// configs
import { getDesicionsIncidentConfig } from "@/configs/actions/decisions-definitions";
import { callApi } from "@/configs/apis/axiosAPI";
import {
  decisionsInstancesUrl,
  deploymentDmnUrlWithId,
  DecisionDefintionLeftPanelUrl,
  apiGateway,
} from "@/configs/apis/apiEndPoints";
import { getDeploymentConfig } from "@/configs/actions/deployment";

// dynamic static components
const DynamicDmnViewerComponent = dynamic(
  () => import("../../../../components/modeler/dmnViewer"),
  {
    ssr: false,
  }
);

// styles
import { ProcessDefinitionsRoute } from "@styles/pages/process/process-definitions.styles";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

import {
  DecisionDefinitionSubPageContainer,
  DecisionDefinitionSubPageContainerRight,
  DecisionDefinitionSubPageRightContents,
} from "@styles/pages/process/details/decision-definition-details.styles";

// constants
import {
  DefinitionDefinitionRowPrimaryKey,
  DefinitionDefinitionColumnData,
  leftPanelData,
} from "src/configs/decision.constant";

import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";
import LeftPanel from "@/components/process/leftPanel";

//date library
import dayjs from "dayjs";

/**
 * @name ProcessDefinitionDetails
 * @description Method for generating the JSX for the Process Definition Details Route
 * @returns JSX
 */
const DecisionDefinitionDetails = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const router = useRouter();
  const { id: instance } = router.query;
  const [diagram, setDiagram] = useState<string>("");
  const [desicionDefinitionSearchText, setDesicionDefinitionSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [DecisionInstanceRowData, setDecisionInstanceRowData] = useState<any>([]);
  const [DecisionDefinitionLeftPanelData, setDecisionDefinitionLeftPanelData] = useState<any>([]);
  const isSidebarPanelActive = true; //Feature toggle: foresight feature!

  /**
   * @name getdecisionsdefintionsLists
   * @description Method for fetching the decisions-defintions list data using API and updates the state
   * @param none
   * @returns none
   */
  const getDecisionsDefintionsLists = async (
    id,
    firstResult = 0,
    sortBy = "evaluationTime",
    sortOrder = "desc"
  ) => {
    try {
      setIsLoading(true);
      const url: string = decisionsInstancesUrl(id);
      const config: any = getDesicionsIncidentConfig(url, firstResult, 50, sortBy, sortOrder);
      const response = await callApi(apiGateway + url, config);
      setDecisionInstanceRowData(
        response.map((item) => {
          return {
            id: item.id,
            evaluation_time: dayjs(item.evaluationTime).format("YYYY-MM-DD hh:mm:ss"),
            calling_process: item.processDefinitionKey,
            calling_instance_id: item.processInstanceId,
            activity_id: item.activityId,
          };
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // method to fetch the DMN file on load
  const getDmn = async (id) => {
    try {
      setIsLoading(true);
      const url: string = deploymentDmnUrlWithId(id);
      const config: any = getDeploymentConfig(url);
      const  { dmnXml } = await callApi(apiGateway + url, config);
      setDiagram(dmnXml);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get the DMN diagram.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "fetchDmnDiagram",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // method to fetch the DMN file on load
  const getSidePanelData = async (id) => {
    try {
      setIsLoading(true);
      const url: string = DecisionDefintionLeftPanelUrl(id);
      const config: any = getDeploymentConfig(url);
      const response = await callApi(apiGateway + url, config);
      setDecisionDefinitionLeftPanelData({
        version: response.version,
        version_tag: response.versionTag,
        id: response.id,
        key: response.key,
        name: response.name,
        history_time: {
          label: response.historyTimeToLive,
          cta: "",
        },
        tenant_id: response.tenantId,
        deployment: {
          label: response.deploymentId,
          cta: "",
        },
        decision_req_definition: response.decisionRequirementsDefinitionId,
      });
    } catch (error) {
      toastEmitter(
        { title: `Failed to get the decision defintion left panel data.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "decisionDefintionLeftPanelData",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // used to fetch a demo diagram, depends on the diagram state
  useEffect(() => {
    getDmn(instance);
    getSidePanelData(instance);
    getDecisionsDefintionsLists(instance);
  }, [instance]);

  const isDefinitionLoaded = !isLoading && Object.keys(DecisionInstanceRowData)?.length > 0;
  const definitionHeadingName = isDefinitionLoaded
    ? DecisionDefinitionLeftPanelData.name || DecisionDefinitionLeftPanelData.key
    : "";

  return (
    <ProcessDefinitionsRoute sidebarIsExpanded={sidebarIsExpanded}>
      <MainHeading fontStyle="normal" variant="h3">
        {definitionHeadingName}
      </MainHeading>
      <DecisionDefinitionSubPageContainer
        className={isSidebarPanelActive ? "grid-col-2" : "grid-col-full"}
      >
        <LeftPanel isActive={isSidebarPanelActive} data={leftPanelData} />
        <DecisionDefinitionSubPageContainerRight sidebarIsExpanded={sidebarIsExpanded}>
          {diagram && (
            <DynamicDmnViewerComponent diagram={diagram} sidebarIsExpanded={sidebarIsExpanded} />
          )}
          <DecisionDefinitionSubPageRightContents>
            {/* <DecisionDefinitionSubPageSearchTextContainer>
              <Input
                clearButton
                id="decision_definitions_search"
                placeholder="Add criteria"
                variant="default"
                label="Decision instances"
                value={desicionDefinitionSearchText}
                onChange={({ target: { value } }) => setDesicionDefinitionSearchText(value)}
                onClear={() => setDesicionDefinitionSearchText("")}
              />
            </DecisionDefinitionSubPageSearchTextContainer> */}

            <>
              {isLoading && (
                <LoadingWrrapper>
                  <LoadingSpinner />
                </LoadingWrrapper>
              )}
              {!isLoading && (
                <>
                  <ProcessList
                    rowData={DecisionInstanceRowData}
                    columnData={DefinitionDefinitionColumnData}
                    primaryKey={DefinitionDefinitionRowPrimaryKey}
                  />
                </>
              )}
            </>
          </DecisionDefinitionSubPageRightContents>
        </DecisionDefinitionSubPageContainerRight>
      </DecisionDefinitionSubPageContainer>
    </ProcessDefinitionsRoute>
  );
};

// Protected routes
DecisionDefinitionDetails.requireAuth = true;
export default DecisionDefinitionDetails;
