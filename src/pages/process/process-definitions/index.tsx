// react
import { useState, useEffect } from "react";

// components
import { Button, Input, Tabs, toastEmitter } from "@anchor/react-components";
import DeployedlistView from "@/components/process/deployedListView";
import DraftListView from "@/components/process/draftListView";
import Preview from "@/components/process/Preview";
import NextLink from "next/link";

// constants
import {
  processListUrl,
  processListCountUrl,
  apiGateway,
  processDefinitionXMLWithId,
  processDraftListUrl,
} from "@/configs/apis/apiEndPoints";

// configs
import { getListAndCountConfig, getDataBasedOnUrl } from "@/configs/actions/process";
import { callApi } from "@/configs/apis/axiosAPI";

// styles
import {
  ProcessDefinitionsRoute,
  ProcessDefinitionHeader,
  ProcessDefinitionSubPage,
  ProcessDefinitionSubHeaderContainer,
  ProcessDefinitionSubPageSearchTextContainer,
} from "@styles/pages/process/process-definitions.styles";

// constants
import {
  tabItemsConfig,
  processDefinitionListIcondata,
  processDraftListRowData,
} from "src/configs/process.constant";
import IconButton from "@/components/process/iconButton";

// interfaces
export interface TabItemType {
  id: string;
  title: string;
  active: boolean;
}

export interface TabItemProps {
  selectedItemId: string;
  updatedTabData: Array<TabItemType>;
}

export interface IconType {
  key: string;
  name: string;
  size: number;
  value: string;
  active: boolean;
}

export interface IconItemProps {
  selectedItemId: string;
  updatedData: Array<IconType>;
}

// utils
import useDebounce from "@hooks/useDebounce";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";
import { AxiosPromise } from "axios";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

/**
 * @name ProcessInstances
 * @description Method for generating the JSX for the Process Definition Route
 * @returns JSX
 */
