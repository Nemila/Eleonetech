"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  article: z.string().optional(),
  quantity: z.string().optional(),
  composant: z.string().optional(),
  planedAt: z.date().optional(),
  priority: z.string().optional(),
  planedFor: z.date().optional(),
  comment: z.string().optional(),
  target: z.enum(["UAP4", "UAP3", "UAP2", "CMS", "MAGASIN"]).optional(),
});

const UpdateOf = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response = await fetch(`/api/ofs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...values,
        quantity:
          values.quantity !== undefined ? Number(values.quantity) : undefined,
        composant:
          values.composant !== undefined ? Number(values.composant) : undefined,
        priority:
          values.priority !== undefined ? Number(values.priority) : undefined,
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
        className="flex w-full max-w-xl flex-col gap-4 md:grid md:grid-cols-2"
      >
        {/* Article */}
        <FormField
          control={form.control}
          name="article"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
            <FormItem>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
            <FormItem>
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
            <FormItem>
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
          Modifier
        </Button>
      </form>
    </Form>
  );
};

export default UpdateOf;
