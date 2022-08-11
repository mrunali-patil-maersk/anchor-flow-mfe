// End points

//common api gateway
export const apiGateway = "/api/gateway";

//
export const baseAPIAnchorFlow = "/anchor-flow";

// modeler
export const bpmnDeploymentUrl = baseAPIAnchorFlow + "/deployment/create";

// process definition statistics
export const processDefinitionStatisticsUrl =
  baseAPIAnchorFlow + "/engine/default/process-definition/statistics";

// task
export const taskUrl = baseAPIAnchorFlow + "/engine/default/task";
export const taskListGetUrl = `/api${baseAPIAnchorFlow}/tasks`;
export const taskListGetIdUrl = baseAPIAnchorFlow + "/task";
export const taskListCountUrl = baseAPIAnchorFlow + "/task/count";

// tasklist process BPNM diagram
export const processDefinitionXMLWithId = (id: string) =>
  `${baseAPIAnchorFlow}/process-definition/${id}/xml`;

// process
export const deploymentUrl = baseAPIAnchorFlow + "/deployment";
export const deploymentCountUrl = baseAPIAnchorFlow + "/deployment/count";
export const processListUrl = baseAPIAnchorFlow + "/process-definition";
export const processListCountUrl = baseAPIAnchorFlow + "/process-definition/count";
export const DecisionDefinitionCountUrl = baseAPIAnchorFlow + "/decision-definition/count";
export const processInstancesByIdUrl = (id) =>
  `${baseAPIAnchorFlow}/process-instance?processDefinitionId=${id}`;
export const processIncidentsUrl = (id) =>
  `${baseAPIAnchorFlow}/incident?processDefinitionId=${id}`;
export const processInstancesUrl = baseAPIAnchorFlow + "/process-instance";
export const calledProcessInstancesUrl = (id) =>
  `/api${baseAPIAnchorFlow}/called-process-instances/${id}`;

// bpmn
export const deploymentBpmnUrlWithId = (id, resourceId) =>
  `${baseAPIAnchorFlow}/deployment/${id}/resources/${resourceId}/data`;

// dmn
export const deploymentDmnUrlWithId = (id) => `${baseAPIAnchorFlow}/decision-definition/${id}/xml`;

// Start process - tasklist
export const startProcessDefinitionsUrl = baseAPIAnchorFlow + "/process-definition";
export const startCountDefinitionsCountUrl = `${startProcessDefinitionsUrl}/count`;
export const processDefinitionStartFormById = (id: string) =>
  `${startProcessDefinitionsUrl}/${id}/startForm`;
export const processDefinitionSubmitFormById = (id: string) =>
  `${startProcessDefinitionsUrl}/${id}/submit-form`;

// History - Tasklist
export const historyUserOperationUrl = baseAPIAnchorFlow + "/history/user-operation";
export const historyUserOperationCountUrl = `${historyUserOperationUrl}/count`;

// Comment - History Tasklist
export const historyCommentByIdUrl = (taskId: string) => `${taskListGetIdUrl}/${taskId}/comment`;

// process-JobDefinationsList
export const jobDefinitionsListUrl = (processId: string | undefined | string[]) =>
  `${baseAPIAnchorFlow}/job-definition?processDefinitionId=${processId}`;

// Form - Tasklist
export const taskFormByTaskIdUrl = (taskId: string) => `${taskListGetIdUrl}/${taskId}/form`;
export const taskFormProcessInstanceByIdUrl = (processInstanceId: string) =>
  `${baseAPIAnchorFlow}/process-instance/${processInstanceId}`;
export const taskFormSubmitByTaskId = (taskId: string) => `${taskListGetIdUrl}/${taskId}/complete`;
export const taskFormVariablesByTaskId = (taskId: string) =>
  `${taskListGetIdUrl}/${taskId}/variables`;

//decision-definition
export const DecisionDefinitionListUrl = baseAPIAnchorFlow + "/decision-definition";
//calledProcessDefinitions
export const calledProcessDefinitions = (id: string) =>
  `${baseAPIAnchorFlow}/process-definition/${id}/static-called-process-definitions`;

// process definitions
export const processDefinitionApiUrl = baseAPIAnchorFlow + "/process-definition";

// process instance count
export const processInstanceCountApiUrl = baseAPIAnchorFlow + "/process-instance/count";

// graph api v1
export const graphMsBaseApiUrlV1 = "https://graph.microsoft.com/v1.0";
export const msGraph = "ms-graph";
export const commonGraphEndPoint = `${apiGateway}/${msGraph}`;
export const groupsGraphApiUrl = `${commonGraphEndPoint}/groups/`;
export const groupsMembersByIdGraphApiUrl = (groupId: string) =>
  `${groupsGraphApiUrl}${groupId}/members/microsoft.graph.user`;
export const appRolesByAppIdApiUrl = (appId: string) =>
  `${commonGraphEndPoint}/applications?$filter=appId eq '${appId}'&$select=appRoles`;
export const appGroupsByObjectIdApiUrl = `${commonGraphEndPoint}/servicePrincipals/AZURE_AD_SERVICE_OBJECT_ID/appRoleAssignedTo?$select=id,appRoleId,principalDisplayName,principalId,principalType`;
// Decision instance
export const decisionsInstancesUrl = (id) =>
  `${baseAPIAnchorFlow}/history/decision-instance?decisionDefinitionId=${id}`;

export const DecisionDefintionLeftPanelUrl = (id: string) =>
  `${baseAPIAnchorFlow}/decision-definition/${id}`;

// VariableList
export const VariableListUrl = baseAPIAnchorFlow + "/variable-instance";
//internal process instance
export const processInstanceUserTaskApiUrl = baseAPIAnchorFlow + "/task";
export const processInstanceJobsUrl = baseAPIAnchorFlow + "/job";
export const externalTaskAPIUrl = baseAPIAnchorFlow + "/external-task";

/** Draft Base API */
export const draftApiUrl = `/api${baseAPIAnchorFlow}/draft`;
export const draftContentByAttachmentIdApiUrl = (attachmentId: string) =>
  `${draftApiUrl}/${attachmentId}/content`;

/** Form - Draft API */
export const getDraftFormsApiUrl = `${draftApiUrl}?type=Form`;

/**Process - Draft API*/
export const processDraftListUrl = `${draftApiUrl}?type=Process`;

/**Process - Modal suspend activate */
export const processDefSuspend = (processId: string) =>
  `${baseAPIAnchorFlow}/process-definition/${processId}/suspended`;

/**Process - Modal change job priority */
export const processChangeJobPriority = (processId: string) =>
  `${baseAPIAnchorFlow}/job-definition/${processId}/jobPriority`;
