import Tasks from "@/components/tasklist/tasks";
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";

const MyTasks = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const { email } = useAppSelector(selectUser);
  return (
    email && (
      <Tasks
        sidebarIsExpanded={sidebarIsExpanded}
        routePathKey="my_task"
        pageName="My task"
        assignee={email}
      />
    )
  );
};

MyTasks.requireAuth = true;
export default MyTasks;
