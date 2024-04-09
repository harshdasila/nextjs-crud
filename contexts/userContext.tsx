"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user?: any;
  setUser: (user: any) => void;
}
type UserProfileProviderProps = {
  children: ReactNode;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProfileProviderProps) => {
  const [user, setUser] = useState<any>({
    id: 0,
    role_id: 0
  });
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
