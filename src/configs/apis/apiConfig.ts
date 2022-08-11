const FormData = require("form-data");
import Blob from "fetch-blob";

export const getAPIConfig = (url: string, query?: object) => {
  return {
    method: "get",
    url,
    params: query,
  };
};
export const postAPIConfig = (url: string, body?: any, method?: string) => {
  return {
    method: method || "post",
    url,
    data: body,
  };
};

export const deleteAPIConfig = (url: string) => {
  return {
    method: "delete",
    url,
  };
};

export const putAPIConfig = (url: string, body?: any) => {
  return {
    method: "put",
    url,
    data: body,
  };
};

export const getAPIParamsConfig = (URL, params) => {
  return {
    method: "get",
    url: `${URL}`,
    params: params,
  };
};
export const DataCountConfig = (URL, latestVersion = false) => {
  return {
    method: "get",
    url: `${URL}`,
    params: {
      ...(latestVersion && { latestVersion }),
    },
  };
};

export const multipartApiConfig = async (url: string, method: string, body?: any, req?: any) => {
  let formData = new FormData();
  function getBoundary(request) {
    let contentType = request.headers["content-type"];
    const contentTypeArray = contentType.split(";").map((item) => item.trim());
    const boundaryPrefix = "boundary=";
    let boundary = contentTypeArray.find((item) => item.startsWith(boundaryPrefix));
    if (!boundary) return null;
    boundary = boundary.slice(boundaryPrefix.length);
    if (boundary) boundary = boundary.trim();
    return boundary;
  }
  function getMatching(string, regex) {
    const matches = string.match(regex);
    if (!matches || matches.length < 2) {
      return null;
    }
    return matches[1];
  }

  const boundary = getBoundary(req);
  const rawDataArray = body.split(boundary);
  for (let item of rawDataArray) {
    let filename: any;
    let name = getMatching(item, /(?:name=")(.+?)(?:")/);
    if (!name || !(name = name.trim())) continue;
    let value = getMatching(item, /(?:\r\n\r\n)([\S\s]*)(?:\r\n--$)/);
    if (!value) continue;
    filename = getMatching(item, /(?:filename=")(.*?)(?:")/);
    if (filename) {
      let rawData = value;
      let valueIndex = item.indexOf(value[0]);
      let typeIndex = item.indexOf("Content-Type:");
      const contentType = item.substring(typeIndex + 13, valueIndex);
      const blob = new Blob([rawData.replace(/(\r\n|\n|\r)/gm, "")], { type: contentType });
      const buffer = await blob.arrayBuffer();
      const newBuffer = Buffer.from(buffer);
      formData.append(name, newBuffer, filename);
    }
    if (name && !filename) {
      formData.append(name, value);
    }
  }

  return {
    method: method,
    url,
    data: formData,
    headers: formData.getHeaders(),
  };
};

export const getBaseAPIUrl = () => {
  let baseApiUrl = "https://naas-camunda-wkf-app.dev.maersk-digital.net/anchor-flow/";
  return baseApiUrl;
};
