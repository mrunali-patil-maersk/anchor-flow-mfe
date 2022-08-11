import { createApi } from "@reduxjs/toolkit/query/react";
import {
  historyCommentByIdUrl,
  historyUserOperationCountUrl,
  historyUserOperationUrl,
  processDefinitionStartFormById,
  processDefinitionSubmitFormById,
  startCountDefinitionsCountUrl,
  startProcessDefinitionsUrl,
  taskFormByTaskIdUrl,
  taskFormProcessInstanceByIdUrl,
  taskFormSubmitByTaskId,
  taskFormVariablesByTaskId,
  taskListCountUrl,
  taskListGetIdUrl,
  taskListGetUrl,
} from "@/configs/apis/apiEndPoints";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";
// Note: Dummy data for testing - No data yet available in API
import { historyData } from "src/dummydata/history";

export const MAX_RESULT_PER_PAGE = 15;
export const StartIndex = 0;

export const tasklistApi = createApi({
  reducerPath: "tasklistApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Tasks", "Task", "TaskCount"],
  endpoints(build) {
    return {
      getTasks: build.query<
        any,
        {
          maxResult?: number;
          startIndex?: number;
          assignee?: string;
          groupId?: string;
          sortBy?: string;
          sortOrder?: "asc" | "desc";
          nameLike?: string;
        }
      >({
        query: ({
          maxResult = MAX_RESULT_PER_PAGE,
          startIndex = StartIndex,
          assignee,
          groupId,
          sortBy,
          sortOrder,
          nameLike,
        }) => ({
          url: taskListGetUrl,
          method: "get",
          params: {
            maxResult,
            startIndex,
            ...(assignee ? { assignee: assignee } : {}),
            ...(groupId ? { groupId: groupId } : {}),
            ...(sortBy ? { sortBy: sortBy } : {}),
            ...(sortOrder ? { sortOrder: sortOrder } : {}),
            ...(nameLike ? { nameLike: nameLike } : {}),
          },
        }),
        providesTags: ["Tasks"],
      }),
      getTaskById: build.query<any, string>({
        query: (id) => ({
          url: `${taskListGetIdUrl}/${id}`,
          method: "get",
          headers: {
            "Content-Type": "application/hal+json",
            accept: "application/hal+json",
          },
        }),
        providesTags: ["Task"],
      }),
      getTaskCount: build.query<any, { assignee?: string; groupId?: string }>({
        query: ({ assignee, groupId }) => ({
          url: taskListCountUrl,
          method: "get",
          params: {
            ...(assignee ? { assignee: assignee } : {}),
            ...(groupId ? { candidateGroups: groupId } : {}),
          },
        }),
        providesTags: ["TaskCount"],
      }),

      getProcessDefinitionsList: build.query<
        any,
        { firstResult: number; maxResults: number; nameLike?: string }
      >({
        query: ({ firstResult, maxResults, nameLike }) => ({
          url: startProcessDefinitionsUrl,
          method: "get",
          params: {
            latest: true,
            active: true,
            startableInTasklist: true,
            startablePermissionCheck: true,
            firstResult: firstResult,
            maxResults: maxResults,
            ...(nameLike ? { nameLike: `%${nameLike}%` } : {}),
          },
        }),
      }),
      getProcessDefinitionsCount: build.query<
        any,
        { firstResult: number; maxResults: number; nameLike: string }
      >({
        query: ({ firstResult, maxResults, nameLike }) => ({
          url: startCountDefinitionsCountUrl,
          method: "get",
          params: {
            latest: true,
            active: true,
            startableInTasklist: true,
            startablePermissionCheck: true,
            firstResult: firstResult,
            maxResults: maxResults,
            ...(nameLike ? { nameLike: `%${nameLike}%` } : {}),
          },
        }),
      }),
      getProcessStartForm: build.query<any, string>({
        query: (id: string) => ({
          url: processDefinitionStartFormById(id),
          method: "get",
        }),
      }),
      submitStartForm: build.mutation<
        any,
        {
          id: string;
          body: {
            businessKey?: string;
            variables: object;
          };
        }
      >({
        query: ({ id, body }) => ({
          url: processDefinitionSubmitFormById(id),
          method: "POST",
          data: body,
        }),
        invalidatesTags: ["Tasks", "TaskCount"],
      }),
      /* History API */
      getHistoryCount: build.query<any, string>({
        query: (taskId) => ({
          url: historyUserOperationCountUrl,
          method: "get",
          params: {
            taskId: taskId,
          },
        }),
      }),

      getHistoryList: build.query<
        Array<any>,
        { taskId: string; maxResults: number; firstResult: number }
      >({
        query: ({ taskId, maxResults, firstResult }) => ({
          url: historyUserOperationUrl,
          method: "get",
          params: {
            taskId,
            maxResults,
            firstResult,
          },
        }),
        transformResponse: async (response: Array<any>) => {
          const isTimestampProperty = (propertyName: string) =>
            ["dueDate", "followUpDate"].indexOf(propertyName) !== -1;
          const data = response
            ? response.map((history) => ({
                ...history,
                propertyIsDate: isTimestampProperty(history.property),
              }))
            : [];
          return data;
        },
      }),

      getCommentList: build.query<Array<any>, string>({
        query: (taskId) => ({
          url: historyCommentByIdUrl(taskId),
          method: "get",
        }),
        transformResponse: (response: Array<any>) => {
          return response
            ? response?.map((comment) => ({
                ...comment,
                propertyIsDate: false,
                operationType: "Comment",
                timestamp: comment.time,
              }))
            : [];
        },
      }),

      /* Form API */
      getTaskForm: build.query<any, string>({
        query: (taskId) => ({
          url: taskFormByTaskIdUrl(taskId),
          method: "get",
        }),
      }),

      getTaskFormVariables: build.query<any, string>({
        query: (taskId) => ({
          url: taskFormVariablesByTaskId(taskId),
          method: "get",
        }),
        transformResponse: (res) => {
          /** return key:value pair data */
          return res
            ? Object.entries(res as any).reduce((acc, [key, value]) => {
                if (!acc[key]) {
                  acc[key] = (value as any).value;
                }
                return acc;
              }, {})
            : {};
        },
      }),

      getTaskFormProcessInstance: build.query<any, string>({
        query: (processInstanceId) => ({
          url: taskFormProcessInstanceByIdUrl(processInstanceId),
          method: "get",
        }),
      }),

      postTaskSubmitForm: build.mutation<
        any,
        {
          taskId: string;
          body: {
            variables: object;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: taskFormSubmitByTaskId(taskId),
          method: "post",
          data: body,
        }),
        invalidatesTags: ["Tasks", "TaskCount"],
      }),

      saveTaskFormVariables: build.mutation<
        any,
        {
          taskId: string;
          body: {
            modifications?: {
              [key: string]: { value: string; type?: string; valueInfo?: object };
            };
            deletions?: Array<string>;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: taskFormVariablesByTaskId(taskId),
          method: "post",
          data: body,
          validateStatus: (status) => status === 204,
          transformResponse: (res) => {
            return res ? res : { data: "Form data updated!" };
          },
        }),
        invalidatesTags: ["Task"],
      }),

      // Date Update
      updateTask: build.mutation<
        any,
        {
          taskId: string;
          body: {
            name?: string | null;
            description?: string | null;
            assignee?: string | null;
            owner?: string | null;
            delegationState?: string | null;
            due?: string | null;
            followUp?: string | null;
            priority?: number;
            parentTaskId?: string | null;
            caseInstanceId?: string | null;
            tenantId?: string;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: `${taskListGetIdUrl}/${taskId}`,
          method: "put",
          data: body,
        }),
        invalidatesTags: ["Task"],
      }),

      // claim task by userId
      claimTask: build.mutation<
        any,
        {
          taskId: string;
          body: {
            userId: string;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: `${taskListGetIdUrl}/${taskId}/claim`,
          method: "POST",
          data: body,
        }),
        invalidatesTags: ["Tasks", "Task", "TaskCount"],
      }),

      // unclaim
      unClaimTask: build.mutation<
        any,
        {
          taskId: string;
        }
      >({
        query: ({ taskId }) => ({
          url: `${taskListGetIdUrl}/${taskId}/unclaim`,
          method: "POST",
          data: {},
        }),
        invalidatesTags: ["Tasks", "Task", "TaskCount"],
      }),

      // claim - assignee task by userId
      assigneeTask: build.mutation<
        any,
        {
          taskId: string;
          body: {
            userId: string;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: `${taskListGetIdUrl}/${taskId}/assignee`,
          method: "POST",
          data: body,
        }),
        invalidatesTags: ["Tasks", "Task", "TaskCount"],
      }),

      // add group - adding group by id
      addGroupToTask: build.mutation<
        any,
        {
          taskId: string;
          body: {
            groupId: string;
            type: string;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: `${taskListGetIdUrl}/${taskId}/identity-links`,
          method: "POST",
          data: body,
        }),
        invalidatesTags: ["Task", "TaskCount"],
      }),

      // remove group - adding groups by id
      deleteGroupToTask: build.mutation<
        any,
        {
          taskId: string;
          body: {
            groupId: string;
            type: string;
          };
        }
      >({
        query: ({ taskId, body }) => ({
          url: `${taskListGetIdUrl}/${taskId}/identity-links/delete`,
          method: "POST",
          data: body,
        }),
        invalidatesTags: ["Task", "TaskCount"],
      }),
    };
  },
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useGetTaskCountQuery,
  useGetProcessDefinitionsListQuery,
  useGetProcessDefinitionsCountQuery,
  useGetProcessStartFormQuery,
  useSubmitStartFormMutation,
  useGetHistoryCountQuery,
  useGetHistoryListQuery,
  useGetCommentListQuery,
  useGetTaskFormQuery,
  useGetTaskFormProcessInstanceQuery,
  useGetTaskFormVariablesQuery,
  usePostTaskSubmitFormMutation,
  useSaveTaskFormVariablesMutation,
  useUpdateTaskMutation,
  useClaimTaskMutation,
  useUnClaimTaskMutation,
  useAssigneeTaskMutation,
  useAddGroupToTaskMutation,
  useDeleteGroupToTaskMutation,
} = tasklistApi;
