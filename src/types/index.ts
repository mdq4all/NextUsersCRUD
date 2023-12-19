export type Inputs = {
    username: string
    name: string
    password: string
    confirmPassword: string
    hierarchy: string
}

export type SigninInput = {
    username: string
    password: string
}

export type Users = {
    createdAt: string,
    hierarchy: string,
    lastLogin: string,
    name: string,
    username: string,
    _id: string
}