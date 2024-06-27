import axios, { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<AxiosError>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const addUser = () => {
    const originalUsers = [...users];
    const newUser: User = { id: 11, name: "Michael" };
    setUsers([newUser, ...users]);

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .catch((err) => {
        setError(err);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id == user.id ? updatedUser : u)));

    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err);
        setUsers(originalUsers);
      });
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id != user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
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
