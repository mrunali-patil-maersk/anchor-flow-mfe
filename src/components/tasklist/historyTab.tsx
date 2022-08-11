import { useEffect, useMemo, useState } from "react";
import { Box } from "@anchor/react-components";
import _ from "lodash";
import dayjs from "dayjs";
import Timeline from "./timeline";

import LoadingSpinner from "./loadingSpinner";
import { SectionWrrapper } from "@styles/components/tasklist/timeline.style";
import {
  useGetCommentListQuery,
  useGetHistoryCountQuery,
  useGetHistoryListQuery,
} from "src/redux/services/tasklistApi";
import InfoBox from "./infoBox";
import Pagination from "./pagination";

const MAX_RESULT_PER_PAGE = 50;

const HistoryTab = ({ taskId }: { taskId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: historyCount, isSuccess: isSuccessCountCall } = useGetHistoryCountQuery(taskId, {
    skip: !taskId,
  });
  const { data: historyData, isSuccess: isSuccessHistoryCall } = useGetHistoryListQuery(
    {
      taskId: taskId,
      firstResult: (currentPage - 1) * MAX_RESULT_PER_PAGE,
      maxResults: MAX_RESULT_PER_PAGE,
    },
    {
      skip: !isSuccessCountCall,
    }
  );

  const { data: commentData = [], isSuccess: isSuccessCommentCall } = useGetCommentListQuery(
    taskId,
    { skip: !isSuccessHistoryCall }
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSuccessCountCall && isSuccessHistoryCall && isSuccessCommentCall) {
      setLoading(false);
    }
  }, [isSuccessCountCall, isSuccessHistoryCall, isSuccessCommentCall]);

  const processData = useMemo(() => {
    try {
      if (historyData && commentData) {
        const data = [...historyData, ...commentData] as Array<any>;
        const processData = _.chain(data)
          .orderBy(
            (item) => {
              return dayjs(item.timestamp);
            },
            ["desc"]
          )
          .groupBy((item) => {
            return dayjs(item.timestamp).startOf("days").format();
          })
          .map((value, key) => {
            return {
              headerDate: key,
              timelineData: value.map((item) => ({
                id: item.id,
                userId: item.userId,
                operationType: item.operationType,
                property: item.property,
                newValue: item.newValue,
                orgValue: item.orgValue,
                timestamp: item.timestamp,
                message: item.message,
                propertyIsDate: item.propertyIsDate,
              })),
            };
          })
          .value();
        return processData;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }, [historyData, commentData]);

  if (loading) {
    return (
      <SectionWrrapper>
        <LoadingSpinner />
      </SectionWrrapper>
    );
  }

  return (
    <Box pb={16}>
      {processData && processData.length > 0 ? (
        processData.map(({ headerDate, timelineData }, index) => (
          <Timeline key={index} headerDate={headerDate} timelineData={timelineData} />
        ))
      ) : (
        <Box mt={16}>
          <InfoBox text="Note there is no history of the task." />
        </Box>
      )}
      {historyCount > MAX_RESULT_PER_PAGE && (
        <Box pt={8} mb={-4} px={0} width="100%">
          <Pagination
            currentPage={currentPage}
            totalCount={historyCount}
            pageSize={MAX_RESULT_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      )}
    </Box>
  );
};

export default HistoryTab;
