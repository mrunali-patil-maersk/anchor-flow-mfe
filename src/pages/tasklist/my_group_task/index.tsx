import { useMemo } from "react";
import Tasks from "@/components/tasklist/tasks";
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";

const MyGroupTasks = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const { email, groups } = useAppSelector(selectUser);
  const groupIds = useMemo(
    () => (email ? groups?.map((group) => group.id).join(",") : undefined),
    [groups, email]
  );
  return (
    email && (
      <Tasks
        sidebarIsExpanded={sidebarIsExpanded}
        routePathKey="my_group_task"
        pageName="My group task"
        groupId={groupIds}
      />
    )
  );
};

MyGroupTasks.requireAuth = true;
export default MyGroupTasks;
