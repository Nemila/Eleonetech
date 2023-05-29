import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

const contextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function GET(
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) {
  const { params } = contextSchema.parse(context);

  if (!params.id) return;

  let messages = await prisma.message.findMany({
    where: {
      chatId: params.id,
    },
  });

  return new Response(JSON.stringify(messages));
}

export async function POST(
  req: NextRequest,
  context: z.infer<typeof contextSchema>
) {
  const { params } = contextSchema.parse(context);
  const json = await req.json();

  if (!params.id) return;

  let messages = await prisma.message.create({
    data: {
      ...json,
      chat: { connect: { id: params.id } },
    },
  });

  return new Response(JSON.stringify(messages));
}
