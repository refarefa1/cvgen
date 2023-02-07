import { Client, Account } from 'appwrite'
import axios from 'axios'


const prod = true

const endpoint = prod ? 'https://8080-appwrite-integrationfor-qlfoe2fdmm3.ws-eu85.gitpod.io/v1' : 'http://localhost/v1'
const projectId = prod ? '63e0afafd7e8f5f4897d' : '63e0de1c292f41ec9bb6'//'63d9016cea6df8e70edc'
const databaseId = prod ? '63e1f5f4e9f95373a473' : '63e0de37c7521b7e3efa'//'63d901781afad61fd78d'
const collectionId = prod ? '63e1f5f946d83157ddd8' : '63e0de3c4c47351a3e74' //'63d901d89c618b74d51b'

const BASE_URL = prod ? '/api/auth/' : 'http://localhost:3000/api/auth/'


const client = new Client()

client
    .setEndpoint(endpoint)
    .setProject(projectId)

const account = new Account(client)

export async function signup() {
    try {
        const mail = `${Math.random()}@gmail.com`
        const newAccount = await account.create("unique()", mail, mail, mail)
        const res = await login(mail, mail)
    } catch (err) {
        console.log(err);
    }
}

export async function login(email: string, password: string) {
    try {
        const session = await account.createEmailSession(email, password)
        const jwt = await account.createJWT()
        const res = await _sendJWT(jwt as any)
        return res
    } catch (err) {
        console.log(err);
    }
}

export async function logout() {
    try {
        const res = await account.deleteSessions()
    } catch (err) {
        console.log(err);
    }
}



async function getAccount() {
    try {
        const loggedInAccount = await account.get()
        console.log("🚀 ~ file: appwrite.service.ts:54 ~ getAccount ~ loggedInAccount", loggedInAccount)
    } catch (err) {
        console.log(err);
    }
}

async function _sendJWT(jwt: string) {
    try {
        const res = await axios.post(BASE_URL + 'setJWT', { jwt })
    } catch (err) {
        console.log(err);
    }
}


export const appwriteService = {
    signup,
    getAccount,
    logout,
    login
}