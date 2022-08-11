import ALink from "@/components/common/aLink";
import CopyButton from "@/components/common/copyButton";
import { Typography, Box, Tooltip } from "@anchor/react-components";

export const formListRowData = [
  {
    id: "Form_dlsdk123",
    name: "Invoice Form",
    version: "1",
    description: "Invoice form descriptions",
  },
  {
    id: "Form_dlsdk124",
    name: "Sample Form",
    version: "1",
    description: "Invoice form descriptions",
  },
  {
    id: "Form_clsdk125",
    name: "Salary Form",
    version: "1",
    description: "Invoice form descriptions",
  },
  {
    id: "Form_dlsdk126",
    name: "Feedback Form",
    version: "1",
    description: "Invoice form descriptions",
  },
];

export const formListPrimaryKey: string = "id";

export const FormListColumnData = [
  {
    slotKey: "id",
    sortable: true,
    title: "Id",
    width: 200,
    render: (row: any, col: any) => (
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Tooltip content={row[col.slotKey]}>
          <Typography fontStyle="normal" variant="body2">
            {row[col.slotKey]}
          </Typography>
        </Tooltip>
        <Box display="flex" ml={4} id="copy-btn">
          <Tooltip content="Copy form id">
            <CopyButton content={row[col.slotKey]} />
          </Tooltip>
        </Box>
      </Box>
    ),
  },
  {
    render: (row: any, col: any) => (
      <ALink
        href={`/forms/details?attachmentId=${row.id}&name=${row.name}&version=${row.version}&description=${row.description}`}
      >
        {row[col.slotKey]}
      </ALink>
    ),
    slotKey: "name",
    title: "Name",
    sortable: true,
    width: 224,
  },
  {
    slotKey: "version",
    title: "Version",
    sortable: true,
    width: 160,
  },
  {
    slotKey: "description",
    title: "Description",
    sortable: true,
    width: 300,
  },
  {
    slotKey: "createdBy",
    title: "Created by",
    sortable: true,
    width: 224,
  },
  {
    slotKey: "createdDate",
    title: "Created date",
    sortable: true,
    width: 224,
  },
  {
    slotKey: "lastModifiedBy",
    title: "Last modified by",
    sortable: true,
    width: 224,
  },
  {
    slotKey: "lastModifiedDate",
    title: "Last modified date",
    sortable: true,
    width: 224,
  },
];
