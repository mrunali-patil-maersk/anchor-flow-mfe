import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupsMembersState {
  members: {
    id: string;
    name: string;
    email: string;
  }[];
  isLoading: boolean;
}

const initialState = { members: [], isLoading: true } as GroupsMembersState;

const allGroupsMembersSlice = createSlice({
  name: "groupsmembers",
  initialState,
  reducers: {
    setGroupsMemberLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateGroupsMember: (state, action: PayloadAction<any>) => {
      state.members = action.payload;
      state.isLoading = false;
    },
  },
});

// Actions
export const { updateGroupsMember, setGroupsMemberLoading } = allGroupsMembersSlice.actions;

// Reducers
export default allGroupsMembersSlice;
