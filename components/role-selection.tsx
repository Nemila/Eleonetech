"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRole } from "@/lib/useRole";

export const formSchema = z.object({
  role: z.enum(["PLANER", "UAP4", "UAP3", "UAP2", "CMS", "MAGASIN"]),
});

const RoleSelection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: userIsLoading } = useRole();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setIsLoading(false);
      return console.log("Something went wrong!");
    }

    setIsLoading(false);
    router.refresh();
    return router.push("/");
  };

  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [router, user]);

  if (userIsLoading) return <p>Attendez un instant...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col gap-4 rounded-md border p-4"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Votre role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a target" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PLANER">PLANER</SelectItem>
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
          Selectionner
        </Button>
      </form>
    </Form>
  );
};

export default RoleSelection;
