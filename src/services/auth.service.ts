import { Credentials } from "../interfaces/user.interface";
import axios from 'axios'

const prod = false

const BASE_URL = prod ? '/api/auth/' : 'http://localhost:3000/api/auth/'

async function login(credentials: Credentials) {
    try {
        return await axios.post(BASE_URL + 'login', { credentials })
    } catch (err: any) {
        throw new Error(err);
    }
}

async function signup(credentials: Credentials) {
    try {
        return await axios.post(BASE_URL + 'signup', { credentials })
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