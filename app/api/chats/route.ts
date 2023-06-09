import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Not authorized");

  let chats = await prisma.chat.findMany({
    where: {
      OR: [
        {
          creatorId: userId,
        },
        {
          participantId: userId,
        },
      ],
    },
  });

  return new Response(JSON.stringify(chats));
}

export async function POST(req: NextRequest) {
  const json = await req.json();

  let chat = await prisma.chat.findFirst({
    where: {
      OR: [
        {
          creatorId: json.creatorId,
          participantId: json.participantId,
        },
        {
          creatorId: json.participantId,
          participantId: json.creatorId,
        },
      ],
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        ...json,
      },
    });
  }

  return new Response(JSON.stringify(chat));
}
