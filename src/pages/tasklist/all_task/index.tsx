import Tasks from "@/components/tasklist/tasks";

const AllTask = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  return (
    <Tasks sidebarIsExpanded={sidebarIsExpanded} routePathKey="all_task" pageName="All task" />
  );
};

AllTask.requireAuth = true;

export default AllTask;
