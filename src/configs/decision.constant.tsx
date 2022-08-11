import React from "react";
import ALink from "@/components/common/aLink";

export const DefinitionDefinitionRowPrimaryKey: string = "id";

export const DefinitionDefinitionColumnData = [
  {
    render: (row: any, col: any) => <ALink href="#"> {row[col.slotKey]} </ALink>,
    slotKey: "id",
    title: "Id",
    sortable: false,
    width: 300,
  },
  {
    slotKey: "evaluation_time",
    sortable: true,
    title: "Evaluation time",
    width: 200,
  },
  {
    render: (row: any, col: any) => <ALink href="#"> {row[col.slotKey]} </ALink>,
    slotKey: "calling_process",
    sortable: false,
    title: "Calling process/Case",
    width: 200,
  },
  {
    render: (row: any, col: any) => <ALink href="#"> {row[col.slotKey]} </ALink>,
    slotKey: "calling_instance_id",
    title: "Calling Instance ID",
    sortable: false,
    width: 300,
  },
  {
    slotKey: "activity_id",
    title: "Activity ID",
    sortable: false,
    width: 100,
    isVisible: true,
  },
];

export const leftPanelData = [
  {
    label: "Definition version",
    value: 2,
  },
  {
    label: "Version tag",
    value: 2,
  },
  {
    label: "Definition Id",
    value: "NextStageOutCome:12:a7225f3d-4dc0-11ec-8",
  },
  {
    label: "Definition key",
    value: "NextStageOutCome",
  },
  {
    label: "Definition name",
    value: "NextStageOutComeResult",
  },
  {
    label: "History time to live",
    value: null,
  },
  {
    label: "Tenant ID",
    value: null,
  },
  {
    label: "Deploymenty ID",
    value: null,
  },
  {
    label: "Decision Requirements Definition",
    value: null,
  },
];

//End: Decision Definition - Left panel
