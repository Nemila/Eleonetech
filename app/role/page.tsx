import RoleSelection from "@/components/role-selection";

const page = () => {
  return (
    <main className="px-4 py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-lg text-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Selection de role
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              Ceci est la page de selection de role. Utilisez le formulaire ci
              dessous pour selectionnez votre role et utiliser
              l&apos;application.
            </p>
          </div>

          <RoleSelection />
        </div>
      </div>
    </main>
  );
};

export default page;
