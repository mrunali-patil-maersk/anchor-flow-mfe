/**
 * @name getListAndCountConfig
 * @description the following method is used for fetching the list and count of deployments and processes based on the URL
 * @param url
 * @param firstResult
 * @param maxResults
 * @param name
 * @returns object
 */
export const getListAndCountConfig = (
  url = "",
  firstResult = 0,
  maxResults = 0,
  nameLike = "",
  latestVersion = false,
  sortBy = "",
  sortOrder = ""
) => {
  return {
    method: "get",
    url: url,
    params: {
      firstResult,
      maxResults,
      ...(nameLike && { nameLike: nameLike.trim() }),
      ...(latestVersion && { latestVersion }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
    },
  };
};

/**
 * @name getJobDefinitionsListConfig
 * @description the following method is used for fetching JobDefinitionsList
 * @param url
 * @param firstResult
 * @param maxResults
 * @returns object
 */
export const getJobDefinitionsListConfig = (url, firstResult, maxResults) => {
  return {
    method: "get",
    url: url,
    params: {
      firstResult,
      maxResults,
    },
  };
};

/**
 * @name getDataBasedOnUrl
 * @description method used to fetch the data based upon url
 * @description the url can contain ids as well
 * @param url
 * @returns object
 */
export const getDataBasedOnUrl = (url) => {
  return {
    method: "get",
    url: url,
  };
};

/**
 * @name getProcessDefinitionApiConfig
 * @description method to build config of get apis used in process definition screen
 * @param url
 * @returns object
 */
export const getProcessDefinitionApiConfig = (url: string) => {
  return {
    method: "get",
    url: url,
  };
};

/**
 * @name postProcessApiConfig
 * @description method to build config of post apis used in process screen
 * @param url
 * @returns object
 */
export const postProcessApiConfig = (url: string, body) => {
  return {
    method: "post",
    url: url,
    data: body,
  };
};

export const processInternalPostInstanceApiConfig = (url: string, body: {}) => {
  return {
    method: "post",
    url: url,
    data: body,
  };
};

export const processPutApiConfig = (url: string, body: {}) => {
  return {
    method: "put",
    url: url,
    data: body,
  };
};

/**
 * @name getVariableListConfig
 * @description the following method is used for fetching the list
 * @param firstResult
 * @param maxResults
 * @returns
 *
 */

export const getVariableListConfig = (
  url,
  firstResult,
  maxResults,
  deserializeValues,
  processInstanceId
) => {
  let body = {
    processInstanceIdIn: [processInstanceId],
    sorting: [
      {
        sortBy: "variableName",

        sortOrder: "asc",
      },
    ],
  };
  return {
    method: "post",
    url: url,
    data: body,
    params: {
      firstResult,
      maxResults,
      deserializeValues,
    },
  };
};
