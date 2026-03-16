'use client';

const deleteIcon = "/ic_baseline-delete-forever.svg";
const editIcon = "/bx_bx-edit.svg";

import CardSubmit from "@/components/common/Card/Submit";
import ButtonRoot from "@/components/common/Button/Root";

import { useModal } from "@/components/contexts/modalContext";

import { submitPostAction, editPostAction, deletePostAction } from "./action";
import { useMutation } from "@tanstack/react-query";


import { formatDistanceToNow } from 'date-fns';
import { useState } from "react";

import { Post } from "@/schemas/post";

interface MainPageComponentProps {
    username: string;
    initialPosts: Post[];
}

export default function MainPageComponent({ username, initialPosts }: MainPageComponentProps) {

    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const { setContent, setClose, setOpen } = useModal();

    const errorModal = (message: string) => {
        setContent(
            <div className="w-165 h-36.5 bg-white text-center p-6 rounded-lg border border-card-border flex flex-col justify-between">
                <p className="self-end cursor-pointer font-bold" onClick={setClose}>
                    X
                </p>
                <h1>Error</h1>
                <p>{message}</p>
            </div>
        );
        setOpen();
    };

    const submitMutation = useMutation({
        mutationFn: submitPostAction,
        onSuccess: (data) => {
            setPosts((prev) => [data, ...prev]);
        },
        onError: (error) => {
            errorModal(error.message || "Failed to create post.");
        }
    });

    const editMutation = useMutation({
        mutationFn: editPostAction,
        onSuccess: (data) => {
            setPosts((prev) => prev.map((post) => post.id === data.id ? data : post));
        },
        onError: (error) => {
            errorModal(error.message || "Failed to edit post.");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deletePostAction,
        onSuccess: (data) => {
            setPosts((prev) => prev.filter((post) => post.id !== data));
        },
        onError: (error) => {
            errorModal(error.message ||"Failed to delete post.");
        }
    });

    const handleOpenModalDeletePost = (id: number) => {
        setContent(
            <div className="w-165 h-36.5 bg-white p-6 rounded-lg border border-card-border flex flex-col justify-between">
                <h1>Are you sure you want to delete this item?</h1>
                <div className="flex items-center gap-4 justify-end">
                    <ButtonRoot
                        disabled={deleteMutation.isPending}
                        onClick={setClose}
                        className="h-8 w-30"
                    >
                        <span>Cancel</span>
                    </ButtonRoot>
                    <ButtonRoot
                        onClick={() => { handleDeletePost(id); setClose() }}
                        className="bg-error text-white h-8 w-30"
                        disabled={deleteMutation.isPending}
                    >
                        <span>Delete</span>
                    </ButtonRoot>
                </div>
            </div>
        );
        setOpen();
    }

    function handleDeletePost(id: number) {
        deleteMutation.mutateAsync(id);
        setClose();
    }

    const handleOpenModalEditPost = (post: Post) => {

        setContent(
            <CardSubmit
                title="Edit item"
                className="bg-white w-165 h-full"
                actionButtonProps={{
                    text: "Save",
                    className: "bg-success text-white h-8 w-30"
                }}
                backButtonProps={{
                    text: "Cancel",
                    className: "h-8 w-30 border-black!"
                }}
                isSubmitting={editMutation.isPending}
                onSubmit={(title: string, content: string) => { handleEditPost({ ...post, title, content }); setClose() }}
                onCancel={setClose}
                valueTitle={post.title}
                valueContent={post.content}
            />
        )

        setOpen();
    }

    function handleEditPost(post: Post) {
        editMutation.mutateAsync(post);
        setClose();
    }

    function handleSubmit(title: string, content: string) {
        submitMutation.mutateAsync({ title, content });
    }

    return (
        <main className="flex flex-col items-center justify-center p-6 gap-6">
            <CardSubmit
                title="What’s on your mind?"
                className="w-full h-full"
                actionButtonProps={{
                    text: "Create",
                    className: "bg-primary text-white"
                }}
                isSubmitting={submitMutation.isPending}
                onSubmit={handleSubmit}
            />
            {posts.map((post) => (
                <div key={post.id} className="w-full h-full flex flex-col border rounded-lg border-card-border">
                    <div className="h-17.5 bg-primary rounded-t-lg flex items-center justify-between px-6">
                        <h1 className="text-white">{post.title}</h1>
                        {post.username === username && (
                            <div className="flex items-center gap-[23.8px]">
                                <ButtonRoot
                                    className="border-none"
                                    onClick={() => handleOpenModalDeletePost(post.id)}
                                >
                                    <img src={deleteIcon} alt="Delete" />
                                </ButtonRoot>
                                <ButtonRoot
                                    className="border-none"
                                    onClick={() => handleOpenModalEditPost(post)}
                                >
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