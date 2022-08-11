// components
import ListView from "src/components/process/processList";
import Pagination from "../../components/tasklist/pagination";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// constants
import {
  processDefinitionRowPrimaryKey,
  processDefinitionColumnData,
} from "src/configs/process.constant";

// styles
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { ProcessDefinitionPreviewWidgetPager } from "@styles/pages/process/process-definitions.styles";

/**
 * @name DeployedlistView
 * @param isLoading
 * @param processListData
 * @param maxCount
 * @param pageNumber
 * @param handlePageChange
 * @description Method returns JSX of the Deployed List View Component
 * @returns JSX
 */
const DeployedlistView = ({
  isLoading,
  processListData,
  maxCount,
  pageNumber,
  handlePageChange,
}: {
  isLoading: boolean;
  processListData: Array<any>;
  maxCount: number;
  pageNumber: number;
  handlePageChange: (page: number) => void;
}) => {
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
            rowData={processListData}
            columnData={processDefinitionColumnData}
            primaryKey={processDefinitionRowPrimaryKey}
          />
          <ProcessDefinitionPreviewWidgetPager>
            <Pagination
              totalCount={maxCount}
              currentPage={pageNumber}
              pageSize={10}
              onPageChange={(page) => handlePageChange(page)}
              buttonSize="large"
            />
          </ProcessDefinitionPreviewWidgetPager>
        </>
      )}
    </>
  );
};

export default DeployedlistView;
