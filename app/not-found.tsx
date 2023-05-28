import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="py-16">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Erreur 404
          </h1>

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Cette page n&apos;existe pas
          </h3>

          <Link
            href="/"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Retournez a la page d&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
