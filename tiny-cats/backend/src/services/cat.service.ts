import CatModel from "../models/cat.model.ts"

// create service
export const createCatService = async (payload: object) => {
    return await CatModel.create(payload)
}

// getAllcats service
export const getAllCatsService = async () => {
    return await CatModel.find()
}

// getSingleCat service
export const getSingleCatService = async (id: string) => {
    return await CatModel.findById(id)
}

// search cat service
export const searchCatService = async (query: string) => {
    return await CatModel.find({
        $or: [
            {
                name: {
                    $regex: query,
                    $options: "i"
                },
            },
            {
                breed: {
                    $regex: query,
                    $options: "i"
                },
            }
        ]
    })
}

// recommend cat service
export const recommendService = async (kidsFriendly: boolean, apartmentFriendly: boolean) => {
    return CatModel.find({
        kidsFriendly,
        apartmentFriendly
    })
}