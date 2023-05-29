import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/dist/types/server";
import React from "react";

type Props = {
  user: User;
  handleNewChat: (user: User) => void;
};

const UserCard = ({ user, handleNewChat }: Props) => {
  return (
    <Button variant="outline" onClick={() => handleNewChat(user)}>
      {user.emailAddresses[0].emailAddress}
    </Button>
  );
};

export default UserCard;
