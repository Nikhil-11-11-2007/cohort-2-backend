import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  try {
    const cookiStore = await cookies();

    const token = cookiStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decode = verifyToken(token);

    if (!decode) {
      return null;
    }

    return decode.userId;
  } catch (error) {
    console.log("Authentication error:", error);

    return null;
  }
}