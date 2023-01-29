import { User } from "../interfaces/user.interface"


const user: User = {
    _id: 'u101',
    name: 'Refa',
    email: 'refaelavramov@gmail.com',
    resumeList: [
        {
            _id: 'r101',
            name: 'My first resume'
        }
    ]
}

async function query() {
    return Promise.resolve(user)
}

export const userService = {
    query
}