import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Typography } from "@anchor/react-components";
import {
  TaskHeadContainer,
  TaskHeadContainerButtons,
  TaskHeadStartProcessButton,
  TaskListDetailsContainer,
  TasksContainer,
  TasksPage,
} from "@styles/pages/tasks.style";

//API
import { MAX_RESULT_PER_PAGE, useGetTasksQuery } from "src/redux/services/tasklistApi";

import StartProcessModal from "./modals/startProcess";
import TaskDetails from "./taskdetails";
import TaskList from "./taskList";
import TaskListLayout from "../layout/tasklayout";
import { defaultFilter, SortByItemType } from "@/configs/taskFilter.constant";
import SortOrderPopup from "./filterTasklist";
import { SortValueType } from "./searchSortFilter";
import useDebounce from "@hooks/useDebounce";

const Tasks = ({
  sidebarIsExpanded,
  pageName,
  assignee,
  routePathKey,
  groupId,
}: {
  sidebarIsExpanded: boolean;
  pageName: string;
  assignee?: string;
  routePathKey: string;
  groupId?: string;
}) => {
  const router = useRouter();
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // SortBy
  const [selectedSortBy, setSelectedSortBy] = useState<SortByItemType>(defaultFilter);
  const [sortOrder, setSortOrder] = useState<SortValueType>("desc");

  // Search
  const [searchValue, setSearchValue] = useState<string>("");

  // modal states
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState<boolean>(false);
  const [startProcessModalOpen, setStartProcessModalOpen] = useState<boolean>(false);

  // Debounce search task list
  const debouncedNameLike: string = useDebounce<string>(searchValue, 500);

  // Using a query hook automatically fetches data and returns query values
  const {
    data: tasks = {},
    isFetching,
    isLoading,
    error: taskListError,
    isError: isTaskLastError,
  } = useGetTasksQuery({
    maxResult: MAX_RESULT_PER_PAGE,
    startIndex: (currentPage - 1) * MAX_RESULT_PER_PAGE,
    assignee: assignee,
    groupId: groupId,
    sortBy: selectedSortBy.key,
    sortOrder: sortOrder,
    nameLike: debouncedNameLike,
  });

  useEffect(() => {
    //@Todo: slug should provide key not index number - nextjs-mf
    const taskId =
      router.query?.slug && !router.query.taskId ? router.query?.slug[2] : router.query.taskId;
    if (taskId) {
      setSelectedTaskId(taskId as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (!isFetching && tasks?.taskList?.length > 0 && !selectedTaskId) {
      handleTaskListSelect(tasks?.taskList[0]?.id);
    }
  }, [tasks?.taskList, isFetching, selectedTaskId]);

  useEffect(() => {
    if (!selectedTaskId) {
      setCurrentPage(1);
    }
  }, [selectedTaskId]);

  const handleTaskListSelect = (id: string) => {
    router.push(`/tasklist/${routePathKey}?taskId=${id}`, undefined, { shallow: true });
  };

  const handleSelectSort = (value: SortByItemType) => {
    setSelectedSortBy(value);
  };

  // JSX for task list
  return (
    <TasksPage bg="functional.grey.100">
      <TasksContainer pt={0} pb={16} px={24}>
        <TaskHeadContainer>
          <Typography fontStyle="normal" variant="h3">
            {pageName}
          </Typography>
          <TaskHeadContainerButtons>
            {/** Todo */}
            {/*  <Button
              variant="filled"
              icon="clipboard-check"
              label="Create task"
              onClick={() => setCreateTaskModalOpen(true)}
            />
           */}
            <TaskHeadStartProcessButton
              variant="filled"
              icon="clipboard-check-text"
              label="Start process"
              onClick={() => setStartProcessModalOpen(true)}
            />
          </TaskHeadContainerButtons>
        </TaskHeadContainer>
        <TaskListLayout
          headerComp={<SortOrderPopup sortBy={selectedSortBy} onSelect={handleSelectSort} />}
          taskListComp={
            <TaskList
              selectedTaskId={selectedTaskId}
              onSelect={handleTaskListSelect}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              taskList={tasks.taskList}
              totalTasks={tasks.count}
              isFetching={isFetching}
              isError={isTaskLastError}
              taskListError={taskListError}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }
        >
          <TaskListDetailsContainer>
            {selectedTaskId && !isLoading && (
              <TaskDetails
                sidebarIsExpanded={sidebarIsExpanded}
                selectedTaskId={selectedTaskId}
                handleReload={() => setSelectedTaskId(undefined)}
              />
            )}
          </TaskListDetailsContainer>
        </TaskListLayout>
      </TasksContainer>
      <StartProcessModal modalOpen={startProcessModalOpen} closeModal={setStartProcessModalOpen} />
    </TasksPage>
  );
};

export default Tasks;
