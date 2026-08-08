import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";


export async function GET() {
    try {

        await connectDB()

        const userId = await getCurrentUser()

        const user = await UserModel.findById(userId).select("-password")

        if (!user) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json<ApiResponse>(

            {
                success: true,
                message: "User fetched successfully",
                data: {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile
                    },
                },
            },
            {
                status: 200
            }
        )

    } catch (error) {

        console.log("Error in get-me api", error);

        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Unauthorized",
            },
            {
                status: 401
            }
        );

    }
}