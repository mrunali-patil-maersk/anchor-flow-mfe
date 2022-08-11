// react
import { useState, useEffect } from "react";

// components
import { Tabs, toastEmitter } from "@anchor/react-components";
import ListView from "@/components/listView/listView";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// interfaces
interface ItemType {
  id: string;
  title: string;
  active: boolean;
}

interface TabItemProps {
  selectedItemId: string;
  updatedTabData: Array<ItemType>;
}

// constants
import {
  processInstanceTabItemsConfig,
  VariableColumnData,
  VariablePrimaryKey,
  callProcessDefinitionsColumnData,
  calledProcessInstancePrimaryKey,
  scrollHeightTabs,
  processInstanceRowData,
  IncidentListColumnData,
  IncidentListPrimaryKey,
  userTaskColumnData,
  userTaskInstancePrimaryKey,
  jobsColumnData,
  jobsPrimaryKey,
  jobsRowData,
  externalTaskColumnData,
  externalTaskPrimaryKey,
} from "src/configs/processInstance.constant";

// configs
import {
  VariableListUrl,
  processIncidentsUrl,
  taskListGetIdUrl,
  processInstanceJobsUrl,
  externalTaskAPIUrl,
  apiGateway,
  calledProcessInstancesUrl,
} from "@/configs/apis/apiEndPoints";

//configs
import {
  getVariableListConfig,
  getDataBasedOnUrl,
  processInternalPostInstanceApiConfig,
  postProcessApiConfig,
} from "@/configs/actions/process";

import { callApi } from "@/configs/apis/axiosAPI";

// styles
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { ProcessListTabContainer } from "@styles/components/process/processList.styles";

// date library
import { getLongformattedDateTime } from "src/utils/dateTimeUtils";

