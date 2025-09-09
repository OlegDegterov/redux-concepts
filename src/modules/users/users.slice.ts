import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AppState } from "../../store";

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const initialUsers: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for user ${index + 11}`,
  })
);

type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

const initialUserState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId
    ? state.users.entities[state.users.selectedUserId]
    : undefined;

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  selectors: {
    selectSorted: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: "asc" | "desc") => sort,
      (ids, entities, sort) =>
        ids
          .map((id) => entities[id])
          .filter((user): user is User => user !== undefined)
          .sort((a, b) => {
            if (sort === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectSelectedUser: (state: UsersState) =>
      state.selectedUserId ? state.entities[state.selectedUserId] : undefined,
  },
  reducers: {
    selected: (state, action: PayloadAction<{ userId: UserId }>) => {
      state.selectedUserId = action.payload.userId;
    },
    selectRemove: (state) => {
      state.selectedUserId = undefined;
    },
    stored: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;

      state.entities = users.reduce((acc: Record<UserId, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user: User) => user.id);
    },
  },
});
