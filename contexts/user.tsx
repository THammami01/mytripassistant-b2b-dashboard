"use client";

import React from "react";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: {
    name: string;
    address: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    website: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = React.useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
