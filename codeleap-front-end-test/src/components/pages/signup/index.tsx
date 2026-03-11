'use client';
import ButtonRoot from "@/components/common/Button/Root";
import Input from "@/components/common/Input";
import { useState } from "react";


export default function SignupPageComponent() {
    const [username, setUsername] = useState("");
    return (
        <div className="flex flex-col items-start gap-4 bg-white w-125 h-51.25 border rounded-2xl py-4 px-6 border-card-border">
            <h1>Welcome to Codeleap Network</h1>
            <label htmlFor="username">Please enter your username</label>
            <Input
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <ButtonRoot
                disabled={!username.trim()}
                className="bg-primary w-27.75 h-8 text-white self-end"
            >
                ENTER
            </ButtonRoot>
        </div>
    );
}