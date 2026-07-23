import React from 'react'

const FallbackUi = ({ handleReload, state }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                <h1 className="mb-3 text-3xl font-bold text-red-600">
                    Something went wrong!
                </h1>

                <p className="mb-6 text-gray-600">
                    An unexpected error occurred while rendering this page.
                </p>

                {state.error && (
                    <pre className="mb-6 overflow-auto rounded bg-gray-100 p-3 text-left text-sm text-red-500">
                        {state.error.toString()}
                    </pre>
                )}

                <button
                    onClick={handleReload}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                >
                    Reload Page
                </button>
            </div>
        </div>
    )
}

export default FallbackUi