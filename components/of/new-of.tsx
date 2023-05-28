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
  article: z.string(),
  quantity: z.string(),
  composant: z.string(),
  planedAt: z.date(),
  priority: z.string(),
  planedFor: z.date(),
  comment: z.string(),
  target: z.enum(["UAP4", "UAP3", "UAP2", "CMS", "MAGASIN"]),
});

const NewOf = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await fetch("/api/ofs", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        quantity: Number(values.quantity),
        priority: Number(values.priority),
        composant: Number(values.composant),
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
        className="flex w-full max-w-xl flex-col gap-4 rounded-md border p-4 md:grid md:grid-cols-2"
      >
        {/* Article */}
        <FormField
          control={form.control}
          name="article"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Article</FormLabel>
              <FormControl>
                <Input placeholder="Ex: PSF78647683" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Composant */}
        <FormField
          control={form.control}
          name="composant"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nombre composant par OF</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Type here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PlannedAt */}
        <FormField
          control={form.control}
          name="planedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de mise en place</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priorite */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Priorite</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Type here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PlannedFor */}
        <FormField
          control={form.control}
          name="planedFor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de fin souhaite</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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

        {/* Target */}
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Envoye a</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a target" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UAP4">UAP4</SelectItem>
                  <SelectItem value="UAP3">UAP3</SelectItem>
                  <SelectItem value="UAP2">UAP2</SelectItem>
                  <SelectItem value="CMS">CMS</SelectItem>
                  <SelectItem value="MAGASIN">MAGASIN</SelectItem>
                </SelectContent>
              </Select>
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

export default NewOf;
