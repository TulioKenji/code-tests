'use server';
import { cookies } from "next/headers";

interface SignupActionProps {
    username: string;
}

export default async function signupAction({ username }: SignupActionProps) {
    const cookieStore = await cookies();
    cookieStore.set("username", username, {path: "/"});
}