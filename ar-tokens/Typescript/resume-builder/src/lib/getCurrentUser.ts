import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
    const cookiStore = await cookies()

    const token = cookiStore.get('token')?.value

    if (!token) throw new Error("Token not found")

    const decode = verifyToken(token)

    if(!decode) throw new Error("unauthorize")

    return decode.userId

}