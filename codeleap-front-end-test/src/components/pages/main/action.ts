'use server';

import { setTimeout } from 'timers/promises';

import { headers, cookies } from "next/headers";

import { Post, postSchema } from "@/schemas/post";


interface MainActionProps {
    title: string;
    content: string;
}

export async function submitPostAction({ title, content }: MainActionProps) {
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

    const rawData = await response.json();
    const data = postSchema.parse(rawData);

    return data;
}

export async function deletePostAction(id: number) {

    const data = await Promise.resolve(setTimeout(500)).then(() => id);
    return data;
}

export async function editPostAction(post: Post) {

    const data = await Promise.resolve(setTimeout(500)).then(() => post);
    return data;
}
