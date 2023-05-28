"use client";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useRole = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/users");

      if (!response.ok) {
        setIsLoading(false);
        return console.log("Something went wrong!");
      }

      setIsLoading(false);
      setUser(await response.json());
    };

    getUser();
  }, []);

  return { user, isLoading };
};
