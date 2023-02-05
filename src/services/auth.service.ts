import { Credentials } from "../interfaces/user.interface";
import axios from 'axios'
import { Resume } from "../interfaces/resume-interface";

import { appwriteService } from "./appwrite.service";

// @ts-ignore
window.signup = appwriteService.signup
// @ts-ignore
window.getAccount = appwriteService.getAccount
// @ts-ignore
window.logout = appwriteService.logout
// @ts-ignore
window.login = appwriteService.login

const prod = false
const BASE_URL = prod ? '/api/auth/' : 'http://localhost:3000/api/auth/'


async function login(credentials: Credentials) {
    try {
        return await axios.post(BASE_URL + 'login', { credentials })
    } catch (err: any) {
        throw new Error(err);
    }
}

async function signup(credentials: Credentials, resume: Resume) {
    try {
        return await axios.post(BASE_URL + 'signup', { credentials, resume })
    } catch (err: any) {
        throw new Error(err);
    }
}

async function reset(email: keyof Credentials) {
    try {
        return await axios.post(BASE_URL + 'reset', { email })
    } catch (err: any) {
        throw new Error(err);
    }
}


export const authService = {
    login,
    signup,
    reset
}