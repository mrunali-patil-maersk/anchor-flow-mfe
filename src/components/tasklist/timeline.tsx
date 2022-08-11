import dayjs from "dayjs";
import _ from "lodash";
import { Box } from "@anchor/react-components";

import { StyledTypography } from "@styles/components/tasklist/tasklist.style";
import {
  HeaderDate,
  OperationType,
  Time,
  TimeLineCard,
  TimeLineCards,
  TimeLineWrapper,
} from "@styles/components/tasklist/timeline.style";

export interface TimelineDataType {
  id: string;
  timestamp: Date;
  userId: string;
  operationType: "DeleteGroupLink" | "AddGroupLink" | "Update" | "Assign" | "Claim" | "Comment";
  property: "dueDate" | "assignee" | "followUpDate" | "candidate";
  newValue?: string | null;
  orgValue?: string | null;
  propertyIsDate: boolean;
  message?: string;
}

export interface TimelineProps {
  headerDate: string;
  timelineData: TimelineDataType[];
}

const Timeline = ({ headerDate, timelineData }: TimelineProps) => {
  const getValue = (timeLine: TimelineDataType) => {
    const value = timeLine.newValue || timeLine.orgValue;
    if (value && timeLine.propertyIsDate && !isNaN(+value)) {
      return dayjs(+value).format("MMM D, YYYY hh:mm A");
    } else {
      return value;
    }
  };

  return (
    <TimeLineWrapper>
      <HeaderDate>
        <StyledTypography variant="h4" fontStyle="normal">
          {dayjs(headerDate).get("date")}
        </StyledTypography>
        <StyledTypography variant="body1" fontStyle="normal">
          {dayjs(headerDate).format("MMM YYYY")?.toUpperCase()}
        </StyledTypography>
      </HeaderDate>
      <TimeLineCards>
        {timelineData &&
          timelineData.map((timeLine: TimelineDataType) => (
            <TimeLineCard key={timeLine.id}>
              <Box display="flex">
                <Box display="flex" color="functional.grey.800" width="80px">
                  <StyledTypography variant="body2" fontStyle="normal">
                    {dayjs(timeLine.timestamp).format("HH:mm")}
                  </StyledTypography>
                </Box>
                <Box display="flex" color="functional.grey.800" ml={8}>
                  <StyledTypography variant="body2" fontStyle="normal">
                    {_.startCase(timeLine.operationType)}
                  </StyledTypography>
                </Box>
              </Box>
              <Box display="flex" mt={8}>
                <Box display="flex" color="functional.grey.800" width="80px">
                  <StyledTypography variant="body2" fontStyle="normal">
                    {timeLine.userId}
                  </StyledTypography>
                </Box>
                {timeLine.operationType !== "Comment" ? (
                  <>
                    <Box display="flex" color="functional.grey.800" ml={8} width="140px">
                      <StyledTypography variant="body2" fontStyle="bold">
                        {_.startCase(timeLine.property)}
                      </StyledTypography>
                    </Box>
                    <Box display="flex" color="functional.grey.800" ml={8} width="180px">
                      <StyledTypography variant="body2" fontStyle="normal">
                        {getValue(timeLine)}
                      </StyledTypography>
                    </Box>
                  </>
                ) : (
                  <Box display="flex" color="functional.grey.800" ml={8} width="180px">
                    <StyledTypography variant="body2" fontStyle="normal">
                      {timeLine.message}
                    </StyledTypography>
                  </Box>
                )}
              </Box>
            </TimeLineCard>
          ))}
      </TimeLineCards>
    </TimeLineWrapper>
  );
};

export default Timeline;
