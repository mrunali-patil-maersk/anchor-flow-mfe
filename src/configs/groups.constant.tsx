import ALink from "@/components/common/aLink";

export const groupPrimaryKey: string = "id";
export const groupColumnData = [
  {
    slotKey: "id",
    sortable: true,
    title: "Id",
    width: 360,
  },
  {
    render: (row: any, col: any) => (
      <>
        <ALink href={`/groups/${row["id"]}/members`}>{row[col.slotKey]}</ALink>
      </>
    ),
    slotKey: "displayName",
    title: "Name",
    sortable: true,
    width: 360,
  },
  {
    slotKey: "roleId",
    sortable: true,
    title: "Role Id",
    width: 360,
  },
  {
    slotKey: "roleDisplayName",
    sortable: true,
    title: "Role Name",
    width: 240,
  },
  {
    slotKey: "roleValue",
    sortable: true,
    title: "Role Value",
    width: 160,
  },
];
