import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Box, Tabs } from "@anchor/react-components";
import { TaskButtonWrapper, TaskDetailsContainer } from "@styles/components/tasklist/taskDetails";
import {
  StyledTypography,
  TaskIconWrapper,
  TaskItemName,
} from "@styles/components/tasklist/tasklist.style";

import { tabItemsDetails } from "src/configs/taskdetails.constant";
import FormTab from "./formTab";
import InfoBox from "./infoBox";
import HistoryTab from "./historyTab";
import DiagramTab from "./diagramTab";
import DescriptionTab from "./descriptionTab";
import { useGetTaskByIdQuery, useUpdateTaskMutation } from "src/redux/services/tasklistApi";
import LoadingSpinner from "./loadingSpinner";
import DateTimePicker from "./dateTimePicker";
import { getJSDateFromDateString, getServerFormattedDate } from "src/utils/dateTimeUtils";
import Claim from "./claim";
import AddGroup from "./modals/addGroup";

// interfaces
interface ItemType {
  id: string;
  title: string;
  active: boolean;
}

interface TabItemProps {
  selectedItemId: string;
  updatedTabData: Array<ItemType>;
}

interface TaskDetailsProps {
  sidebarIsExpanded: boolean;
  selectedTaskId: string | undefined;
  handleReload: () => void;
}

interface ErrorType {
  status: number;
  data: Error;
}

// API will call - for UI building dummuy

const TaskDetails = ({ sidebarIsExpanded, selectedTaskId, handleReload }: TaskDetailsProps) => {
  const {
    data: taskDetails = {},
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetTaskByIdQuery(selectedTaskId ?? skipToken);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [activeTab, setActiveTab] = useState("form");
  const [tabItems, setTabItems] = useState(tabItemsDetails);

  const resetTabs = async () => {
    setActiveTab("form");
    setTabItems(tabItemsDetails);
  };
  useEffect(() => {
    resetTabs();
  }, [selectedTaskId]);

  const {
    followUp,
    due,
    assignee,
    id: taskId,
    _embedded: groupsData = {
      identityLink: [],
    },
  } = taskDetails;

  const followUpDate = useMemo(() => {
    return followUp ? getJSDateFromDateString(followUp) : null;
  }, [followUp]);

  const dueDate = useMemo(() => {
    return due ? getJSDateFromDateString(due) : null;
  }, [due]);

  /**
   * @name handleClick
   * @description Method for updating the state after the tab clicks
   * @param value
   */
  const handleClick = (value: TabItemProps) => {
    const { selectedItemId, updatedTabData } = value;
    setActiveTab(selectedItemId);
    setTabItems(updatedTabData);
  };

  /**
   * @name handleDateSave
   * @description Method for updating follow up and due date
   * @param value
   */
  const handleDateSave = async (value: string | null, key: string) => {
    try {
      await updateTask({
        taskId: taskDetails.id,
        body: {
          ...taskDetails,
          [key]: value,
        },
      }).unwrap();
    } catch (err) {
      // @Todo Toast will add here
      alert(err);
      console.error(err);
    }
  };

  /**
   * @name renderTabContent
   * @description Method for rendering the content based on the tabs
   */
  const renderTabContent = () => {
    const { description, processDefinitionId, id, processInstanceId, assignee } = taskDetails;
    switch (activeTab) {
      case "form":
        return (
          <FormTab
            processInstanceId={processInstanceId}
            taskId={id}
            assignee={assignee}
            handleReload={handleReload}
          />
        );
      case "history":
        return <HistoryTab taskId={id} />;
      case "diagram":
        return (
          <DiagramTab
            sidebarIsExpanded={sidebarIsExpanded}
            processDefinitionId={processDefinitionId || ""}
          />
        );
      case "description":
        return <DescriptionTab description={description} />;
      default:
        return (
          <FormTab
            processInstanceId={processInstanceId}
            taskId={id}
            assignee={assignee}
            handleReload={handleReload}
          />
        );
    }
  };

  if (isError) {
    return (
      <TaskDetailsContainer>
        <InfoBox
          type="error"
          text={(error as ErrorType)?.data?.message || "Something went wrong!"}
        />
      </TaskDetailsContainer>
    );
  }

  if (!selectedTaskId && !isLoading) {
    return (
      <TaskDetailsContainer>
        <InfoBox text="Select a task in the list" />
      </TaskDetailsContainer>
    );
  }

  const groupsDataValues =
    groupsData?.identityLink
      ?.filter((item) => item.type === "candidate" && item.groupId)
      .map(({ groupId, taskId, type }) => ({
        groupId,
        taskId,
        type,
      })) ?? [];

  return (
    <TaskDetailsContainer>
      {isLoading && (
        <Box height="100%" display="flex" position="relative">
          <LoadingSpinner />
        </Box>
      )}
      {!isLoading && (
        <>
          <Box display="flex">
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
            <TaskItemName variant="body1" fontStyle="normal">
              {taskDetails.name}
            </TaskItemName>
          </Box>
          {taskDetails.processDefinitionId && (
            <Box display="flex" pt={8}>
              <StyledTypography variant="h5" fontStyle="normal">
                {taskDetails?.processDefinitionId?.split(":")[0]}
              </StyledTypography>
            </Box>
          )}

          <TaskButtonWrapper
            variant={isUpdating || isFetching ? "disabled" : "default"}
            display="flex"
            flexWrap="wrap"
            mt={16}
          >
            <DateTimePicker
              dateValue={followUpDate}
              onSave={(date) => handleDateSave(getServerFormattedDate(date), "followUp")}
              initLabel="Set follow up date"
              icon="calendar"
              loading={isUpdating || isFetching}
            />
            <DateTimePicker
              dateValue={dueDate}
              onSave={(date) => handleDateSave(getServerFormattedDate(date), "due")}
              initLabel="Set due date"
              icon="bell"
              loading={isUpdating || isFetching}
            />
            <AddGroup taskId={taskId} groupsDataValues={groupsDataValues} />
            <Claim userId={assignee} taskId={taskId} />
          </TaskButtonWrapper>
          <Box mt={16}>
            <Tabs
              items={tabItems}
              type="default"
              onClick={(value: TabItemProps) => handleClick(value)}
            />
            {renderTabContent()}
          </Box>
        </>
      )}
    </TaskDetailsContainer>
  );
};

export default TaskDetails;
