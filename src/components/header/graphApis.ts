import { uniqBy } from "lodash";

// APIs
import {
  appGroupsByObjectIdApiUrl,
  appRolesByAppIdApiUrl,
  groupsMembersByIdGraphApiUrl,
} from "@/configs/apis/apiEndPoints";
import { callApi } from "@/configs/apis/axiosAPI";

//Type
import { RoleType } from "src/redux/feature/userSlice";

export const getAppRolesByAppId = async (appId: string) => {
  try {
    const appRoleURL = appRolesByAppIdApiUrl(appId);
    const options = await buildAPIConfig("get");
    const { value } = await callApi(appRoleURL, options);
    return value[0]?.appRoles?.map(({ value, id, displayName, description }) => ({
      value,
      id,
      displayName,
      description,
    })) as RoleType[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAppGroupsDetails = async () => {
  try {
    const appGroupsURL = appGroupsByObjectIdApiUrl;
    const options = await buildAPIConfig("get");
    const { value } = await callApi(appGroupsURL, options);
    return (
      value as Array<{
        id: string;
        appRoleId: string;
        principalType: string;
        principalId: string;
        principalDisplayName: string;
      }>
    )
      ?.filter((val) => val.principalType === "Group")
      .map(({ principalId, principalDisplayName, appRoleId }) => ({
        id: principalId,
        displayName: principalDisplayName,
        roleId: appRoleId,
      }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getGroupsAndRolesAssignedToUser = async (session: any) => {
  if (!session) {
    throw Error("No active session! Verify a user has been signed in.");
  }
  try {
    const idTokenClaims = session?.apiTokenDetails?.idTokenClaims;
    const appRolesPromise = getAppRolesByAppId(idTokenClaims?.aud);
    const appGroupsPromise = getAppGroupsDetails();
    const [appRoles, appGroups] = await Promise.all([appRolesPromise, appGroupsPromise]);
    const roles = idTokenClaims ? idTokenClaims["roles"] : [];

    let groupsDetails: Array<{
      id: string;
      displayName: string;
      roleId: string;
    }> = [];
    if (roles.includes("anchor-admin")) {
      groupsDetails = appGroups;
    } else {
      // groupsDetails = appGroups.filter((appGroup) =>
      //   idTokenClaims["groups"]?.includes(appGroup?.id)
      // );
    }

    return {
      groups: groupsDetails,
      roles: appRoles
        .filter((appRole) => roles.includes(appRole.value))
        .map(({ value, id, displayName, description }) => ({
          value,
          id,
          displayName,
          description,
        })),
      appRoles,
    };
  } catch (err) {
    console.error("Failed to fetch group data", err);
    return {};
  }
};

export const buildAPIConfig = async (method: string, body?: object) => {
  try {
    return {
      method,
      ...(body ? { data: JSON.stringify(body) } : {}),
    };
  } catch (err) {
    console.error("Failed to build API config", err);
  }
};

export const getMemberByGroupId = async (groupId: string) => {
  try {
    const options = await buildAPIConfig("get");
    const url = groupsMembersByIdGraphApiUrl(groupId);
    const { value } = await callApi(url, {
      ...options,
      params: {
        $select: "givenName,surname,id,mail,displayName",
      },
    });

    return value?.map(({ id, displayName, mail }) => ({
      id: id,
      name: displayName,
      email: mail,
    }));
  } catch (e) {
    console.error("No Member found", e);
    throw Error("No Member found");
  }
};

export const getAllMembers = async (session: any) => {
  try {
    const { groups } = await getGroupsAndRolesAssignedToUser(session);
    if (groups) {
      const members = await Promise.all(
        groups?.map(async ({ id }) => await getMemberByGroupId(id))
      );
      const flatArr = members?.flat();
      return uniqBy(flatArr, "email");
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch group data", err);
    return [];
  }
};
