import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  const user = await prisma.user.findUnique({
    where: {
      userId: userId!,
    },
  });
  return new Response(JSON.stringify(user));
}
