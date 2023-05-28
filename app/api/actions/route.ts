import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { id } = json;

    const { userId } = getAuth(req);
    if (!userId) throw new Error("Not authorized");

    const of = await prisma.of.update({
      where: {
        id,
      },
      data: {
        quantityDone: {
          increment: json.quantity,
        },
      },
    });

    const action = await prisma.action.create({
      data: {
        userId,
        comment: json.comment,
        quantity: json.quantity,
        of: {
          connect: {
            id: of.id,
          },
        },
      },
    });

    return new Response(JSON.stringify(action));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
