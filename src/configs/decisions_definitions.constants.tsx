import React from "react";
import { Icon } from "@anchor/react-components";
import {
  DefinitionActionColIcon,
  ActionIconwrapper,
} from "@styles/pages/process/decision-definitions.styles";
import {
  ProcessInstancesSuccessCol,
  ProcessInstanceColIcon,
  ProcessInstancesFailedCol,
} from "@styles/components/process/process-instances-table.styles";
import ALink from "@/components/common/aLink";

export const decisionsListRowData = [
  {
    state: "Success",
    name: "Create_Dispute_Payload",
    versions: "Dispute",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "AutoIndexing",
    versions: "Dispute",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "OHP_DISPUTE_CREATE",
    versions: "Dispute",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "CreditType",
    versions: "GAM",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "AutoIndexing",
    versions: "Dispute",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "CreditType",
    versions: "GAM",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "Create_Dispute_Payload",
    versions: "Dispute",
    tenant_id: "",
  },
  {
    state: "Success",
    name: "Create_Dispute_Payload",
    versions: "GAM",
    tenant_id: "",
  },
];
export const decisionsListPrimaryKey: string = "id";
export const decisionsListColumnData = [
  {
    slotKey: "id",
    isVisible: false,
    title: "Id",
    width: 250,
  },
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
    title: "State",
    width: 250,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href={`/decision/decision-definitions/details?id=${row.id}`}>
          {row[col.slotKey]}
        </ALink>
      </>
    ),
    slotKey: "name",
    title: "Name",
    sortable: true,
    width: 250,
  },

  {
    slotKey: "versions",
    title: "Versions",
    width: 250,
    sortable: true,
  },
  {
    slotKey: "tenant_id",
    title: "Tenant ID",
    sortable: true,
    width: 414,
  },
];
export const decisionsDefinitionDraftColumnData = [
  {
    slotKey: "id",
    isVisible: false,
    title: "Id",
    width: 200,
  },
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
    title: "State",
    width: 200,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href={`/decision/decision-definitions/details?id=${row.id}`}>
          {row[col.slotKey]}
        </ALink>
      </>
    ),
    slotKey: "name",
    title: "Name",
    sortable: true,
    width: 200,
  },

  {
    slotKey: "versions",
    title: "Versions",
    width: 200,
    sortable: true,
  },
  {
    slotKey: "tenant_id",
    title: "Tenant ID",
    sortable: true,
    width: 200,
  },
  {
    render: (row: any, col: any) => (
      <ActionIconwrapper>
        <DefinitionActionColIcon name="pencil" />
        <ALink href={`/process/decision-definitionsn/${row.id}`}>
          {row[col.slotKey]}
          <span className="iconTxt"> Edit</span>
        </ALink>
        <DefinitionActionColIcon name="file-copy" />
        <ALink href={`/process/decision-definitionsn/${row.id}`}>
          {row[col.slotKey]}
          <span className="iconTxt"> Clone </span>
        </ALink>
      </ActionIconwrapper>
    ),
    slotKey: "action",
    title: "Action",
    sortable: false,
    width: 227,
  },
];
export const decisionsDefinitionTabItemsConfig = [
  {
    active: true,
    id: "Deployed",
    title: "Deployed",
  },
  {
    active: false,
    id: "Draft",
    title: "Draft",
  },
];
decisionsDefinitionDraftColumnData[0].width = 189;
decisionsDefinitionDraftColumnData[1].width = 314;
decisionsDefinitionDraftColumnData[2].width = 193;
decisionsDefinitionDraftColumnData[3].width = 230;
