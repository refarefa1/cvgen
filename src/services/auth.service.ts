import { Client, Account } from 'appwrite'
import axios from 'axios'

import { Credentials } from '../interfaces/user.interface'

const prod = true
const BASE_URL = prod ? 'http://localhost:3000/api/auth/' : 'http://localhost:3000/api/auth/'


const endpoint = prod ? 'https://8080-appwrite-integrationfor-qlfoe2fdmm3.ws-eu85.gitpod.io/v1' :'http://localhost/v1'
const projectId = prod ? '63e0afafd7e8f5f4897d' : '63d9016cea6df8e70edc'

const client = new Client()

client
    .setEndpoint(endpoint)
    .setProject(projectId)

const account = new Account(client)

export async function signup(credentials: Credentials, resume: object | undefined) {
    try {
        const demo = `${Math.random()}@gmail.com`
        const { email, password, username } = {email: demo, password: demo, username: demo} //credentials
        
        console.log('hey1');
        const newAccount = await account.create("unique()", email, password, username)
        console.log('hey2');
        // window.newAccount = {"$id":"63e0b784b51f1a85005a","$createdAt":"2023-02-06T08:17:08.843+00:00","$updatedAt":"2023-02-06T08:17:08.843+00:00","name":"0.13869023395258528@gmail.com","registration":"2023-02-06T08:17:08.843+00:00","status":true,"passwordUpdate":"2023-02-06T08:17:08.843+00:00","email":"0.13869023395258528@gmail.com","phone":"","emailVerification":false,"phoneVerification":false,"prefs":{}}
        const loggedIn = await login(email, password) 
        const userDb = await _createUserDb(newAccount, resume)
        return userDb
    } catch (err: any) {
        console.log('Failed To Signup', err);
        throw new Error(err);
    }     
}

export async function login(email: string, password: string) {
    try {
        
        const session = await account.createEmailSession(email, password)
        const jwt = await account.createJWT()
        console.log('hey12');
        const res = await _sendJWT(jwt as any)
        console.log('hey13');
        return res
    } catch (err: any) {
        console.log('Failed To Login', err);
        throw new Error(err);    
    }      
}

export async function logout() {
    try {
        const res = await account.deleteSessions()
    } catch(err: any) {
        console.log('Failed To Logout', err);
        throw new Error(err);
    }
}


async function getAccount() {
    try {
        const loggedInAccount = await account.get()
    } catch (err: any) {
        console.log('Failed To Get Account', err);
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

async function _sendJWT(jwt: string) {
    try {
        const res = await axios.post(BASE_URL + 'setJWT', { jwt })
    } catch (err: any) {
        console.log('Failed To Send JWT', err);
        throw new Error(err);
    }    
}

async function _createUserDb({$id, name, email}: {$id: string, name: string, email: string}, resume: object | undefined) {
    try {
        const user = {
            $id, 
            name,
            email,
            resumes: resume ? [resume] : []
        }
        
        const res = await axios.post('http://localhost:3000/api/user/', {user})
    } catch (err: any) {
        console.log('Failed to create user database', err);
        throw new Error(err);
    }
}





export const authService = {
    signup,
    getAccount,
    logout,
    login
}

// @ts-ignore
window.signup = signup
// @ts-ignore
window.getAccount = getAccount
// @ts-ignore
window.logout = logout
// @ts-ignore
window.login = login
// @ts-ignore
window._createUserDb = _createUserDb
// @ts-ignore
window.newAccount = {"$id":"63e0b784b51f1a85005a","$createdAt":"2023-02-06T08:17:08.843+00:00","$updatedAt":"2023-02-06T08:17:08.843+00:00","name":"0.13869023395258528@gmail.com","registration":"2023-02-06T08:17:08.843+00:00","status":true,"passwordUpdate":"2023-02-06T08:17:08.843+00:00","email":"0.13869023395258528@gmail.com","phone":"","emailVerification":false,"phoneVerification":false,"prefs":{}}




