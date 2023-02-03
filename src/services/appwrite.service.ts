type Credentials = {
    email: string
    password: string
    username?: string
}

import { Client, Account, ID } from "appwrite";
import axios from "axios";

const endpoint = 'http://localhost/v1'
const projectId = '63d9016cea6df8e70edc'
const databaseId = '63d901781afad61fd78d'
const collectionId = '63d901d89c618b74d51b'

const client = new Client()

client
    .setEndpoint(endpoint)
    .setProject(projectId)

const account = new Account(client)

// export async function _signup(credentials: Credentials) {
//     credentials.username = ''
//     try {
//         const user = await account.create(ID.unique(), credentials.email, credentials.password, credentials.username)
//         const session = await account.createEmailSession(credentials.email, credentials.password)
//         return session
//     } catch (err) {
//         console.log(err)
//     }
// }

export async function isLoggedIn() {
    try {
        const res = await account.getSession('current')
        return res
    } catch (err) {
        console.log(err)
        // @ts-ignore
        throw new Error(err)
    }    
}

export async function _signup(credentials: Credentials) {
    credentials.username = ''
    try {
        const res = axios.post('http://localhost:3000/api/user/signup', {credentials})
        console.log("🚀 ~ file: appwrite.service.ts:49 ~ _signup ~ res", res)
        // const user = await account.create(ID.unique(), credentials.email, credentials.password, credentials.username)
        // const session = await account.createEmailSession(credentials.email, credentials.password)
        return res
    } catch (err) {
        console.log(err)
    }
}

//@ts-ignore
window._signup = _signup
