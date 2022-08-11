import React from "react";
import { Icon, Typography } from "@anchor/react-components";
import {
  ProcessInstancesCol1,
  ProcessInstancesSuccessCol,
  ProcessInstanceColIcon,
  JobDefinitionActionColIcon,
  ProcessInstancesFailedCol,
  ActionIconwrapper,
} from "@styles/components/process/process-instances-table.styles";
import ALink from "@/components/common/aLink";
import { DefinitionActionColIcon } from "@styles/pages/process/decision-definitions.styles";

const StateRender = (value: any = "Success") => (
  <ProcessInstancesCol1 state={value}>
    <ProcessInstanceColIcon>
      <Icon
        name={
          value === "Failed"
            ? "times-circle"
            : value === "In progress"
            ? "exclamation-circle"
            : "check-circle"
        }
      />
    </ProcessInstanceColIcon>
    <Typography variant="body2" fontStyle="normal">
      {value}
    </Typography>
  </ProcessInstancesCol1>
);

export const tabItemsConfig = [
  {
    id: "deployed",
    title: "Deployed",
    active: true,
  },
  {
    id: "draft",
    title: "Draft",
    active: false,
  },
];

export const processDefinitionListIcondata = [
  {
    key: "clipboard-check-text",
    name: "clipboard-check-text",
    value: "list",
    size: 20,
    active: true,
  },
  {
    key: "chart-bars-vertical",
    name: "chart-bars-vertical",
    value: "preview",
    size: 20,
    active: false,
  },
];

export const processDefinitionRowPrimaryKey: string = "id";

export const processDefinitionColumnData = [
  {
    slotKey: "id",
    isVisible: false,
    title: "Id",
    width: 252,
  },
  {
    render: (row: any, col: any) => StateRender(row[col.slotKey]),
    slotKey: "state",
    title: "State",
    width: 252,
  },
  {
    slotKey: "incidents",
    sortable: true,
    title: "Incidents",
    width: 180,
  },
  {
    slotKey: "running_instances",
    title: "Running Instances",
    sortable: true,
    width: 180,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink
          href={`/process/process-definitions/details?id=${row.id}&suspended=${row.suspended}`}
        >
          {row[col.slotKey]}
        </ALink>
      </>
    ),
    slotKey: "name",
    title: "Name",
    sortable: true,
    width: 252,
  },
  {
    slotKey: "versions",
    title: "Versions",
    sortable: true,
    width: 120,
  },
  {
    slotKey: "tenant_id",
    title: "Tenant ID",
    sortable: true,
    width: 180,
  },
];

export const processTabItemsConfig = [
  {
    active: true,
    id: "processInstances",
    title: "Process instances",
  },
  {
    active: false,
    id: "incidents",
    title: "Incidents",
  },
  {
    active: false,
    id: "calledDefinations",
    title: "Called process definations",
  },
  {
    active: false,
    id: "jobDefinations",
    title: "Job definations",
  },
];

