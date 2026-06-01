import Navbar from "@/components/Navbar";

const layout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col gap-5">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export default layout;