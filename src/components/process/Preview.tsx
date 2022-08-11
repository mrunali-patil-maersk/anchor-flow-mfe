// next
import dynamic from "next/dynamic";

// dynamic static components
const ProcessDefinitionPreviewWidget = dynamic(
  () => import("../../components/process/processPreview"),
  {
    ssr: false,
  }
);

// components
import Pagination from "../../components/tasklist/pagination";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// styles
import {
  ProcessDefinitionPreviewWidgetWrapper,
  ProcessDefinitionPreviewWidgetPager,
} from "@styles/pages/process/process-definitions.styles";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

/**
 * @name Preview
 * @param isLoading
 * @param processDefinitionPreviewRawData
 * @param maxCount
 * @param pageNumber
 * @param handlePageChange
 * @description Method returns JSX of the Preview Component
 * @returns JSX
 */
const Preview = ({
  isLoading,
  processDefinitionPreviewRawData,
  maxCount,
  pageNumber,
  handlePageChange,
}: {
  isLoading: boolean;
  processDefinitionPreviewRawData: Array<any>;
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
          {processDefinitionPreviewRawData && processDefinitionPreviewRawData.length > 0 ? (
            <>
              <ProcessDefinitionPreviewWidgetWrapper>
                {processDefinitionPreviewRawData?.map((process) => (
                  <ProcessDefinitionPreviewWidget
                    key={process.id}
                    title={process.name}
                    xml={process.xml}
                    instance={process.running_instances}
                    uniqueId={`${process.id}${Math.floor(Math.random() * 100000)}`}
                    isDetailsPage={false}
                    state={process.state}
                    processId={process.processId}
                  />
                ))}
              </ProcessDefinitionPreviewWidgetWrapper>
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
          ) : (
            <p>No records found</p>
          )}
        </>
      )}
    </>
  );
};

export default Preview;
