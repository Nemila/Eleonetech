import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET() {
  const users = await clerkClient.users.getUserList();
  return new Response(JSON.stringify(users));
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const json = await req.json();
  const user = await prisma.user.create({
    data: {
      userId: userId!,
      role: json.role,
    },
  });
  return new Response(JSON.stringify(user));
}
