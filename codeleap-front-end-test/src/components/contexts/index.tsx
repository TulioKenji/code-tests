'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./modalContext";


export default function Contexts({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
            {children}
            </ModalProvider>
        </QueryClientProvider>
    );
}
