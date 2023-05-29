"use client";

import type { User } from "@clerk/nextjs/dist/types/server";
import { useEffect, useState } from "react";
import UserContainer from "./user-container";
import ChatPanel from "./(chat-panel)/chat-panel";

type Props = {
  children: any;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-grow">
      <div className="container">
        <div className="flex h-full">
          <ChatPanel />

          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
