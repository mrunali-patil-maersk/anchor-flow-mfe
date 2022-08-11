import { Tooltip } from "@anchor/react-components";
import {
  TaskCreatedDate,
  TaskFooter,
  TaskIconWrapper,
  TaskItemContainer,
  TaskItemName,
  TaskItemWrapper,
  TaskPriority,
  TaskProcessDefId,
} from "@styles/components/tasklist/tasklist.style";
import { getLocalizedFormat, getTimeFromNow } from "src/utils/dateTimeUtils";

export interface TaskListItemProps {
  id: string;
  name: string;
  processDefinitionId?: string;
  priority: string;
  created: Date;
  selected?: boolean;
  onClick: (id: string) => void;
}

const TaskListItem = ({
  id,
  name,
  processDefinitionId,
  priority,
  created,
  selected = false,
  onClick,
}: TaskListItemProps) => {
  const formateDate = `Created ${getTimeFromNow(created)}`;
  const processDefinitionString = processDefinitionId?.split(":")[0] || "";
  return (
    <TaskItemContainer
      display="flex"
      px={24}
      py={12}
      selected={selected}
      onClick={() => onClick(id)}
    >
      <TaskIconWrapper pr={8} pt={4}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect width="20" height="20" rx="4" fill="#005487" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6904 5.06326H13.9683C14.5381 5.06326 15 5.5274 15 6.09995V14.0744C15 14.647 14.5381 15.1111 13.9683 15.1111H6.03175C5.46193 15.1111 5 14.647 5 14.0744V6.09995C5 5.5274 5.46193 5.06326 6.03175 5.06326H8.28315C8.32389 4.4692 8.81641 4 9.41799 4H10.5556C11.1571 4 11.6497 4.4692 11.6904 5.06326ZM10.582 5.47528C10.582 5.79091 10.3274 6.04678 10.0132 6.04678C9.6991 6.04678 9.44444 5.79091 9.44444 5.47528C9.44444 5.15965 9.6991 4.90377 10.0132 4.90377C10.3274 4.90377 10.582 5.15965 10.582 5.47528ZM7.70833 9.41667L6.875 10.25L9.375 12.75L13.125 9L12.2917 8.16667L9.375 11.0833L7.70833 9.41667Z"
            fill="white"
          />
        </svg>
      </TaskIconWrapper>
      <TaskItemWrapper display="flex" flexDirection="column">
        <TaskItemName variant="body1" fontStyle="normal">
          {name}
        </TaskItemName>
        <TaskProcessDefId variant="body1" fontStyle="normal">
          {processDefinitionString}
        </TaskProcessDefId>
        <TaskFooter display="flex" mt={8} justifyContent="space-between">
          {created && (
            <Tooltip
              apperance="inverted"
              content={getLocalizedFormat(created)}
              position="top"
              width="auto"
            >
              <TaskCreatedDate variant="body2" fontStyle="normal">
                {formateDate}
              </TaskCreatedDate>
            </Tooltip>
          )}
          <TaskPriority variant="body2" fontStyle="normal">
            {priority}
          </TaskPriority>
        </TaskFooter>
      </TaskItemWrapper>
    </TaskItemContainer>
  );
};

export default TaskListItem;
