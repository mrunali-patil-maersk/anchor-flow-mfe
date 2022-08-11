import { Dispatch, SetStateAction } from "react";

import { Box } from "@anchor/react-components";

import Pagination from "./pagination";
import TaskListItem from "./taskListItem";
import { PaginationBox, TaskListWrapperScroll } from "@styles/pages/tasks.style";
import { TaskPanelWrapper } from "@styles/components/tasklist/tasklist.style";
import SearchSortFilter, { SortValueType } from "./searchSortFilter";
import LoadingSpinner from "./loadingSpinner";
import { MAX_RESULT_PER_PAGE } from "src/redux/services/tasklistApi";
import InfoBox from "./infoBox";

interface TaskType {
  id: string;
  name: string;
  processDefinitionId?: string;
  priority: string;
  created: Date;
}

const TaskList = ({
  onSelect,
  selectedTaskId,
  currentPage,
  setCurrentPage,
  taskList,
  isFetching,
  totalTasks,
  isError = false,
  taskListError = {},
  searchValue,
  setSearchValue,
  sortOrder,
  setSortOrder,
}: {
  selectedTaskId: string | undefined;
  onSelect: (taskId: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  taskList: Array<TaskType>;
  totalTasks: number;
  isFetching: boolean;
  taskListError?: any;
  isError: boolean;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  sortOrder: SortValueType;
  setSortOrder: Dispatch<SetStateAction<SortValueType>>;
}) => {
  return (
    <TaskPanelWrapper>
      <SearchSortFilter
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        sortValue={sortOrder}
        onSort={(value) => setSortOrder(value)}
      />
      <TaskListWrapperScroll>
        {isFetching && <LoadingSpinner />}
        {!isFetching && isError ? (
          <Box px={24}>
            <InfoBox
              text={taskListError?.data?.errorMesg ?? "Something went wrong!"}
              type="error"
            />
          </Box>
        ) : (
          <>
            {!isFetching &&
              !isError &&
              taskList &&
              taskList?.map((task) => (
                <TaskListItem
                  id={task.id}
                  key={task.id}
                  name={task.name}
                  processDefinitionId={task.processDefinitionId}
                  created={task.created}
                  priority={task.priority}
                  selected={task.id === selectedTaskId}
                  onClick={(id) => onSelect(id)}
                />
              ))}
            {!isFetching && !isError && taskList?.length === 0 && (
              <Box px={24}>
                <InfoBox text="No task matching filters found." />
              </Box>
            )}
          </>
        )}
      </TaskListWrapperScroll>
      {!isFetching && totalTasks > MAX_RESULT_PER_PAGE && (
        <PaginationBox py={8} px={16}>
          <Pagination
            currentPage={currentPage}
            totalCount={totalTasks}
            pageSize={MAX_RESULT_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </PaginationBox>
      )}
    </TaskPanelWrapper>
  );
};

export default TaskList;
