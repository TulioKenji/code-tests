import SignupPageComponent from "@/components/pages/signup";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main className="flex h-dvh items-center justify-center">
      <SignupPageComponent />
    </main>
  );
}
