import { useEffect } from "react";
import { getAllMembers, getGroupsAndRolesAssignedToUser } from "@/components/header/graphApis";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import {
  updateUser,
  updateGroupsAssignedToUser,
  updateUserRoles,
  updateAppRoles,
} from "src/redux/feature/userSlice";
import { selectUser } from "src/redux/selectors/userSelector";
import {
  setGroupsMemberLoading,
  updateGroupsMember,
} from "src/redux/feature/allGroupsMembersSlice";

export default function UpdateState({ session }) {
  const { groups, roles } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const accountDetails: {
    name: string;
    userAvatar: string | null;
    email: string;
  } = {
    name: session?.user?.name || "",
    userAvatar: session?.user?.image || null,
    email: session?.user?.email || "",
  };
  dispatch(updateUser(accountDetails));
  useEffect(() => {
    if (groups.length > 0) {
      dispatch(setGroupsMemberLoading(true));
      getAllMembers(session)
        .then((members) => {
          dispatch(updateGroupsMember(members));
        })
        .catch(() => {
          dispatch(updateGroupsMember([]));
        });
    }
  }, [groups]);

  const fetchGroupAssignedToSignInUser = async () => {
    try {
      const { groups, roles, appRoles } = await getGroupsAndRolesAssignedToUser(session);
      if (roles) dispatch(updateUserRoles(roles));
      if (appRoles) dispatch(updateAppRoles(appRoles));
      if (groups) dispatch(updateGroupsAssignedToUser(groups));
    } catch (err) {
      console.error(err);
    }
  };
  // call only 1
  useEffect(() => {
    fetchGroupAssignedToSignInUser();
  }, []);
  return <></>;
}