export const processInstancesRowData = [
  {
    state: "Success",
    id: "de8aba7a-9379-11eb",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
  {
    state: "Success",
    id: "de8aba7a-9379-11eb",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
  {
    state: "Success",
    id: "de8aba7a-9379-11eb1",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
  {
    state: "Success",
    id: "de8aba7a-9379-11eb2",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
  {
    state: "Success",
    id: "de8aba7a-9379-11eb3",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
  {
    state: "Success",
    id: "de8aba7a-9379-11eb4",
    start_time: "2021-04-14 15:45:30",
    business_key: "2021-04-14 15:45:30",
  },
];
export const scrollHeightTabs: string = "300px";
export const processInstancesPrimaryKey: string = "id";
export const processInstancesColumnData = (processDefinitionId) => [
  {
    render: (row: any, col: any) => (
      <>
        {row[col.slotKey] === "Success" ? (
          <ProcessInstancesSuccessCol>
            <ProcessInstanceColIcon>
              <Icon name="check-circle" />
            </ProcessInstanceColIcon>
            <span> {row[col.slotKey]}</span>
          </ProcessInstancesSuccessCol>
        ) : (
          <ProcessInstancesFailedCol>
            <ProcessInstanceColIcon>
              <Icon name="times-circle" />
            </ProcessInstanceColIcon>
            <span> {row[col.slotKey]}</span>
          </ProcessInstancesFailedCol>
        )}
      </>
    ),
    slotKey: "state",
    sortable: false,
    title: "State",
    width: 283,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink
          href={`/process/process-definitions/details/process-instance?id=${processDefinitionId}&processId=${row.id}`}
        >
          {row[col.slotKey]}
        </ALink>
      </>
    ),
    slotKey: "id",
    title: "ID",
    sortable: false,
    width: 283,
  },
  {
    slotKey: "start_time",
    title: "Start time",
    sortable: true,
    width: 283,
  },
  {
    slotKey: "business_key",
    title: "Business Key",
    sortable: false,
    width: 283,
  },
];

export const callProcessDefinitionsRowData = [
  {
    callProcessDefinition: "GAM_PROCESS_INVOICE ",
    activity: "Process GAM",
  },
  {
    callProcessDefinition: "GAM_PROCESS_INVOICE ",
    activity: "Process GAM",
  },
  {
    callProcessDefinition: "GAM_PROCESS_INVOICE ",
    activity: "Process GAM",
  },
];

export const callProcessDefinitionsColumnData = [
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "callProcessDefinition",
    title: "Call Process Definition",
    sortable: true,
    width: 565,
  },
  {
    slotKey: "activity",
    title: "Activity",
    sortable: true,
    width: 570,
  },
];

export const jobDefinitionRowData = [
  {
    state: "Active",
    activity: "Update SAP",
    type: "async-continuation",
    configuration: "async-before",
    overridingJobPriority: "async-before",
    action: "",
  },
  {
    state: "Active",
    activity: "Update SAP traces",
    type: "async-continuation",
    configuration: "async-before",
    overridingJobPriority: "async-before",
    action: "",
  },
  {
    state: "Active",
    activity: "Update SAP traces in process",
    type: "async-continuation",
    configuration: "async-before",
    overridingJobPriority: "async-before",
    action: "",
  },
];

export const jobDefinitionColumnData = [
  {
    slotKey: "state",
    sortable: true,
    title: "State",
    width: 189,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "activity",
    title: "Activity",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "type",
    title: "Type",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "configuration",
    title: "Configuration",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "overridingJobPriority",
    title: "Overriding Job Priority",
    sortable: true,
    width: 189,
  },
  {
    render: () => (
      <span>
        <JobDefinitionActionColIcon name="pause" />
        <JobDefinitionActionColIcon name="cog" />
      </span>
    ),
    slotKey: "action",
    title: "Action",
    sortable: false,
    width: 189,
  },
];

//Start: Process Definition - Process Incident Tab, List Data's //
export const processIncidentListRowData = [
  {
    incident_id: 1001,
    incident_message: "404 not found",
    incident_process_instances: "5bf6025f-476",
    incident_timestamp: "2021-11-17 16:44:04",
    incident_activity: "Fetch Brand M",
    incident_failing_activity: "Fetch Brand M",
    incident_cause_instance: "de8aba7a-9379-11eb",
  },
  {
    incident_id: 1002,
    incident_message: "404 not found",
    incident_process_instances: "5bf6025f-476",
    incident_timestamp: "2021-11-17 16:44:04",
    incident_activity: "Fetch Brand M",
    incident_failing_activity: "Fetch Brand M",
    incident_cause_instance: "de8aba7a-9379-11eb",
  },
  {
    incident_id: 1003,
    incident_message: "404 not found",
    incident_process_instances: "5bf6025f-476",
    incident_timestamp: "2021-11-17 16:44:04",
    incident_activity: "Fetch Brand M",
    incident_failing_activity: "Fetch Brand M",
    incident_cause_instance: "de8aba7a-9379-11eb",
  },
];
export const processIncidentListRowPrimaryKey: string = "id";
export const processIncidentListColumnData = [
  {
    slotKey: "incident_id",
    isVisible: false,
    title: "Id",
    width: 185,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "incident_message",
    title: "Message",
    sortable: true,
    width: 189,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "incident_process_instances",
    title: "Process Instance",
    width: 189,
  },
  {
    slotKey: "incident_timestamp",
    title: "Timestamp",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "incident_activity",
    title: "Activity",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "incident_failing_activity",
    title: "Failing Activity",
    sortable: true,
    width: 189,
  },
  {
    slotKey: "incident_cause_instance",
    title: "Cause Process Instance",
    sortable: true,
    width: 189,
  },
];
//End: Process Definition - Process Incident Tab List Data's //

//Start: Process Definition - Left panel
export const processDefinitionLeftPanelRawData = {
  version: "3",
  version_tag: "V2.0",
  id: "Invoice: 2: de00256473",
  key: "Invoice",
  name: "Invoice receipt",
  history_time: {
    label: "Invoice receipt",
    cta: "http://www.google.com",
  },
  tenant_id: "",
  deployment: {
    label: "de8aba7a-9379-11eb",
    cta: "http://www.bing.com",
  },
  running_instance: [
    {
      label: "Current version",
      version: 3,
    },
    {
      label: "All versions",
      version: 6,
    },
  ],
};

//End: Process Definition - Left panel

//Start: Process Draft  - Process Draft, List Data's //
export const processDraftListRowData = [
  {
    id: 1001,
    state: "Success",
    incidents: "5",
    running_instances: "4",
    name: "Auto Indexing",
    versions: "V3",
    tenant_id: "de8aba7a-9379-11eb",
  },
  {
    id: 1002,
    state: "In progress",
    incidents: "5",
    running_instances: "4",
    name: "Auto Indexing",
    versions: "V3",
    tenant_id: "de8aba7a-9379-11eb",
  },
  {
    id: 1003,
    state: "Failed",
    incidents: "5",
    running_instances: "4",
    name: "Auto Indexing",
    versions: "V3",
    tenant_id: "de8aba7a-9379-11eb",
  },
];
export const processDraftListRowPrimaryKey: string = "id";
export const processDraftListColumnData = [
  ...processDefinitionColumnData,
  {
    render: (row: any, col: any) => (
      <>
        <ActionIconwrapper>
          <DefinitionActionColIcon name="pencil" />
          <ALink href={"#"}>
            {row[col.slotKey]}
            <span className="iconTxt"> Edit</span>
          </ALink>
          <DefinitionActionColIcon name="file-copy" />
          <ALink href={"#"}>
            {row[col.slotKey]}
            <span className="iconTxt"> Clone </span>
          </ALink>
        </ActionIconwrapper>
      </>
    ),
    slotKey: "action",
    title: "Action",
    sortable: false,
    width: 170,
  },
];
//End: Process Draft
//Start: process suspend process popup
export const activateProcess = {
  processMessage:
    "This process definition will be activated, so that it will be possible to start new process instances based on this process definition.",
  processConfirm: "Do you really want to activate this process definition?",
  processHeading: "Activate Process Definition",
  processSaveText: "Activate",
};
export const suspendProcess = {
  processMessage:
    "This process definition will be suspended, so that it will not be possible to start new process instances based on this process definition.",
  processConfirm: "Do you really want to suspend this process definition?",
  processHeading: "Suspend Process Definition",
  processSaveText: "Suspend",
};
export const suspendProcessMessage =
  "This process definition will be suspended, so that it will not be possible to start new process instances based on this process definition.";
export const activateProcessMessage =
  "This process definition will be activated, so that it will be possible to start new process instances based on this process definition.";
export const suspendProcessConfirm = "Do you really want to suspend this process definition?";
export const activateProcessConfirm = "Do you really want to activate this process definition?";
//End: process suspend process popup

//Start: process job priority popup
export const changeJobHeading = "Change Overriding Job Priority";
export const changeJobMessgae =
  " Change for each job definition associated to this process definition the overriding job priority";
export const changeJobConfirm = "Do you really want to change the overriding job priority?";
