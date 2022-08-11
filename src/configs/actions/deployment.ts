/**
 * @name getDeploymentConfig
 * @description the following method is used for fetching the bpmn or dmn xml
 * @param url
 * @returns
 */
export const getDeploymentConfig = (url: string) => {
  return {
    method: "get",
    url: url,
  };
};
