// components
import ListView from "src/components/process/processList";
import Pagination from "../../components/tasklist/pagination";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// constants
import {
  processDraftListRowPrimaryKey,
  processDraftListColumnData,
} from "src/configs/process.constant";

// styles
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { ProcessDefinitionPreviewWidgetPager } from "@styles/pages/process/process-definitions.styles";
/**
 * @name DraftListView
 * @param isLoading
 * @param draftListData
 * @param maxCount
 * @param pageNumber
 * @param handlePageChange
 * @description Method returns JSX of the Draft List View Component
 * @returns JSX
 */
const DraftListView = ({
  isLoading,
  draftListData,
  maxCount,
  pageNumber,
  handlePageChange,
}: {
  isLoading: boolean;
  draftListData: Array<any>;
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
            rowData={draftListData}
            columnData={processDraftListColumnData}
            primaryKey={processDraftListRowPrimaryKey}
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

export default DraftListView;
