"use client";

import { Input } from "@/components/ui/input";
import { Chat } from "@prisma/client";
import { useEffect, useState } from "react";
import ChatCard from "./chat-card";

import { User } from "@clerk/nextjs/dist/types/server";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserCard from "./user-card";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ChatPanel = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      setUsers(await res.json());
    };
    getUsers();
  }, []);

  const handleNewChat = async (user: User) => {
    if (!users) return;

    const creator = users.find((item) => item.id === userId);
    const participant = user;

    if (!creator) return;

    const data = {
      creatorId: creator.id,
      creatorImageUrl: creator.profileImageUrl,
      creatorEmail: creator.emailAddresses[0].emailAddress,
      participantId: participant.id,
      participantEmail: participant.emailAddresses[0].emailAddress,
      participantImageUrl: participant.profileImageUrl,
    };

    const res = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return console.log("Something is wrong!");
    }

    console.log("Everything is fine!");
    return router.refresh();
  };

  useEffect(() => {
    const getChats = async () => {
      const res = await fetch("/api/chats", {
        next: {
          revalidate: 10,
        },
      });
      setChats(await res.json());
    };
    getChats();
  }, []);

  return (
    <aside className="max-h-screen min-w-[400px] flex-shrink-0 space-y-4 overflow-y-auto border-r p-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Utilisateurs
      </h4>

      <div className="flex w-full flex-col gap-2">
        <Input placeholder="Trouver un chat" />

        <Dialog>
          <DialogTrigger asChild>
            <Button>Nouvelle Discussion</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Discussion</DialogTitle>
              <DialogDescription>
                Choisissez l&apos;uilisateur avec lequel vous voulez commencer
                une nouvelle discussion.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {users?.map((item) => (
                <UserCard
                  key={item.id}
                  user={item}
                  handleNewChat={handleNewChat}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-2">
        {chats?.map((item) => (
          <ChatCard key={item.id} chat={item} />
        ))}
      </div>
    </aside>
  );
};

export default ChatPanel;
