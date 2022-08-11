// components
import ListView from "@/components/listView/listView";

// styles
import { ListViewRoute } from "src/styles/components/listView/listView.styles";

// constants
import { userRowData, userPrimaryKey, userColumnData } from "src/configs/users.constant";

const Users = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  return (
    <ListViewRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ListView
        heading="Users"
        subHeading="List of users"
        rowData={userRowData}
        columnData={userColumnData}
        primaryKey={userPrimaryKey}
      />
    </ListViewRoute>
  );
};

Users.requireAuth = true;
export default Users;