const ProcessInstances = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processDefinitionSearchText, setProcessDefinitionSearchText] = useState<string>("");
  const [processListData, setProcessListData] = useState<Array<any>>([]);
  const [processPreviewData, setProcessPreviewData] = useState<Array<any>>([]);
  const [draftListData, setDraftListData] = useState<Array<any>>([]);
  const debouncedSearchTerm: string = useDebounce<string>(processDefinitionSearchText, 500);

  // states for tabs
  const [activeTab, setActiveTab] = useState<string>("list");
  const [activeView, setActiveView] = useState<string>("deployed");
  const [tabItems, setTabItems] = useState<Array<TabItemType>>(tabItemsConfig);
  const [iconData, setIconData] = useState<Array<IconType>>(processDefinitionListIcondata);

  // states for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  /**
   * @name getProcessLists
   * @description Method for fetching the process list data using API and updates the state
   * @param none
   * @returns none
   */
  const getProcessLists = async (firstResult = 0, nameFilter = "") => {
    try {
      const config: any = getListAndCountConfig(processListUrl, firstResult, 10, nameFilter, true);
      const countConfig: any = getListAndCountConfig(
        processListCountUrl,
        firstResult,
        10,
        nameFilter,
        true
      );
      const { count } = await callApi(apiGateway + processListCountUrl, countConfig);
      const response = await callApi(apiGateway + processListUrl, config);
      setProcessListData(
        response.map((item) => {
          return {
            id: item.id,
            deployment_id: item.deploymentId,
            state: "Success" /* @Todo State should provide by API */,
            incidents: item.incidents,
            running_instances: item.runningInstances,
            name: item.name,
            versions: item.version,
            tenant_id: item.tenantId,
            suspended: item.suspended,
          };
        })
      );
      setMaxCount(count);
    } catch (error) {
      toastEmitter(
        { title: `Failed to get deployed Row Data` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "deployedDataId",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @name getProcessLists
   * @description Method for fetching the process list data using API and updates the state
   * @param none
   * @returns none
   */
  const getDraftLists = async (firstResult = 0, nameFilter = "") => {
    try {
      const config: any = getListAndCountConfig(
        processDraftListUrl,
        firstResult,
        10,
        nameFilter,
        true
      );
      const { data, totalItems } = await callApi(apiGateway + processDraftListUrl, config);
      setDraftListData(
        data.map((item) => {
          return {
            id: item.id,
            deployment_id: item.deploymentId,
            state: item.state == "DRAFT" ? "In progress" : item.state,
            incidents: item.incidents,
            running_instances: item.runningInstances,
            name: item.name,
            versions: item.version,
            tenant_id: item.tenantId,
          };
        })
      );
      setTotalItems(totalItems);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // triggers the getProcessList method
  useEffect(() => {
    setIsLoading(true);
    if (debouncedSearchTerm) {
      if (activeView === "deployed") {
        getProcessLists((pageNumber - 1) * 10, debouncedSearchTerm);
      } else {
        getDraftLists(pageNumber - 1, debouncedSearchTerm);
      }
    } else {
      if (activeView === "deployed") {
        getProcessLists((pageNumber - 1) * 10);
      } else {
        getDraftLists(pageNumber - 1);
      }
    }
  }, [debouncedSearchTerm, pageNumber, activeView]);

  // triggers the getProcessPreviewXmls for preview page
  useEffect(() => {
    if (activeTab === "preview") {
      const getProcessPreviewXmls = async () => {
        try {
          // promise array contains number of promises equal to the item displayed in the list table (default - 10)
          const promiseArray: AxiosPromise<any>[] = processListData.map((process) => {
            const url: string = processDefinitionXMLWithId(process.id);
            const config: any = getDataBasedOnUrl(url);
            return callApi(apiGateway + url, config);
          });
          await Promise.all(promiseArray).then((response: any) => {
            const data: any = response.map((item: any, index: number) => {
              const { id, bpmn20Xml } = item;
              // getDataBasedOnUrl only returns id and xml
              // mapping it with list data api for more details
              const { deploymentId, incidents, runningInstances, name, version, tenantId } =
                processListData.find((item) => item.id === id);
              return {
                id: index,
                processId: id,
                xml: bpmn20Xml,
                state: "Success" /* @Todo State should provide by API */,
                deployment_id: deploymentId,
                incidents: incidents,
                running_instances: runningInstances,
                name: name,
                versions: version,
                tenant_id: tenantId,
              };
            });
            setProcessPreviewData(data);
          });
        } catch (error) {
          toastEmitter(
            { title: `Failed to get the BPMN diagram for the Preview sections` },
            {
              type: "error",
              position: "bottom-right",
              toastId: "processDefinitionPreview",
            }
          );
          console.error(error);
        }
      };
      getProcessPreviewXmls();
    }
    setIsLoading(false);
  }, [processListData, activeTab]);

  /**
   * @name handleClick
   * @description Method for updating the state after the tab clicks
   * @param value
   */
  const handleTabClick = ({ selectedItemId, updatedTabData }: TabItemProps) => {
    setActiveView(selectedItemId);
    setTabItems(updatedTabData);
  };

  /**
   * @name handleIconClick
   * @description updates the state with active and updated icon tab data and triggers render with the view
   * @param selectedItemId
   * @param updatedData
   * @returns none
   */
  const handleIconClick = ({ selectedItemId, updatedData }: IconItemProps) => {
    setActiveTab(selectedItemId);
    setIconData(updatedData);
  };

  /**
   * @name getDeployedListView
   * @description method renderst the deployed list view component
   * @returns JSX
   */
  const getDeployedListView = () => {
    return (
      <DeployedlistView
        isLoading={isLoading}
        processListData={processListData}
        maxCount={maxCount}
        pageNumber={pageNumber}
        handlePageChange={(page) => setPageNumber(page)}
      />
    );
  };

  /**
   * @name getDraftListView
   * @description method renderst the deployed list view component
   * @returns JSX
   */
  const getDraftListView = () => {
    return (
      <DraftListView
        isLoading={isLoading}
        draftListData={draftListData}
        maxCount={totalItems}
        pageNumber={pageNumber}
        handlePageChange={(page) => setPageNumber(page)}
      />
    );
  };
  /**
   * @name getListViewContent
   * @description Method for process definition table/list view
   * @param JSX
   */
  const getListViewContent = () => {
    switch (activeView) {
      default:
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && getDeployedListView()}
          </>
        );
      case "deployed":
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && getDeployedListView()}
          </>
        );
      case "draft":
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && getDraftListView()}
          </>
        );
    }
  };

  /**
   * @name renderProcessDefinitionChildrenContent
   * @description returns the process definition list view or preview based on the type
   * @returns JSX
   */
  const renderProcessDefinitionChildrenContent = () => {
    switch (activeTab) {
      default:
        return getListViewContent();
      case "list":
        return getListViewContent();
      case "preview":
        return (
          <Preview
            isLoading={isLoading}
            processDefinitionPreviewRawData={processPreviewData}
            maxCount={maxCount}
            pageNumber={pageNumber}
            handlePageChange={(page) => setPageNumber(page)}
          />
        );
    }
  };

  // Method for updating the page number
  // Method for updating the name filter
  const handleTextInputChange = (value) => {
    setPageNumber(1);
    setProcessDefinitionSearchText(value);
  };

  // JSX for the process definition page
  return (
    <ProcessDefinitionsRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ProcessDefinitionHeader>
        <MainHeading fontStyle="normal" variant="h3">
          {`${maxCount} Process${maxCount < 2 ? "" : "es"} deployed`}
        </MainHeading>
        <NextLink href="/create-workflow/bpmn?deploymentId=default&resourceId=default">
          <a>
            <Button variant="filled" icon="clipboard-check" label="Create new process" />
          </a>
        </NextLink>
      </ProcessDefinitionHeader>
      <ProcessDefinitionSubPage>
        <ProcessDefinitionSubHeaderContainer>
          <Tabs
            type="default"
            items={tabItems}
            onClick={(value: TabItemProps) => handleTabClick(value)}
          />
          <IconButton
            iconData={iconData}
            handleClick={(value: IconItemProps) => handleIconClick(value)}
          />
        </ProcessDefinitionSubHeaderContainer>
        <ProcessDefinitionSubPageSearchTextContainer>
          <Input
            clearButton
            icon="magnifying-glass"
            iconPosition="left"
            id="process_definitions_search"
            placeholder="Search process"
            variant="default"
            label=""
            value={processDefinitionSearchText}
            onChange={({ target: { value } }) => handleTextInputChange(value)}
            onClear={() => handleTextInputChange("")}
          />
        </ProcessDefinitionSubPageSearchTextContainer>
        {renderProcessDefinitionChildrenContent()}
      </ProcessDefinitionSubPage>
    </ProcessDefinitionsRoute>
  );
};

// Protected routes
ProcessInstances.requireAuth = true;
export default ProcessInstances;
