import NewOf from "@/components/of/new-of";

const page = () => {
  return (
    <main className="px-4 py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-lg text-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Page de lancement
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              Utilisez cette page pour lancer un OF. Une fois lance, toutes les
              personnes concernees recevrons une notfications.
            </p>
          </div>

          <NewOf />
        </div>
      </div>
    </main>
  );
};

export default page;
