/**
 * @name getListAndCountConfig
 * @description the following method is used for fetching the list and count of decisions definitions
 * @param firstResult
 * @param maxResults
 * @param name
   @param latestVersion 
   @param sortBy 
   @param sortOrder
 * @returns
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
      /* Todo: latestVersion: true not working with search */
      ...(latestVersion && {
        latestVersion: false,
      }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
    },
  };
};

/**
 * @name getDesicionsConfig
 * @description the following method is used for fetching the list and count of decisions definitions
 * @param firstResult
 * @param maxResults
 * @returns
 */
export const getDesicionsIncidentConfig = (url, firstResult, maxResults, sortBy, sortOrder) => {
  return {
    method: "get",
    url: url,
    headers: {
      Accept: "application/json",
    },
    params: {
      firstResult,
      maxResults,
      sortBy,
      sortOrder,
    },
  };
};
