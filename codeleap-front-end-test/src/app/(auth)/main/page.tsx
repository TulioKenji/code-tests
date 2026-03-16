import MainPageComponent from "@/components/pages/main";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getPostsResponseSchema } from "@/schemas/post";

interface MainProps {
    searchParams: Promise<{
        offset?: string;
    }>;
}

export default async function Main({searchParams}: MainProps) {

    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;

    if (!username) {
        return redirect("/");
    }

    try {
        const response = await fetch("https://dev.codeleap.co.uk/careers/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const rawData = await response.json();

        const data = getPostsResponseSchema.parse(rawData);
        const posts = data.results;

        return (
        <div className="flex w-screen flex-col items-center justify-center">
            <div className="w-full lg:w-200 h-dvh overflow-y-auto bg-white">
                <header className="bg-primary w-full h-20 flex items-center p-9.25">
                    <h1 className="text-white">CodeLeap Network</h1>
                </header>
                <MainPageComponent username={username} initialPosts={posts} />
            </div>
        </div>
    );

    } catch (error) {
        return (
            <div className="flex w-screen flex-col items-center justify-center">
                <div className="w-full lg:w-200 h-dvh overflow-y-auto bg-white">
                    <header className="bg-primary w-full h-20 flex items-center p-9.25">
                        <h1 className="text-white">CodeLeap Network</h1>
                    </header>
                    <div className="p-6">
                        <h1 className="text-red-500">Failed to load posts. Please try again later.</h1>
                    </div>
                </div>
            </div>
        );
    }
    
}