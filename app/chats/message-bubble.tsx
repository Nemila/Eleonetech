import { Message } from "@prisma/client";

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className="space-y-2 rounded-md border bg-primary p-4 text-primary-foreground">
      <p className="text-sm text-muted-foreground">{message.fromEmail}</p>
      <p>{message.text}</p>
    </div>
  );
};

export default MessageBubble;
