import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-3">
                    Login
                </h1>

                <LoginForm />
            </div>
        </main>
    );
}