import { ReactNode } from "react";

import {
  TaskListContainer,
  TaskListDetailsContainer,
  TaskListHeadContainer,
  TaskMainCard,
} from "@styles/pages/tasks.style";

const TaskListLayout = ({
  headerComp,
  taskListComp,
  children,
}: {
  headerComp: ReactNode;
  taskListComp: ReactNode;
  children: ReactNode;
}) => {
  return (
    <TaskMainCard>
      <TaskListHeadContainer>{headerComp}</TaskListHeadContainer>
      <TaskListContainer>{taskListComp}</TaskListContainer>
      <TaskListDetailsContainer>{children}</TaskListDetailsContainer>
    </TaskMainCard>
  );
};

export default TaskListLayout;
