import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <main className="py-8">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/role"
    />
  </main>
);

export default SignUpPage;
