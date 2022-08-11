export const breadcrumbConstant = {
  dashboard: {
    label: "Dashboard",
    path: "/dashboard",
    breadcrumbLocator: "dashboard",
  },
  tasklist: {
    label: "Tasklist",
    path: "/dashboard",
    breadcrumbLocator: "dashboard.tasklist",
  },
  my_task: {
    label: "My Task",
    path: "/tasklist/my_task",
    breadcrumbLocator: "dashboard.tasklist.my_task",
  },
  my_group_task: {
    label: "My Group Task",
    path: "/tasklist/my_group_task",
    breadcrumbLocator: "dashboard.tasklist.my_group_task",
  },
  all_task: {
    label: "All task",
    path: "/tasklist/all_task",
    breadcrumbLocator: "dashboard.tasklist.all_task",
  },
  completed_task: {
    label: "Completed task",
    path: "/tasklist/completed_task",
    breadcrumbLocator: "dashboard.tasklist.completed_task",
  },
  admin: {
    label: "Admin",
    path: "/dashboard",
    breadcrumbLocator: "dashboard.admin",
  },
  users: {
    label: "Users",
    path: "/users",
    breadcrumbLocator: "dashboard.admin.users",
  },
  groups: {
    label: "Groups",
    path: "/groups",
    breadcrumbLocator: "dashboard.admin.groups",
  },
  groups_members: {
    label: "Members",
    path: "/groups/[id]/members",
    breadcrumbLocator: "dashboard.admin.groups.groups_members",
  },
  "create-workflow": {
    label: "Create Workflow",
    path: "/dashboard",
    breadcrumbLocator: "dashboard.create_workflow",
  },
  bpmn: {
    label: "BPMN diagram",
    path: "/create-workflow/bpmn?deploymentId=default&resourceId=default",
    breadcrumbLocator: "dashboard.create-workflow.bpmn",
  },
  dmn: {
    label: "DMN diagram",
    path: "/create-workflow/dmn?deploymentId=default",
    breadcrumbLocator: "dashboard.create-workflow.dmn",
  },
  form: {
    label: "Form",
    path: "/create-workflow/form",
    breadcrumbLocator: "dashboard.create-workflow.form",
  },
  process: {
    label: "Definitions",
    path: "/dashboard",
    breadcrumbLocator: "dashboard.process",
  },
  process_definitions: {
    label: "Processes",
    path: "/process/process-definitions",
    breadcrumbLocator: "dashboard.process.process_definitions",
  },
  process_definitions_details: {
    label: "Details",
    path: "/process/process-definitions/details",
    breadcrumbLocator: "dashboard.process.process_definitions.process_definitions_details",
  },
  process_instance_details: {
    label: "Instance",
    path: "/process/process-definitions/details/process-instance",
    breadcrumbLocator:
      "dashboard.process.process_definitions.process_definitions_details.process_instance_details",
  },
  decision_definitions: {
    label: "Decisions",
    path: "/decision/decision-definitions",
    breadcrumbLocator: "dashboard.process.decision_definitions",
  },
  decision_definitions_details: {
    label: "Details",
    path: "/decision/decision-definitions/details",
    breadcrumbLocator: "dashboard.process.decision_definitions.decision_definitions_details",
  },
  deployments: {
    label: "Deployments",
    path: "/process/deployments",
    breadcrumbLocator: "dashboard.process.deployments",
  },
  forms: {
    label: "Forms",
    path: "/forms",
    breadcrumbLocator: "dashboard.forms",
  },
  forms_details: {
    label: "Details",
    path: "/forms/details",
    breadcrumbLocator: "dashboard.forms.forms_details",
  },
};
