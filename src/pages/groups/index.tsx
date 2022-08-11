// redux
import { useAppSelector } from "src/redux/hook";
import { selectUser, selectGroupsRole, selectRoles } from "src/redux/selectors/userSelector";

// components
import ListView from "@/components/listView/listView";

// constants
import { groupPrimaryKey, groupColumnData } from "src/configs/groups.constant";
import { GroupsRoute } from "@styles/pages/groups.style";

const Groups = () => {
  const userData = useAppSelector(selectGroupsRole);

  return (
    <GroupsRoute>
      <ListView
        heading="Groups"
        subHeading=""
        rowData={userData}
        columnData={groupColumnData}
        primaryKey={groupPrimaryKey}
        searchBarVisibile={false}
      />
    </GroupsRoute>
  );
};

Groups.requireAuth = true;
export default Groups;
