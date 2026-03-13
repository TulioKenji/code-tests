'use client';

import ButtonSubmit from "../../Button/Submit";
import Label from "../../Label";
import Textarea from "../../Textarea";
import Input from "../../Input";

import { useState } from "react";

interface ButtonProps {
    text: string;
    className: string;
}

interface CardSubmitProps {
    title: string;
    actionButtonProps: ButtonProps;
    backButtonProps?: ButtonProps;
    onSubmit: (title: string, content: string) => void;
    onCancel?: () => void;
    isSubmitting: boolean;
}

export default function CardSubmit({ title, actionButtonProps, backButtonProps, onSubmit, onCancel, isSubmitting }: CardSubmitProps) {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    return (
        <div className="w-full h-full flex flex-col border rounded-lg border-card-border p-6">
            <h1>{title}</h1>
            <form
                className="w-full flex flex-col gap-6 mt-4"
                onSubmit={(e)=>{e.preventDefault(); onSubmit(postTitle, postContent); setPostTitle(""); setPostContent("");}}
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" type="text" placeholder="Hello world" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Content here" className="resize-none" rows={3} value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                </div>
                <div className="self-end flex gap-4">
                    {backButtonProps && (
                        <ButtonSubmit
                            className={backButtonProps.className}
                            disabled={isSubmitting}
                            onClick={onCancel}
                        >
                            {backButtonProps.text}
                        </ButtonSubmit>
                    )}
                    <ButtonSubmit
                        className={actionButtonProps.className}
                        disabled={postTitle.trim() === "" || postContent.trim() === "" || isSubmitting}
                    >
                        {actionButtonProps.text}
                    </ButtonSubmit>
                </div>
            </form>
        </div>
    );
}