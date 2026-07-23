import React from 'react'

const Skeleton = () => {
    return (
        <div className="max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-md animate-pulse">
            {/* Profile Image */}
            <div className="mx-auto h-20 w-20 rounded-full bg-gray-300"></div>

            {/* Name */}
            <div className="mt-4 h-5 w-40 mx-auto rounded bg-gray-300"></div>

            {/* Email */}
            <div className="mt-3 h-4 w-56 mx-auto rounded bg-gray-200"></div>

            {/* Role */}
            <div className="mt-3 h-4 w-28 mx-auto rounded bg-gray-200"></div>

            {/* Button */}
            <div className="mt-6 h-10 w-full rounded-lg bg-gray-300"></div>
        </div>
    )
}

export default Skeleton