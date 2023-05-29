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
  console.log(params.id);

  if (!params.id) return;

  let chat = await prisma.chat.findUnique({
    where: {
      id: params.id,
    },
  });

  return new Response(JSON.stringify(chat));
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const json = await req.json();

  let message = await prisma.message.create({
    data: {
      ...json,
      chat: {
        connect: { id },
      },
    },
  });

  return new Response(JSON.stringify(message));
}
