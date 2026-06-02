import { NextResponse } from "next/server";

export function GET(req:NextResponse) {

    return NextResponse.json({
        message: "Hello this from next js server"
    })

}