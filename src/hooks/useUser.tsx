import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

import api from "../config/api";

type UserContextData = {
  createUser: (name: string) => void;
  updateUser: (id: string | string[], name: string) => void;
  deleteUser: (id: string | string[]) => void;

  isLoading: boolean;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;

  handlingError: (name: string) => void;
  errors: {
    helperText: string;
    error: boolean;
  };
};

type UserContextProps = {
  children: React.ReactNode;
};

type ErrorResponse = {
  message: string;
  success: boolean;
};

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    helperText: "",
    error: false,
  });

  const router = useRouter();

  const createUser = async (name: string) => {
    try {
      await api.post("/users", {
        name: name,
      });

      router.push("/");
      setIsLoading(false);
      console.log("Created!");
    } catch (error) {
      setIsLoading(false);

      const errorResponse: ErrorResponse = error.response.data;

      setErrors({
        helperText: errorResponse.message,
        error: !errorResponse.success,
      });
    }
  };

  const updateUser = async (id: string, name: string) => {
    try {
      await api.put(`/users/${id}`, {
        name: name,
      });

      router.push("/");
      setIsLoading(false);
      console.log("Updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);

      console.log("User deleted!");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlingError = (name: string) => {
    if (name.length > 2) {
      setErrors({ helperText: "", error: false });
      setIsLoading(true);
    } else {
      setErrors({ helperText: "Invalid name", error: true });
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        updateUser,
        deleteUser,
        isLoading,
        setIsLoading,
        handlingError,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
}
