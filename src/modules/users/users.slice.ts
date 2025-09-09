
import { createSelector } from "@reduxjs/toolkit";
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

export type UserSelectedAction = {
  type: "userSelected";
  payload: {
    userId: UserId;
  };
};

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
};

export type UsersStoredAction = {
  type: "usersStored";
  payload: {
    users: User[];
  };
};

type Action = UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction;

const initialUserState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersReducer = (
  state = initialUserState,
  action: Action
): UsersState => {
  switch (action.type) {
    case "usersStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce((acc: Record<UserId, User>, user: User) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user: User) => user.id),
      };
    }
    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};

export const selectSortedUsers = createSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sort: "asc" | "desc") => sort,
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
);

export const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId
    ? state.users.entities[state.users.selectedUserId]
    : undefined;

