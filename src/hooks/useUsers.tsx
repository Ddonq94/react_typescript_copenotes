import { useEffect, useState } from "react";
import GlobalServices from "../services/GlobalServices";
import { IUser } from "../types/types";

export default function useUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<IUser[]>();

  const load = async () => {
    setLoading(true);

    try {
      const res = await GlobalServices.getUsers();
      console.log(res);
      setUsers(res.users);
      setLoading(false);
      setError(null);
    } catch (e: any) {
      setLoading(false);
      setError(e);
    }

    setLoading(false);
  };

  const refresh = () => {
    load();
  };

  useEffect(() => {
    refresh();
  }, []);

  return { users, refresh, loading, error };
}
