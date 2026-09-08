import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";


async function GET() {
    try {

        await connectDB()
        const userId = await getCurrentUser()

        const resumes = await ResumeModel.find({ user_id: userId }).sort({ updatedAt: -1 })

        if (!resumes) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resumes not found"
            }, {
                status: 404
            })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resumes featched successfully",
            data: resumes
        }, {
            status: 200
        })

    } catch (error) {
        console.log("error in get All resumes api", error)
        return NextResponse.json<ApiResponse>({
            success: false, message: "Something went wrong"
        }, { status: 500 })
    }
}