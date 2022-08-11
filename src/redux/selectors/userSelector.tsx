import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Selectors
export const selectUser = (state: RootState) => state.user;

// Groups
export const selectGroups = (state: RootState) => state.user.groups;

// Roles
export const selectAppRoles = (state: RootState) => state.user.appRoles;

// Roles
export const selectRoles = (state: RootState) => state.user.roles;

export const selectGroupsRole = createSelector([selectGroups, selectAppRoles], (groups, roles) => {
  return groups.map((group) => {
    const role = roles.find((role) => role.id === group.roleId);
    return {
      ...group,
      roleDisplayName: role?.displayName,
      roleValue: role?.value,
    };
  });
});
