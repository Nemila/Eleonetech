import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";

const contextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) {
  try {
    const { params } = contextSchema.parse(context);

    const { userId } = getAuth(req);
    if (!userId) return;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user || user.role !== "PLANER") return;

    const of = await prisma.of.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(of));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) {
  try {
    const json = await req.json();

    const { params } = contextSchema.parse(context);

    const { userId } = getAuth(req);
    if (!userId) return;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user || user.role !== "PLANER") return;

    const of = await prisma.of.update({
      where: { id: params.id },
      data: {
        ...json,
      },
    });

    return new Response(JSON.stringify(of));
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
