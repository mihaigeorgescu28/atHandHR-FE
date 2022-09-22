import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../utils/types";

type AuthContextProps = {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  const login = async (u: User) => {

  let result = await fetch("https://virtserver.swaggerhub.com/MIHAIGEORGESCU28/SignIn/1.0.0/signIn",
  {
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept":'application/json'
    },
    body:JSON.stringify(u)
  })
  result = await result.json();
  localStorage.setItem("user-info", JSON.stringify(u))

    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
