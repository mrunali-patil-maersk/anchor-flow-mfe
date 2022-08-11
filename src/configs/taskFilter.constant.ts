export interface SortByItemType {
  key: string;
  value: string;
}

export const filters: SortByItemType[] = [
  {
    key: "created",
    value: "Created",
  },
  {
    key: "priority",
    value: "Priority",
  },
  {
    key: "dueDate",
    value: "Due Date",
  },
  {
    key: "followUpDate",
    value: "Follow-up Date",
  },
  {
    key: "nameCaseInsensitive",
    value: "Task name",
  },
  {
    key: "assignee",
    value: "Assignee",
  },
];

export const defaultFilter: SortByItemType = {
  key: "created",
  value: "Created",
};
