import prisma from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { AppWindow } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const findUser = async (userId: string | null | undefined) => {
  if (!userId) return;

  return prisma.user.findUnique({
    where: {
      userId,
    },
  });
};

const Navbar = async () => {
  const { userId } = auth();
  const user = await findUser(userId);

  return (
    <section className="border-b">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            <AppWindow className="mr-2 h-4 w-4" />
            Eleonetech
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Accueil
            </Link>

            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              A Propos
            </Link>

            {user && user.role !== "NONE" && (
              <Link
                href="/list"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Liste des OF
              </Link>
            )}

            {user?.role === "PLANER" && (
              <Link
                href="/new"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Lancer un OF
              </Link>
            )}

            {(!user || user.role === "NONE") && (
              <Link
                href="/role"
                className={buttonVariants({
                  variant: "destructive",
                  size: "sm",
                })}
              >
                Choisissez votre role
              </Link>
            )}

            <UserButton />
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
