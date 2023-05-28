"use client";

import { useRole } from "@/lib/useRole";
import { UserButton } from "@clerk/nextjs";
import { AppWindow } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { user } = useRole();

  return (
    <section className="border-b">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
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
