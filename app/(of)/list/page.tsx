import prisma from "@/lib/prisma";
import { columns as plannerCol } from "./planner-columns";
import { columns as actionCol } from "./action-columns";
import { DataTable } from "@/components/data-table";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { columns } from "./columns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getOfs(user: User | undefined) {
  if (!user || user.role === "NONE") return redirect("/role");

  if (user.role === "PLANER") return await prisma.of.findMany();

  return await prisma.of.findMany({
    where: {
      target: user.role,
    },
  });
}

const getActions = async (user: User | undefined) => {
  if (!user || user.role === "NONE") return redirect("/role");

  if (user.role === "PLANER") return await prisma.action.findMany();

  return await prisma.action.findMany({
    where: {
      userId: user.userId,
    },
  });
};

const getUser = async () => {
  const { userId } = auth();
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!user) return redirect("/role");
  return user;
};

export default async function Home() {
  const user = await getUser();
  const data = await getOfs(user);
  const actions = await getActions(user);

  return (
    <main className="p-4">
      <div className="container">
        <Tabs defaultValue="of" className="flex flex-col gap-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="of">Liste des OF</TabsTrigger>
            <TabsTrigger value="actions">Liste des Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="of">
            {user?.role === "PLANER" && data && (
              <DataTable data={data} columns={plannerCol} />
            )}
            {user?.role !== "PLANER" && data && (
              <DataTable data={data} columns={columns} />
            )}
          </TabsContent>
          <TabsContent value="actions">
            {actions && <DataTable data={actions} columns={actionCol} />}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
