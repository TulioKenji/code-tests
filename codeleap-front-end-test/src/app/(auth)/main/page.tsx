import MainPageComponent from "@/components/pages/main";

export default async function Main() {
    return (
        <div className="flex w-screen flex-col items-center justify-center">
            <div className="w-200 h-dvh overflow-y-auto bg-white">
                <header className="bg-primary w-full h-20 flex items-center p-9.25">
                    <h1 className="text-white">CodeLeap Network</h1>
                </header>
                <MainPageComponent />
            </div>
        </div>
    );
}