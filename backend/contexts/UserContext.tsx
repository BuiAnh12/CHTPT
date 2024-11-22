import { Props } from "next/script";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context state
type UserContextType = {
  user: any; // Define a more specific type for `user` if needed
  setUser: React.Dispatch<React.SetStateAction<any>>; // Define a type for `setUser` if needed
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any | null>(null); // Replace `any` with a specific type if needed

  // Load data from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever `user` changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if no user
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
