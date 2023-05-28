import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useRole = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/users", {
        next: {
          revalidate: 10,
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        return console.log("Something went wrong!");
      }

      setIsLoading(false);
      setUser(await response.json());
      router.refresh();
    };

    getUser();
  }, [router]);

  return { user, isLoading };
};
