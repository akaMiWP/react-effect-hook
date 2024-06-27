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

  return (
    <div className="mb-3">
      {error && <p className="text-danger">{error.message}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((value) => (
          <li key={value.id}>{value.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
