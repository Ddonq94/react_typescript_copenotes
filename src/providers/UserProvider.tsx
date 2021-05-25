import React, { useState } from "react";
import { UserContext } from "../context/UserContext";

export interface UserProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProps) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
