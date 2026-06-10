import axiosInstance from "@/lib/axios";
import {
    LoginBody,
    RegisterBody,
} from "@/types/user.types";

export const registerApi = async (
    payload: RegisterBody
) => {
    const response = await axiosInstance.post(
        "/auth/register",
        payload
    );

    return response.data;
};

export const loginApi = async (
    payload: LoginBody
) => {
    const response = await axiosInstance.post(
        "/auth/login",
        payload
    );

    return response.data;
};