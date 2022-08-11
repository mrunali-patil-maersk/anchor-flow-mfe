import axios from "axios";
import { getSession } from "@anchor/anchor-auth/react";
import { getToken } from "@anchor/anchor-auth/jwt";

export const getAccessToken = async (isAPIToken = true) => {
  const session = await getSession();
  if (!session) return null;
  const apiTokenDetails = session?.apiTokenDetails as any;
  if (apiTokenDetails && isAPIToken) {
    const apiAccessToken = apiTokenDetails?.accessToken;
    return apiAccessToken;
  } else {
    return session.graphAccessToken;
  }
};

// Axios instance with base url
const API = axios.create({
  // baseURL: baseApiUrl,
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
API.interceptors.request.use(
  async (config: any) => {
    let accessToken: any;
    if (config.req) {
      const session: any = await getToken({
        req: config.req,
        secret: process.env.SECRET || "",
        secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://"),
      });

      if (config.isGraphAccessToken) {
        accessToken = session?.graphAccessToken ?? (await getAccessToken(false));
      } else {
        accessToken = (session?.apiTokenDetails?.accessToken as string) ?? (await getAccessToken());
      }
    }

    if (accessToken) {
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (config?.req?.headers.accept) {
      config.headers["accept"] = config.req.headers.accept;
    }
    if (config?.req?.headers["Content-Type"]) {
      config.headers["Content-Type"] = config.req.headers["Content-Type"];
    }
    //Graph API count required
    if (config?.req?.headers["consistencylevel"]) {
      config.headers["consistencylevel"] = config.req.headers["consistencylevel"];
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const callApi = async (url: any, config?: Object) => {
  const response = await axios(url, config);
  return response?.data?.data;
};

export { API, callApi };
