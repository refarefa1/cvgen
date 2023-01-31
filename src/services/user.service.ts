import User from "../interfaces/user.interface"


const user: User = {
    _id: 'u101',
    name: 'Refa',
    email: 'refaelavramov@gmail.com',
    resumes: [
        {
            _id: 'r101',
            name: 'Test resume',
            fullName: 'Refael Abramov',
            jobTitle: 'Fullstack Developer',
            email: 'refaelavramov@gmail.com',
            phone: '0538207782',
            address: 'Givolim 10, Tel Aviv, Israel',
            imgUrl: 'https://media.licdn.com/dms/image/D4D03AQH1cEZGoS_Khw/profile-displayphoto-shrink_200_200/0/1665660743445?e=1680739200&v=beta&t=yI2mYyIHk0uUcl0fu7u9Z2D7NZmENSjS3IA42Hqmp_c'
        }
    ]
}

async function query() {
    return Promise.resolve(user)
}

export const userService = {
    query
}