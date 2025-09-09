import { useState } from "react";
import {
  createAppSelector,
  UseAppDispatch,
  useAppSelector,
  type AppState,
  type User,
  type UserRemoveSelectedAction,
  type UserSelectedAction,
} from "./store";

const selectSortedUsers = createAppSelector(
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

const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId
    ? state.users.entities[state.users.selectedUserId]
    : undefined;
export function UserList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const selectedUser = useAppSelector(selectSelectedUser);

  const sortedUsers = useAppSelector((state) =>
    selectSortedUsers(state, sortType)
  );

  return (
    <div className="flex flex-col items-center">
      {!selectedUser ? (
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setSortType("asc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Asc
            </button>
            <button
              onClick={() => setSortType("desc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Desc
            </button>
          </div>
          <ul className="list-none">
            {sortedUsers.map((user) => (
              <UserListItem user={user} key={user.id} />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser user={selectedUser} />
      )}
    </div>
  );
}

function UserListItem({ user }: { user: User }) {
  const dispatch = UseAppDispatch();
  const handleUserClick = () => {
    dispatch({
      type: "userSelected",
      payload: {
        userId: user.id,
      },
    } satisfies UserSelectedAction);
  };
  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
}

function SelectedUser({ user }: { user: User }) {
  const dispatch = UseAppDispatch();
  const handleBackButtonClick = () => {
    dispatch({
      type: "userRemoveSelected",
    } satisfies UserRemoveSelectedAction);
  };
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
