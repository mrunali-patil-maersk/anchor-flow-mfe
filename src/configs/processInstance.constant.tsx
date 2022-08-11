import React from "react";
import { Icon, Typography } from "@anchor/react-components";
import {
  ProcessInstancesCol1,
  ProcessInstanceColIcon,
  JobDefinitionActionColIcon,
  ProcessInstancesFailedCol,
  ActionIconwrapper,
  ActionColIcon,
} from "@styles/components/process/process-instances-table.styles";
import ALink from "@/components/common/aLink";
import {
  ProcessInstanceAlignPauseIcon,
  ProcessInstanceAlignSuspendedIcon,
  ProcessInstanceAssignee,
} from "@styles/pages/process/details/process-instances/process-instances-internal.styles";
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
export const processInstanceTabItemsConfig = [
  {
    active: true,
    id: "variables",
    title: "Variables",
  },
  {
    active: false,
    id: "processIncidents",
    title: "Incidents",
  },
  {
    active: false,
    id: "calledProcessInstances",
    title: "Called process Instances",
  },
  {
    active: false,
    id: "userTask",
    title: "User task",
  },
  {
    active: false,
    id: "jobs",
    title: "Jobs",
  },
  {
    active: false,
    id: "externalTask",
    title: "External task",
  },
];
export const callProcessDefinitionsColumnData = [
  {
    render: (row: any, col: any) => StateRender(row[col.slotKey]),
    slotKey: "state",
    title: "State",
    sortable: true,
    width: 100,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "calledProcessInstance",
    title: "Called Process Instance",
    sortable: true,
    width: 300,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "processDefinition",
    title: "Process Definition",
    sortable: true,
    width: 252,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "processActivity",
    title: "Activity",
    sortable: true,
    width: 150,
  },
];
export const calledProcessInstancePrimaryKey: string = "calledProcessInstances";
export const scrollHeightTabs: string = "300px";
export const processInstanceRowData = [
  {
    state: "Success",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc7",
    processDefinition: "Armaan",
    processActivity: "Activity_101ril6",
  },
  {
    state: "Success",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc8",
    processDefinition: "Armaan1",
    processActivity: "Activity_101ril7",
  },
  {
    state: "Success",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc9",
    processDefinition: "Armaan2",
    processActivity: "Activity_101ril8",
  },
  {
    state: "Success",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc6",
    processDefinition: "Armaan3",
    processActivity: "Activity_101ril9",
  },
  {
    state: "Success",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc47",
    processDefinition: "Armaan4",
    processActivity: "Activity_101ril0",
  },
  {
    state: "Failed",
    calledProcessInstance: "51e5c5b0-79ef-11ec-b44d-f630dd3b2fc57",
    processDefinition: "Armaan5",
    processActivity: "Activity_101ril3",
  },
];

export const userTaskColumnData = [
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "activity",
    title: "Activity",
    sortable: true,
    width: 150,
  },
  {
    render: (row: any, col: any) => (
      <>
        {row[col.slotKey] ? (
          <ProcessInstanceAssignee>
            <Icon name="pencil"></Icon>
            {row[col.slotKey]}
          </ProcessInstanceAssignee>
        ) : (
          "-"
        )}
      </>
    ),
    slotKey: "assignee",
    title: "Assignee",
    sortable: true,
    width: 210,
  },
  {
    slotKey: "owner",
    title: "Owner",
    sortable: false,
    width: 100,
  },
  {
    slotKey: "creationDate",
    title: "Creation Date",
    sortable: true,
    width: 180,
  },
  {
    slotKey: "dueDate",
    title: "Due Date",
    sortable: true,
    width: 180,
  },
  {
    slotKey: "followUpDate",
    title: "Follow Up Date",
    sortable: true,
    width: 180,
  },
  {
    slotKey: "priority",
    title: "Priority",
    sortable: true,
    width: 120,
  },
  {
    slotKey: "delegationState",
    title: "Delegation State",
    sortable: false,
    width: 150,
  },
  {
    slotKey: "taskID",
    title: "Task ID",
    sortable: true,
    width: 300,
  },
];

export const userTaskInstancePrimaryKey: string = "owner";

