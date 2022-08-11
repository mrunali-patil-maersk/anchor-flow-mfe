// react
import { useState, useEffect } from "react";

// date library
import dayjs from "dayjs";

// components
import { Input, Table } from "@anchor/react-components";
import Pagination from "@/components/tasklist/pagination";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// constants
import {
  deploymentListColumnData,
  deploymentListPrimaryKey,
} from "src/configs/deployment_ListData.constants";
import { deploymentUrl, deploymentCountUrl, apiGateway } from "@/configs/apis/apiEndPoints";
import useDebounce from "@hooks/useDebounce";

// styles
import {
  DeploymentsListWrapper,
  StyledHeaderTxt,
  DeploymentsListContainer,
  DeploymentsListHeadContainer,
  DeploymentsListTableWrapper,
  DeploymentPager,
} from "@styles/components/deploymentlist/deploymentList.style";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

// configs
import { getListAndCountConfig } from "@/configs/actions/process";
import { callApi } from "@/configs/apis/axiosAPI";

// styles
import { Deployments } from "@styles/pages/process/deployments.styles";
import ListView from "@/components/listView/listView";

const Deploy = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filter, setfilterData] = useState<string>("");

  const debouncedSearchTerm: string = useDebounce<string>(filter, 500);

  const [maxCount, setMaxCount] = useState<number>(0);
  const [deploymentListData, setDeploymentListData] = useState<Array<any>>([]);

  /**
   * @name getDeployments
   * @description Method for fetching the deployment list data using API and updates the state
   * @param none
   * @returns none
   */
  const getDeployments = async (firstResult = 0, nameFilter = "") => {
    const params = {
      firstResult: firstResult,
      maxResults: 10,
      name: nameFilter,
      latestVersion: false,
      sortBy: "deploymentTime",
      sortOrder: "desc",
    };
    try {
      setIsLoading(true);
      const config: any = getListAndCountConfig(
        deploymentUrl,
        firstResult,
        10,
        nameFilter,
        false,
        "deploymentTime",
        "desc"
      );
      const countConfig: any = getListAndCountConfig(
        deploymentCountUrl,
        firstResult,
        10,
        nameFilter,
        false,
        "deploymentTime",
        "desc"
      );
      // const { data: response } = await API(config);
      // const {
      //   data: { count },
      // } = await API(countConfig);
      const { count } = await callApi(apiGateway + deploymentCountUrl, countConfig);
      const response = await callApi(apiGateway + deploymentUrl, config);
      setDeploymentListData(
        response.map((item) => {
          return {
            process_defination_id: item.id,
            process_defination_name: item.name,
            versions: item.versions,
            resources: item.resources,
            source: item.source,
            deployment_time: dayjs(item.deploymentTime).format("YYYY-MM-DD hh:mm:ss"),
            tenantId: item.tenantId,
          };
        })
      );
      setMaxCount(count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // triggers the getProcessList method post load
  useEffect(() => {
    if (debouncedSearchTerm) {
      getDeployments((pageNumber - 1) * 10, debouncedSearchTerm);
    } else {
      getDeployments((pageNumber - 1) * 10);
    }
  }, [debouncedSearchTerm, pageNumber]);

  /**
   * @name handlePageChange
   * @description Method for updating the page number and triggers the get deployment api call
   * @param page - selected page number
   * @returns none
   */
  const handlePageChange = (page) => {
    setPageNumber(page);
    getDeployments((page - 1) * 10);
  };

  /**
   * @name handleTextInputChange
   * @description Method for updating the filter and triggers the get deployment api call with filter
   * @param value - input filter value
   * @returns none
   */
  const handleTextInputChange = (value) => {
    setPageNumber(1);
    setfilterData(value);
  };

  return (
    <Deployments sidebarIsExpanded={sidebarIsExpanded}>
      <DeploymentsListWrapper bg="functional.grey.100">
        <StyledHeaderTxt fontStyle="normal" variant="h3">
          {maxCount} Deployments
        </StyledHeaderTxt>
        <DeploymentsListContainer>
          {isLoading && (
            <LoadingWrrapper>
              <LoadingSpinner />
            </LoadingWrrapper>
          )}
          {!isLoading && deploymentListData && (
            <>
              <DeploymentsListHeadContainer flexDirection="column">
                <Input
                  clearButton
                  icon="magnifying-glass"
                  iconPosition="left"
                  id="deploymentsList"
                  fit="large"
                  placeholder="Search Deployment"
                  variant="default"
                  label=""
                  value={filter}
                  onChange={({ target: { value } }) => handleTextInputChange(value)}
                  onClear={() => handleTextInputChange("")}
                />
              </DeploymentsListHeadContainer>
              <DeploymentsListTableWrapper>
                <ListView
                  rowData={deploymentListData}
                  columnData={deploymentListColumnData}
                  primaryKey={deploymentListPrimaryKey}
                  searchBarVisibile={false}
                />
              </DeploymentsListTableWrapper>
              <section>
                <DeploymentPager>
                  <Pagination
                    totalCount={maxCount}
                    currentPage={pageNumber}
                    pageSize={10}
                    onPageChange={(page) => handlePageChange(page)}
                    buttonSize="large"
                  />
                </DeploymentPager>
              </section>
            </>
          )}
        </DeploymentsListContainer>
      </DeploymentsListWrapper>
    </Deployments>
  );
};

// Protected routes
Deploy.requireAuth = true;
export default Deploy;
