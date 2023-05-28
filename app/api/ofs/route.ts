import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { userId } = getAuth(req);
    if (!userId) return;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user || user.role !== "PLANER") return;

    const of = await prisma.of.create({
      data: {
        ...json,
        userId,
      },
    });

    return new Response(JSON.stringify(of));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
