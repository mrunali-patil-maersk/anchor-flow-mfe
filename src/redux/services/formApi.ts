import {
  draftApiUrl,
  draftContentByAttachmentIdApiUrl,
  getDraftFormsApiUrl,
} from "@/configs/apis/apiEndPoints";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Forms", "Form"],
  endpoints(build) {
    return {
      getFormsList: build.query<
        any,
        {
          pageNumber?: number;
          pageSize?: number;
          name?: string;
        }
      >({
        query: ({ pageNumber, pageSize, name }) => ({
          url: getDraftFormsApiUrl,
          method: "GET",
          params: {
            ...(pageNumber ? { page: pageNumber } : {}),
            ...(pageSize ? { limit: pageSize } : {}),
            ...(name ? { name: name } : {}),
          },
        }),
        providesTags: ["Forms"],
      }),
      getFormSchema: build.query<any, string>({
        query: (attachmentId) => ({
          url: draftContentByAttachmentIdApiUrl(attachmentId),
          method: "GET",
          validateStatus: (status) => status === 200,
        }),
        providesTags: ["Form"],
      }),
      saveFormSchema: build.mutation<any, any>({
        query: (data) => ({
          url: draftApiUrl,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data,
        }),
        invalidatesTags: ["Forms"],
      }),
      updateFormSchema: build.mutation<
        any,
        {
          attachmentId: string;
          data: any;
        }
      >({
        query: ({ attachmentId, data }) => ({
          url: `${draftApiUrl}/${attachmentId}`,
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: data,
        }),
        invalidatesTags: ["Forms", "Form"],
      }),

      deleteFormSchema: build.mutation<any, string>({
        query: (attachmentId) => ({
          url: `${draftApiUrl}/${attachmentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Forms"],
      }),
    };
  },
});

export const {
  useGetFormsListQuery,
  useGetFormSchemaQuery,
  useSaveFormSchemaMutation,
  useUpdateFormSchemaMutation,
  useDeleteFormSchemaMutation,
} = formApi;

export default formApi;
