'use server';

import { headers, cookies } from "next/headers";

interface MainActionProps {
    title: string;
    content: string;
}

export default async function mainAction({ title, content }: MainActionProps) {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    if (!username) {
        throw new Error("User not authenticated");
    }

    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const real = headersList.get("x-real-ip");
    const ip = forwarded || real || "Unknown IP";

    const response = await fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            title,
            content,
            ip,
        }),
    });

    if(!response.ok){
        throw response;
    }

    const data = await response.json();
    return data;
}
