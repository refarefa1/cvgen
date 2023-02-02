
type Credentials = {
    email: string
    password: string
}

async function login(credentials: Credentials) {
    // TODO : POST REQUEST FOR /api/login/
    // For now it can be just hard coded user with _id and the credentials they sent
}

async function signup(credentials: Credentials) {
    // TODO : POST REQUEST FOR /api/signup/
    // For now it can be just hard coded user with _id and the credentials they sent
}

async function reset(email: keyof Credentials) {
    // TODO : POST REQUEST FOR /api/reset/
}


export const authService = {
    login,
    signup,
    reset
}