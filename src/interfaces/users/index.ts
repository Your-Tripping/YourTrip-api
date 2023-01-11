export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
    bio: string
}

export interface IUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
    bio: string
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    bio?: string
}