import { apiGateway } from "@/configs/apis/apiEndPoints";
import { callApi } from "@/configs/apis/axiosAPI";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig, AxiosError } from "axios";

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (config: AxiosRequestConfig) => {
    try {
      const result = await callApi(apiGateway + config.url, config);
      return { data: result };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
