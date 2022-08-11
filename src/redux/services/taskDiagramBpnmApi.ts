import { createApi } from "@reduxjs/toolkit/query/react";
import { processDefinitionXMLWithId } from "@/configs/apis/apiEndPoints";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";

export const taskDiagramBpnmApi = createApi({
  reducerPath: "taskDiagramBpnmApi",
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getBpnmDiagramXML: build.query<any, string>({
        query: (id) => ({
          url: processDefinitionXMLWithId(id),
          method: "get",
        }),
      }),
    };
  },
});

export const { useGetBpnmDiagramXMLQuery } = taskDiagramBpnmApi;
