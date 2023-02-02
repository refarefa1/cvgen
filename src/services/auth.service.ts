
type Credentials = {
    email: string
    password: string
}

async function login(credentials: Credentials) {
    // TODO : POST REQUEST FOR /api/login/
}

async function signup(credentials: Credentials) {
    // TODO : POST REQUEST FOR /api/signup/
}

async function reset(email: string) {
    // TODO : POST REQUEST FOR /api/reset/
}


export const authService = {
    login,
    signup,
    reset
}