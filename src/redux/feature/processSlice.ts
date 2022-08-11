import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface
export interface ProcessDefinitionDataType {
  version: number | null;
  id: string;
  key: string;
  name: string;
  historyTimeToLive: string;
  tenantId: string | null;
  deploymentId: string;
}

interface ProcessState {
  processDefinitionData: ProcessDefinitionDataType;
}

interface UpdateUserActionType {
  name: string;
  userAvatar: string | null;
  email: string;
}

// state
const initialState = {
  processDefinitionData: {},
} as ProcessState;

const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    updateProcessDefinitionData: (state, action) => {
      state.processDefinitionData = action.payload;
    },
  },
});

// Actions
export const { updateProcessDefinitionData } = processSlice.actions;

// Reducers
export default processSlice;