export const jobsColumnData = [
  {
    slotKey: "jobId",
    title: "Job ID",
    sortable: true,
    width: 300,
  },
  {
    slotKey: "jobDueDate",
    title: "Due Date",
    sortable: true,
    width: 150,
  },
  {
    slotKey: "jobCreationDate",
    title: "Creation Date",
    sortable: false,
    width: 150,
  },
  {
    slotKey: "jobRetries",
    title: "Retries",
    sortable: true,
    width: 100,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "jobActivity",
    title: "Activity",
    sortable: false,
    width: 120,
  },
  {
    slotKey: "jobFailingActivity",
    title: "Failing activity",
    sortable: true,
    width: 150,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ProcessInstanceAssignee>
          <ProcessInstanceAlignPauseIcon>
            <Icon name="pause" />
          </ProcessInstanceAlignPauseIcon>
          <ProcessInstanceAlignSuspendedIcon variant="body2" fontStyle="normal">
            {"S"}
          </ProcessInstanceAlignSuspendedIcon>
        </ProcessInstanceAssignee>
      </>
    ),
    slotKey: "action",
    title: "Action",
    sortable: true,
    width: 120,
  },
];
export const jobsPrimaryKey: string = "jobId";
export const jobsRowData = [
  {
    jobId: "de8aba7a-9379-11eb",
    jobDueDate: "2021-12-03 19:00:21",
    jobCreationDate: "2021-12-03 19:00:21",
    jobRetries: "1",
    jobActivity: "GCSS Details",
    jobFailingActivity: "GCSS Details",
  },
];
export const VariablePrimaryKey: string = "name";
export const VariableColumnData = [
  { slotKey: "name", title: "Name", sortable: true, width: 179 },
  { slotKey: "type", title: "Type", sortable: true, width: 104 },
  { slotKey: "value", title: "Value", sortable: false, width: 274 },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "scope",
    title: "Scope",
    sortable: false,
    width: 166,
  },
  {
    render: (row: any, col: any) => (
      <ActionIconwrapper>
        <ActionColIcon name="calendar" />
        <ALink href="#">
          {row[col.slotKey]}
          <span className="iconTxt"> Edit</span>
        </ALink>
        <ActionColIcon name="trash" />
        <ALink href="#">
          {row[col.slotKey]}
          <span className="iconTxt"> Delete </span>
        </ALink>
      </ActionIconwrapper>
    ),
    slotKey: "actions",
    title: "Actions",
    sortable: false,
    width: 177,
  },
];
export const IncidentListPrimaryKey: string = "id";
export const IncidentListColumnData = [
  { slotKey: "id", isVisible: false, title: "Id", width: 252 },
  {
    slotKey: "incident_message",
    title: "Message",
    sortable: true,
    width: 186,
  },
  {
    slotKey: "incident_timestamp",
    title: "Timestamp",
    sortable: true,
    width: 161,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "incident_activity",
    title: "Activity",
    sortable: true,
    width: 109,
  },
  {
    slotKey: "incident_failing_activity",
    title: "Failing Activity",
    sortable: true,
    width: 170,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "incident_cause_instance",
    title: "Cause Process Instance",
    sortable: true,
    width: 210,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "root_cause_pr",
    title: "Root Cause Process Instance ID",
    sortable: true,
    width: 260,
  },
  {
    slotKey: "type",
    title: "Type",
    sortable: true,
    width: 121,
  },
];

export const externalTaskPrimaryKey = "id";
export const externalTaskColumnData = [
  {
    slotKey: "id",
    title: "External task Id",
    sortable: true,
    width: 300,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href="#">{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "activityId",
    title: "Activity",
    sortable: true,
    width: 200,
  },
  {
    slotKey: "retries",
    title: "Retries",
    sortable: true,
    width: 250,
  },
  {
    slotKey: "workerId",
    title: "Worker Id",
    sortable: true,
    width: 250,
  },
  {
    slotKey: "lockExpirationTime",
    title: "Lock Expiration Time",
    sortable: true,
    width: 200,
  },
  {
    slotKey: "topicName",
    title: "Topic",
    sortable: true,
    width: 100,
  },
  {
    slotKey: "priority",
    title: "Priority",
    sortable: true,
    width: 150,
  },
];
