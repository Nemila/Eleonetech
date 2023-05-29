"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chat, Message } from "@prisma/client";
import { Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import MessageBubble from "../message-bubble";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const formSchema = z.object({
  text: z.string(),
});

const Page = ({ params }: Props) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [messages, setMessages] = useState<Message[]>();
  const [chat, setChat] = useState<Chat>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getChat = async () => {
      const res = await fetch(`/api/chats/${params.id}`);
      setChat(await res.json());
    };
    getChat();
  }, [params.id]);

  useEffect(() => {
    const getMsg = async () => {
      const res = await fetch(`/api/chats/${params.id}/messages`);
      setMessages(await res.json());
    };
    getMsg();
  }, [params.id]);

  const memberInfo = useMemo(() => {
    if (!chat) return;

    if (userId === chat.creatorId)
      return {
        current: chat.creatorEmail,
        other: chat.participantEmail,
      };

    if (userId === chat.participantId)
      return {
        current: chat.participantEmail,
        other: chat.creatorEmail,
      };
  }, [userId, chat]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(chat);
    if (!memberInfo) return;
    const response = await fetch(`/api/chats/${params.id}/messages`, {
      method: "POST",
      body: JSON.stringify({
        ...values,
        fromEmail: memberInfo.current,
        toEmail: memberInfo.other,
      }),
    });

    if (!response.ok) {
      return console.log("Something went wrong!");
    }

    return router.refresh();
  };

  return (
    <section className="flex w-full flex-col p-4">
      <div className="flex flex-grow flex-col gap-2">
        {messages?.map((item) => (
          <MessageBubble key={item.id} message={item} />
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-4 p-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl>
                  <Input
                    placeholder="Entrez votre message"
                    className="flex-1"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Envoyer
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Page;
