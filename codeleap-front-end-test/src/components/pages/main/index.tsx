'use client';

const deleteIcon = "/ic_baseline-delete-forever.svg";
const editIcon = "/bx_bx-edit.svg";

import CardSubmit from "@/components/common/Card/Submit";

import mainAction from "./action";

import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from 'date-fns';

import { useState } from "react";
import ButtonRoot from "@/components/common/Button/Root";

interface MainPageComponentProps {
    username: string;
}

export default function MainPageComponent({ username}: MainPageComponentProps) {

    const [posts, setPosts] = useState<Post[]>([]);


    const mutation = useMutation({
        mutationFn: mainAction,
        onSuccess: (data) => {
            setPosts((prev) => [data, ...prev]);
        },
        onError: (error) => console.error(error)
    });

    function handleSubmit(title: string, content: string) {
        mutation.mutateAsync({ title, content });
    }

    return (
        <main className="flex flex-col items-center justify-center p-6 gap-6">
            <CardSubmit
                title="What’s on your mind?"
                actionButtonProps={{
                    text: "Create",
                    className: "bg-primary text-white"
                }}
                isSubmitting={mutation.isPending}
                onSubmit={handleSubmit}
            />
            {posts.map((post) => (
                <div key={post.id} className="w-full h-full flex flex-col border rounded-lg border-card-border">
                    <div className="h-17.5 bg-primary rounded-t-lg flex items-center justify-between px-6">
                        <h1 className="text-white">{post.title}</h1>
                        {post.username === username && (
                            <div className="flex items-center gap-[23.8px]">
                                <ButtonRoot className="border-none">
                                    <img src={deleteIcon} alt="Delete" />
                                </ButtonRoot>
                                <ButtonRoot className="border-none">
                                    <img src={editIcon} alt="Edit" />
                                </ButtonRoot>
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <p className="text-text-secondary font-bold">@{post.username}</p>
                            <p className="text-text-secondary">{formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}</p>
                        </div>
                        <p className="whitespace-pre-line">{post.content}</p>
                    </div>
                </div>
            ))}
        </main>
    );
}