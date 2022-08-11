import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from "./feature/userSlice";
import allGroupsMembersSlice from "./feature/allGroupsMembersSlice";
import { taskDiagramBpnmApi } from "./services/taskDiagramBpnmApi";
import { tasklistApi } from "./services/tasklistApi";
import processSlice from "./feature/processSlice";
import formApi from "./services/formApi";

export const store = configureStore({
  reducer: {
    //@Note
    // This is where we add reducers.
    [tasklistApi.reducerPath]: tasklistApi.reducer,
    [taskDiagramBpnmApi.reducerPath]: taskDiagramBpnmApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [allGroupsMembersSlice.name]: allGroupsMembersSlice.reducer,
    [processSlice.name]: processSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tasklistApi.middleware,
      taskDiagramBpnmApi.middleware,
      formApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
