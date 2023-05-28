"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const formSchema = z.object({
  quantity: z.string(),
  comment: z.string(),
});

const NewAction = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await fetch("/api/actions", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        id,
        quantity: Number(values.quantity),
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      return console.log("Something went wrong!");
    }

    setIsLoading(false);
    router.refresh();
    router.push("/list");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col gap-4"
      >
        {/* Quantite */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Quantite</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Type here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Commentaire</FormLabel>
              <FormControl>
                <Input placeholder="Type here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lancer
        </Button>
      </form>
    </Form>
  );
};

export default NewAction;
