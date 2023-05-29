import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@clerk/nextjs";
import { Chat } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const ChatCard = ({ chat }: { chat: Chat }) => {
  const { userId } = useAuth();

  const chatInfo = useMemo(() => {
    if (userId === chat.creatorId)
      return { img: chat.participantImageUrl, name: chat.participantEmail };

    if (userId === chat.participantId)
      return { img: chat.creatorId, name: chat.creatorEmail };
  }, [userId, chat]);

  return (
    <Link
      href={`/chats/${chat.id}`}
      className="flex items-center gap-3 rounded-md border p-3"
    >
      <Avatar>
        <AvatarImage src={chatInfo?.img} />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <p className="text-sm">{chatInfo?.name}</p>
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="ml-auto h-8 w-8 p-0">
              <MessageCircle className="h-4 w-4" fill="white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Envoyer un message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </Link>
  );
};

export default ChatCard;
