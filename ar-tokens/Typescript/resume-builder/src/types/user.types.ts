interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface RegisterBody {
    name: string,
    email: string,
    password: string,
    mobile: string
}

interface LoginBody {
    email: string,
    password: string
}

interface JWTPayload {
    userId: string,
    email?: string
}