const ProcessInstanceDetailsTabs = ({
  processInstanceId,
  processDefinitionId,
}: {
  processInstanceId: string | string[] | undefined;
  processDefinitionId: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabItems, setTabItems] = useState<Array<ItemType>>(processInstanceTabItemsConfig);
  const [activeTab, setActiveTab] = useState<string>("variables");
  const [VariablesList, setVariablesList] = useState<any>({});
  const [IncidentList, setIncidentList] = useState<any>({});
  const [jobsInstancesList, setjobsInstancesList] = useState<Array<any>>([]);
  const [userTaskInstancesList, setUserTaskInstancesList] = useState<Array<any>>([]);
  const [externalTaskData, setExternalTaskData] = useState<Array<any>>([]);
  const [calledProcessInstancesList, setcalledProcessInstancesList] = useState<Array<any>>([]);
  // const [processInstanceList, setProcessInstanceList] = useState<any>({});
  // const [processIncidentList, setProcessIncidentList] = useState<any>({});
  // const [callProcessDefinitionsData, setcallProcessDefinitionsRowData] = useState<any>([]);

  // return process intance tab data which we need to pass into row data
  const getVariableList = async (firstResult = 0) => {
    try {
      setIsLoading(true);
      const config: any = getVariableListConfig(
        VariableListUrl,
        firstResult,
        10,
        false,
        processInstanceId
      );
      // const { data: response } = await API(config);
      const response = await callApi(apiGateway + VariableListUrl, config);

      setVariablesList(
        response.map((item) => {
          return {
            id: item.id,
            name: item.name,
            type: item.type,
            value: item.value,
            scope: " ",
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get VariableList` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "VariableList",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  // return process intance tab data which we need to pass into row data
  const getProcessIncidentList = async (firstResult = 0) => {
    try {
      setIsLoading(true);
      const url: string = processIncidentsUrl(processInstanceId);
      const config: any = getDataBasedOnUrl(url);
      // const { data: response } = await API(config);

      const response = await callApi(apiGateway + url, config);
      setIncidentList(
        response.map((item) => {
          return {
            incident_message: item.incidentMessage,
            incident_timestamp: item.incidentTimestamp,
            incident_activity: item.activityId,
            incident_cause_instance: item.causeIncidentId,
            incident_failing_activity: item.failedActivityId,
            root_cause_pr: item.rootCauseIncidentId,
            type: item.incidentType,
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get IncidentList` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "IncidentList",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  // return process intance tab data which we need to pass into row data

  // return process intance called process tab data which we need to pass into row data
  const getCalledProcessInstanceList = async () => {
    try {
      setIsLoading(true);
      const url: string = calledProcessInstancesUrl(processInstanceId);
      const config: any = getDataBasedOnUrl(url);
      const response = await callApi(apiGateway + url, config);
      setcalledProcessInstancesList(
        response.map((item) => {
          return {
            state: item.incidents.length ? "Failed" : "Success",
            calledProcessInstance: item.id,
            processDefinition: item.processDefinitionKey,
            processActivity: item.callActivityId,
          };
        })
      );
      // setcalledProcessInstancesList(processInstanceRowData);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get called processInstance Row Data` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "userTaskDataId",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // return process intance  user task tab data which we need to pass into row data
  const getUserTaskInstanceList = async (processInstanceId, processDefinitionId) => {
    try {
      const url: string = taskListGetIdUrl;
      const body = {
        processInstanceId: processInstanceId,

        processDefinitionId: processDefinitionId,

        sorting: [
          {
            sortBy: "created",

            sortOrder: "desc",
          },
        ],
      };
      const config: any = processInternalPostInstanceApiConfig(url, body);
      // const { data: response } = await API(config);
      const response = await callApi(apiGateway + url, config);
      setUserTaskInstancesList(
        response.map((item) => {
          return {
            activity: item.taskDefinitionKey,
            assignee: item.assignee,
            owner: item.owner,
            creationDate: item.created ? getLongformattedDateTime(item.created) : "-",
            dueDate: item.due ? getLongformattedDateTime(item.due) : "-",
            followUpDate: item.followUp ? getLongformattedDateTime(item.followUp) : "-",
            priority: item.priority,
            delegationState: item.delegationState,
            taskID: item.executionId,
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get userTask Row Data` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "userTaskDataId",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // return process intance  get jobs tab data which we need to pass into row data
  const getJobsInstanceList = async (processInstanceId) => {
    try {
      const url: string = processInstanceJobsUrl;
      const body = {
        processInstanceId: processInstanceId,
        sorting: [
          {
            sortBy: "jobId",

            sortOrder: "desc",
          },
        ],
      };
      const config: any = processInternalPostInstanceApiConfig(url, body);
      // const { data: response } = await API(config);
      const response = await callApi(apiGateway + url, config);
      // console.log("data response", response, responses);
      // setjobsInstancesList(jobsRowData);
      setjobsInstancesList(
        response.map((item) => {
          return {
            jobId: item.id,
            jobDueDate: item.dueDate ? getLongformattedDateTime(item.dueDate) : "-",
            jobCreationDate: item.createTime ? getLongformattedDateTime(item.createTime) : "-",
            jobRetries: String(item.retries),
            jobActivity: item.failedActivityId,
            jobFallingActivity: item.failedActivityId,
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get jobs Row Data` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "jobsDataId",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getExternalTaskTabData = async () => {
    try {
      const body = {
        processInstanceId: processInstanceId,
        sorting: [
          {
            sortBy: "taskPriority",
            sortOrder: "asc",
          },
        ],
      };
      const externalTaskAPIConfig: any = postProcessApiConfig(externalTaskAPIUrl, body);
      // const response = await API(externalTaskAPIConfig);
      const response = await callApi(apiGateway + externalTaskAPIUrl, externalTaskAPIConfig);

      setExternalTaskData(response);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get ExternalTask Row Data` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "externalTaskTabId",
        }
      );
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = (activeTab: string) => {
      switch (activeTab) {
        default:
          return getVariableList();
        case "variables":
          return getVariableList();
        case "processIncidents":
          return getProcessIncidentList();
        case "calledProcessInstances":
          return getCalledProcessInstanceList();
        case "userTask":
          return getUserTaskInstanceList(processInstanceId, processDefinitionId);
        case "jobs":
          return getJobsInstanceList(processInstanceId);
        case "externalTask":
          return getExternalTaskTabData();
      }
    };
    fetchData(activeTab);
  }, [activeTab, processInstanceId, processDefinitionId]);

  /**
   * @name handleClick
   * @description Method for updating the state after the tab clicks
   * @param value
   */
  const handleClick = ({ selectedItemId, updatedTabData }: TabItemProps) => {
    setActiveTab(selectedItemId);
    setTabItems(updatedTabData);
  };

  //reusable method for generating the list view based on the tabs
  const getListView = (
    isLoading,
    rowData,
    columnData,
    primaryKey,
    searchBarVisibile,
    scrollHeight
  ) => {
    return (
      <>
        {isLoading && (
          <LoadingWrrapper>
            <LoadingSpinner />
          </LoadingWrrapper>
        )}
        {!isLoading && (
          <>
            <ListView
              rowData={rowData}
              columnData={columnData}
              primaryKey={primaryKey}
              searchBarVisibile={searchBarVisibile}
              scrollHeight={scrollHeight}
            />
          </>
        )}
      </>
    );
  };

  // returns the process instance list view or preview based on the type
  const renderProcessInstanceChildrenContent = () => {
    switch (activeTab) {
      default:
        return getListView(
          isLoading,
          calledProcessInstancesList,
          callProcessDefinitionsColumnData,
          calledProcessInstancePrimaryKey,
          false,
          scrollHeightTabs
        );
      case "variables":
        return getListView(
          isLoading,
          VariablesList,
          VariableColumnData,
          VariablePrimaryKey,
          false,
          scrollHeightTabs
        );
      case "processIncidents":
        return getListView(
          isLoading,
          IncidentList,
          IncidentListColumnData,
          IncidentListPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "calledProcessInstances":
        return getListView(
          isLoading,
          calledProcessInstancesList,
          callProcessDefinitionsColumnData,
          calledProcessInstancePrimaryKey,
          false,
          scrollHeightTabs
        );
      case "userTask":
        return getListView(
          isLoading,
          userTaskInstancesList,
          userTaskColumnData,
          userTaskInstancePrimaryKey,
          false,
          scrollHeightTabs
        );
      case "jobs":
        return getListView(
          isLoading,
          jobsInstancesList,
          jobsColumnData,
          jobsPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "externalTask":
        return getListView(
          isLoading,
          externalTaskData,
          externalTaskColumnData,
          externalTaskPrimaryKey,
          false,
          scrollHeightTabs
        );
    }
  };

  return (
    <ProcessListTabContainer>
      <Tabs items={tabItems} type="default" onClick={(value: TabItemProps) => handleClick(value)} />
      <section>{renderProcessInstanceChildrenContent()}</section>
    </ProcessListTabContainer>
  );
};

export default ProcessInstanceDetailsTabs;
