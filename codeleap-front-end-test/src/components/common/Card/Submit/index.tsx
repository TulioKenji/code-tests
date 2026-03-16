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
    className?: string;
    title: string;
    actionButtonProps: ButtonProps;
    backButtonProps?: ButtonProps;
    onSubmit: Function;
    onCancel?: () => void;
    isSubmitting: boolean;
    valueTitle?: string;
    valueContent?: string;
}

export default function CardSubmit({ title, className, actionButtonProps, backButtonProps, onSubmit, onCancel, isSubmitting, valueTitle, valueContent }: CardSubmitProps) {
    const [postTitle, setPostTitle] = useState(valueTitle || "");
    const [postContent, setPostContent] = useState(valueContent || "");

    const disableSumbit = postTitle.trim() === "" || postContent.trim() === "" ||
     (postTitle === valueTitle && postContent === valueContent) || isSubmitting;

    return (
        <div className={`flex flex-col border rounded-lg border-card-border p-6 ${className || ''}`}>

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
                        disabled={disableSumbit}
                    >
                        {actionButtonProps.text}
                    </ButtonSubmit>
                </div>
            </form>
        </div>
    );
}