import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface

export interface RoleType {
  displayName: string;
  id: string;
  value: string;
  description: string;
}
export interface GroupsAssignedToUserType {
  id: string;
  displayName: string;
  roleId?: string;
}

interface UserState {
  name: string;
  userAvatar: string | null;
  email: string;
  groups: GroupsAssignedToUserType[];
  roles: RoleType[];
  appRoles: RoleType[];
}

interface UpdateUserActionType {
  name: string;
  userAvatar: string | null;
  email: string;
}

// state
const initialState = {
  name: "",
  email: "",
  userAvatar: null,
  groups: [],
  roles: [],
  appRoles: [],
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UpdateUserActionType>) => {
      (state.name = action.payload.name),
        (state.userAvatar = action.payload.userAvatar),
        (state.email = action.payload.email);
    },
    updateGroupsAssignedToUser: (state, action: PayloadAction<Array<GroupsAssignedToUserType>>) => {
      state.groups = action.payload;
    },
    updateUserRoles: (state, action: PayloadAction<RoleType[]>) => {
      state.roles = action.payload;
    },
    updateAppRoles: (state, action: PayloadAction<RoleType[]>) => {
      state.appRoles = action.payload;
    },
  },
});

// Actions
export const { updateUser, updateGroupsAssignedToUser, updateUserRoles, updateAppRoles } =
  userSlice.actions;

// Reducers
export default userSlice;
