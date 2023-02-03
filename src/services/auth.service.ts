import { _signup } from "./appwrite.service"

type Credentials = {
    email: string
    password: string
}

async function login(credentials: Credentials) {
    // TODO : POST REQUEST FOR /api/login/
    // For now it can be just hard coded user with _id and the credentials they sent
}

async function signup(credentials: Credentials) {
    try {
        const res = _signup(credentials)
        return res
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
}

async function reset(email: keyof Credentials) {
    // TODO : POST REQUEST FOR /api/reset/
}


export const authService = {
    login,
    signup,
    reset
}