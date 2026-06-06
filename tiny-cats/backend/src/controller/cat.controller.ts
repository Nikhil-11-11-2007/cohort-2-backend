import type { Request, Response } from "express";
import { createCatService, getAllCatsService, getSingleCatService, recommendService, searchCatService } from "../services/cat.service.ts";

export const createCatController = async (req: Request, res: Response) => {
    const result = await createCatService(req.body)

    return res.status(201).json({
        success: true,
        message: "Cat created",
        data: result
    })
}

export const getAllCatsController = async (req: Request, res: Response) => {
    const result = await getAllCatsService()

    return res.status(200).json({
        success: true,
        message: "Cats feached successfully",
        data: result
    })
}

export const getSingleCatController = async (req: Request, res: Response) => {

    const id = req.params.id as string

    const result = await getSingleCatService(id)

    return res.status(200).json({
        success: true,
        message: "Cat feached successfully",
        data: result
    })
}

export const searchCatController = async (req: Request, res: Response) => {

    const q = req.query.q as string;

    const result = await searchCatService(q)

    return res.status(200).json({
        success: true,
        message: "Cat feached successfully",
        data: result
    })
}

export const recommendCatsController = async (req: Request, res: Response) => {

    const { kidsFriendly, apartmentFriendly } = req.body

    const result = await recommendService(kidsFriendly, apartmentFriendly)

    return res.status(200).json({
        success: true,
        message: "Cat feached successfully",
        data: result
    })
}