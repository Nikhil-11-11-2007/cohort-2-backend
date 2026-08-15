import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main 
            className="min-h-screen flex items-center justify-center p-4 relative z-10 bg-[#f7f9fb]"
            style={{ 
                backgroundImage: "radial-gradient(#e0e3e5 1px, transparent 1px)", 
                backgroundSize: "24px 24px" 
            }}
        >
            {/* Decorative Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>

            <div className="w-full z-10">
                <RegisterForm />
            </div>
        </main>
    );
}