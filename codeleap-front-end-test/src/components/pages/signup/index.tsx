'use client';
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";

import signupAction from "./action";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import ButtonSubmit from "@/components/common/Button/Submit";


export default function SignupPageComponent() {
    const router = useRouter();

    const [username, setUsername] = useState("");

    const mutation = useMutation({ mutationFn: signupAction, onSuccess: () => router.push("/main"), onError: (error) => console.error(error) });

    function handleSubmit() {
        mutation.mutateAsync({ username });
    }

    return (
        <div className="flex flex-col items-start gap-4 bg-white w-125 h-51.25 border rounded-2xl py-4 px-6 border-card-border">
            <h1>Welcome to Codeleap Network!</h1>
            <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="username">Please enter your username</Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <ButtonSubmit
                disabled={!username.trim() || mutation.isPending}
                className="bg-primary w-27.75 h-8 text-white self-end"
                onClick={handleSubmit}
            >
                ENTER
            </ButtonSubmit>
        </div>
    );
}