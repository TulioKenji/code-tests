import SignupPageComponent from "@/components/pages/signup";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {

  return (
    <main className="flex h-dvh items-center justify-center">
      <SignupPageComponent />
    </main>
  );
}
