import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Bienvenu Sur Eleotech
            <span className="sm:block">Increase Conversion.</span>
          </h1>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className={buttonVariants({ variant: "default", size: "lg" })}
              href="/list"
            >
              Commencez-ici !
            </Link>

            <Link
              className={buttonVariants({ variant: "ghost", size: "lg" })}
              href="/about"
            >
              Comment ca marche ?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
