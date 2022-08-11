import { taskListGetUrl } from "../apis/apiEndPoints";

export const getTaskListConfig = () => {
  return {
    method: "get",
    url: taskListGetUrl,
    headers: {
      Accept: "application/json",
    },
  };
};

export const getTaskByIdConfig = (taskId: string) => {
  return {
    method: "get",
    url: `${taskListGetUrl}/${taskId}`,
    headers: {
      Accept: "application/json",
    },
  };
};
