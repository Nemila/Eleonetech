import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    const json = await req.json();
    const { role } = json;

    if (!userId) return;

    const user = await prisma.user.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        role,
      },
      update: {},
    });

    return new Response(JSON.stringify(user));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) throw new Error("Not authorized");

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) throw new Error("No user");

    return new Response(JSON.stringify(user));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
