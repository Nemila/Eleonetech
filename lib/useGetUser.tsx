"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/users/current", {
        next: {
          revalidate: 10,
        },
      });
      setIsLoading(false);
      setUser(await res.json());
    };

    getUser();
  }, []);

  return { user, isLoading };
};
