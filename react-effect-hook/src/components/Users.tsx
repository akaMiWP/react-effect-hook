import { AxiosError, CanceledError } from "../services/api-client";
import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

const Users = () => {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const addUser = () => {
    const originalUsers = [...users];
    const newUser: User = { id: 11, name: "Michael" };
    setUsers([newUser, ...users]);

    userService.add<User>(newUser).catch((err) => {
      setError(err);
      setUsers(originalUsers);
    });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id == user.id ? updatedUser : u)));

    userService.update(user.id, updatedUser).catch((err) => {
      setError(err);
      setUsers(originalUsers);
    });
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id != user.id));
    userService.delete(user.id).catch((err) => {
      setError(err);
      setUsers(originalUsers);
    });
  };

  return (
    <div className="mb-3">
      {error && <p className="text-danger">{error.message}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((value) => (
          <li
            key={value.id}
            className="list-group-item d-flex justify-content-between"
          >
            {value.name}
            <div>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => updateUser(value)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(value)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
