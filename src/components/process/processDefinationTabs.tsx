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
  processTabItemsConfig,
  processInstancesRowData,
  processInstancesPrimaryKey,
  processInstancesColumnData,
  callProcessDefinitionsColumnData,
  jobDefinitionColumnData,
  processIncidentListColumnData,
  processIncidentListRowPrimaryKey,
  scrollHeightTabs,
} from "src/configs/process.constant";
import {
  jobDefinitionsListUrl,
  processInstancesByIdUrl,
  processIncidentsUrl,
  calledProcessDefinitions,
  apiGateway,
} from "@/configs/apis/apiEndPoints";

// configs
import { getJobDefinitionsListConfig, getDataBasedOnUrl } from "@/configs/actions/process";
import { callApi } from "@/configs/apis/axiosAPI";
import { groupPrimaryKey } from "src/configs/groups.constant";

// styles
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { ProcessListTabContainer } from "@styles/components/process/processList.styles";

//date library
import dayjs from "dayjs";

const ProcessDefinationTabs = ({
  processDefinitionId,
}: {
  processDefinitionId: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabItems, setTabItems] = useState<Array<ItemType>>(processTabItemsConfig);
  const [activeTab, setActiveTab] = useState<string>("processInstances");
  const [jobDefinitionList, setJobDefinitionListData] = useState<Array<any>>([]);
  const [processInstanceList, setProcessInstanceList] = useState<any>({});
  const [processIncidentList, setProcessIncidentList] = useState<any>({});
  const [callProcessDefinitionsData, setcallProcessDefinitionsRowData] = useState<any>([]);

  /**
   * @name getCallDefinitions
   * @description Method for fetching the getCallDefinitions  data using API and updates the state
   * @param processDefinitionsId
   * @returns JSX
   */
  const getCallDefinitions = async (id) => {
    try {
      setIsLoading(true);
      const url: string = calledProcessDefinitions(id);
      const config: any = getDataBasedOnUrl(url);
      // const {
      //   data: { name: callingProcessDefinitionId, calledFromActivityIds: activityID },
      // }: any = await API(config);

      const response = await callApi(apiGateway + url, config);
      // console.log("response", response);
      let calledProcessDefinitionList: any = [];
      response.map((item) => {
        let rowData = {
          callProcessDefinition: item.callingProcessDefinitionId,
        };
        if (item.calledFromActivityIds.length) {
          item.calledFromActivityIds.map((activity) => {
            calledProcessDefinitionList.push({ ...rowData, activity });
          });
        } else {
          calledProcessDefinitionList.push(rowData);
        }
      });
      setcallProcessDefinitionsRowData(calledProcessDefinitionList);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get call Definition List.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "processIntanceToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @name getJobDefinitionList
   * @description Method for fetching the JobDefinition list data using API and updates the state
   * @param none
   * @returns none
   */
  const getJobDefinitionList = async (firstResult = 0) => {
    try {
      setIsLoading(true);
      const url: string = jobDefinitionsListUrl(processDefinitionId);
      const config: any = getJobDefinitionsListConfig(url, firstResult, 10);
      const response = await callApi(apiGateway + url, config);
      setJobDefinitionListData(
        response.map((item) => {
          return {
            state: item.suspended ? "Suspended" : "Active",
            activity: item.activityId,
            type: item.jobType,
            configuration: item.jobConfiguration,
            overridingJobPriority: item.overridingJobPriority.toString(),
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get job Definition List.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "processIntanceToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // return process intance tab data which we need to pass into row data
  const getProcessInstanceList = async () => {
    try {
      const url: string = processInstancesByIdUrl(processDefinitionId);
      const config: any = getDataBasedOnUrl(url);
      const response = await callApi(apiGateway + url, config);

      const processIncidenturl: string = processIncidentsUrl(processDefinitionId);
      // const processIncidenturl: string = processIncidentsUrl(
      //   "Process_09ccbh4:4:6ab31072-6184-11ec-a045-26f68ac1b43f"
      // );
      const processIncidentConfig: any = getDataBasedOnUrl(processIncidenturl);

      const processIncidentResponse = await callApi(
        apiGateway + processIncidenturl,
        processIncidentConfig
      );
      //console.log("processInstanceData and Process Incident", response, processIncidentResponse);
      setProcessInstanceList(
        response.map((item) => {
          return {
            state: (processIncidentResponse || []).filter((el) => el.id === item.id).length
              ? "Failed"
              : "Success",
            id: item.id,
            start_time: dayjs().format("YYYY-MM-DD hh:mm:ss"),
            business_key: item.businessKey,
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get process instances.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "processIntanceToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // return process intance tab data which we need to pass into row data
  const getProcessIncidentList = async () => {
    try {
      const url: string = processIncidentsUrl(processDefinitionId);
      const config: any = getDataBasedOnUrl(url);
      const response = await callApi(apiGateway + url, config);

      setProcessIncidentList(
        response.map((item) => {
          return {
            incident_message: item.incidentMessage,
            incident_process_instances: item.processInstanceId,
            incident_timestamp: item.incidentTimestamp,
            incident_activity: item.activityId,
            incident_failing_activity: item.failedActivityId,
            incident_cause_instance: item.causeIncidentId,
          };
        })
      );
    } catch (error) {
      toastEmitter(
        { title: `Failed to get process incidents.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "processIncidentToast",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // triggers the getJobDefinitionList method
  useEffect(() => {
    const fetchData = (activeTab: string) => {
      switch (activeTab) {
        default:
          return getProcessInstanceList();
        case "processInstances":
          return getProcessInstanceList();
        case "incidents":
          return getProcessIncidentList();
        case "jobDefinations":
          return getJobDefinitionList();
        case "calledDefinations":
          return getCallDefinitions(processDefinitionId);
      }
    };
    fetchData(activeTab);
  }, [activeTab, processDefinitionId]);

  /**
   * @name handleClick
   * @description Method for updating the state after the tab clicks
   * @param value
   */
  const handleClick = ({ selectedItemId, updatedTabData }: TabItemProps) => {
    setActiveTab(selectedItemId);
    setTabItems(updatedTabData);
  };

  // reusable method for generating the list view based on the tabs
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

  // returns the process definition list view or preview based on the type
  const renderProcessDefinationChildrenContent = () => {
    switch (activeTab) {
      default:
        return getListView(
          isLoading,
          processInstanceList,
          processInstancesColumnData(processDefinitionId),
          processInstancesPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "processInstances":
        return getListView(
          isLoading,
          processInstanceList,
          processInstancesColumnData(processDefinitionId),
          processInstancesPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "incidents":
        return getListView(
          isLoading,
          processIncidentList,
          processIncidentListColumnData,
          processIncidentListRowPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "calledDefinations":
        return getListView(
          isLoading,
          callProcessDefinitionsData,
          callProcessDefinitionsColumnData,
          groupPrimaryKey,
          false,
          scrollHeightTabs
        );
      case "jobDefinations":
        return getListView(
          isLoading,
          jobDefinitionList,
          jobDefinitionColumnData,
          groupPrimaryKey,
          false,
          scrollHeightTabs
        );
    }
  };

  return (
    <ProcessListTabContainer>
      <Tabs items={tabItems} type="default" onClick={(value: TabItemProps) => handleClick(value)} />
      <section>{renderProcessDefinationChildrenContent()}</section>
    </ProcessListTabContainer>
  );
};

ProcessDefinationTabs.requireAuth = false;
export default ProcessDefinationTabs;
