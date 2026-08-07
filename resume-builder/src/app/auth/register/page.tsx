import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-3">
                    Register
                </h1>

                <RegisterForm />
            </div>
        </main>
    );
}