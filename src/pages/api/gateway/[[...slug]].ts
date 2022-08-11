import { NextApiRequest, NextApiResponse } from "next";
import {
  getBaseAPIUrl,
  getAPIConfig,
  postAPIConfig,
  multipartApiConfig,
  deleteAPIConfig,
} from "@/configs/apis/apiConfig";
import { apiGateway, graphMsBaseApiUrlV1, msGraph } from "src/configs/apis/apiEndPoints";
import { API } from "@/configs/apis/axiosAPI";

const msGraphController = async (urlEndpoint: string) => {
  const url: string = urlEndpoint.split(msGraph)[1] || "";
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query }: any = req;
  let urlEndpoint = req.url
    ? req.url.split(apiGateway)[1]
    : query && query.slug && query.slug.length && query.slug.join("/");

  const isMsGraphEndpoint = urlEndpoint.startsWith(`/${msGraph}`) as boolean;
  if (isMsGraphEndpoint) {
    urlEndpoint = urlEndpoint.split(msGraph)[1] ?? "";
  }

  let config: any;
  const params = req.query ? { ...req.query } : {};
  if (method === "GET") {
    config = getAPIConfig(urlEndpoint);
  } else if (method === "POST" || method === "PATCH" || method === "PUT") {
    if (req.headers["content-type"]?.includes("multipart/form-data;")) {
      config = await multipartApiConfig(urlEndpoint, method, body, req);
    } else {
      config = postAPIConfig(urlEndpoint, body, method);
    }
  } else if (method === "DELETE") {
    config = deleteAPIConfig(urlEndpoint);
  }

  config.req = req;
  const host = req?.headers?.host?.split(":")[0];

  if (host) {
    const baseApiUrl = getBaseAPIUrl();
    config.baseURL = baseApiUrl;
  } else {
    return res.status(500).json({ error: `Base API Url for host ${host} is not configured` });
  }
  try {
    config.isGraphAccessToken = false;
    // Graph AccessToken check, Base API URL and url
    if (isMsGraphEndpoint) {
      config.baseURL = graphMsBaseApiUrlV1;
      config.isGraphAccessToken = true;
      //Dynamic Replace AZURE_AD_SERVICE_OBJECT_ID in url
      config.url = config.url.replace(
        "AZURE_AD_SERVICE_OBJECT_ID",
        process.env.AZURE_AD_SERVICE_OBJECT_ID
      );
    }
    const response = await API(config).catch((err) => {
      if (err?.response?.status === 404) {
        throw new Error(`${err.config.url} not found`);
      }
      throw err;
    });
    const { data, status } = response;
    return res.status(status).send({ data });
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return res.status(error.response.status).send({ error: error.message });
    } else if (error.request) {
      return res.status(500).send({ error: "Failed to load data" });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).send({ error: error.message });
    }
  }
};
