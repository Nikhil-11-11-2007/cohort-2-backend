export default function Loader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center">

                {/* Spinner */}
                <div className="relative h-14 w-14">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100" />

                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
                </div>

                {/* Text */}
                <p className="mt-5 text-sm font-medium text-blue-600">
                    Loading...
                </p>

            </div>
        </div>
    );
}