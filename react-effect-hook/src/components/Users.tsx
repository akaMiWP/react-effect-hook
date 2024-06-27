import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<AxiosError>(null);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/usefdfdrs")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="mb-3">
      {error && <p className="text-danger">{error.message}</p>}
      <ul>
        {users.map((value) => (
          <li key={value.id}>{value.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;