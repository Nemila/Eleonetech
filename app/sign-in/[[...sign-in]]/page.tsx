import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="py-4">
      <SignIn />
    </main>
  );
}
