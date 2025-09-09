import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  initialUsers,
  usersReducer,
  type UsersStoredAction,
} from "./modules/users/users.slice";
import { countersReducer } from "./modules/counters/counters.slice";

const reducer = combineReducers({
  users: usersReducer,
  counters: countersReducer,
});

export const store = configureStore({
  reducer: reducer,
});

store.dispatch({
  type: "usersStored",
  payload: { users: initialUsers },
} satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const UseAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();

// добавляем createSelector из reselect
export const createAppSelector = createSelector.withTypes<AppState>();

