import { Resume } from "../interfaces/resume-interface"
import User from "../interfaces/user.interface"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

const USER_KEY = 'loggedinUser'

function query() {
    const user = _getUser()
    return user
}

async function save(user: User) {
    storageService.saveToStorage(USER_KEY, user)
}

function getEmptyResume(): Resume {
    const resume: Resume = {
        name: 'Resume 2',
        components: ['resume-personal']
    }
    return resume
}

function _getUser() {
    let user: User = storageService.loadFromStorage(USER_KEY)
    if (!user) user = {
        _id: 'u101',
        name: 'Refa',
        email: 'refaelavramov@gmail.com',
        resumes: [
            {
                _id: 'r101',
                name: 'Test resume',
                components: ['resume-personal', 'resume-education'],
                personal: {
                    fullName: 'Refael Abramov',
                    jobTitle: 'Fullstack Developer',
                    email: 'refaelavramov@gmail.com',
                    phone: '0538207782',
                    address: 'Givolim 10, Tel Aviv, Israel',
                    imgUrl: 'https://media.licdn.com/dms/image/D4D03AQH1cEZGoS_Khw/profile-displayphoto-shrink_200_200/0/1665660743445?e=1680739200&v=beta&t=yI2mYyIHk0uUcl0fu7u9Z2D7NZmENSjS3IA42Hqmp_c',
                },
                education: [
                    {
                        _id: utilService.makeId(),
                        degree: 'Fullstack Developer',
                        school: 'Coding Academy',
                        city: 'Ramat Gan',
                        country: 'Israel',
                        description: 'blabalblaalblalbalblasdalblalblablalbla'
                    },
                    {
                        _id: utilService.makeId(),
                        degree: 'Graphic Designer',
                        school: 'HackerU',
                        city: 'Tel Aviv',
                        country: 'Israel',
                        description: 'blabalblaalblalbalblalblalblasdfgsdfgsdfgblalbla'
                    },
                ]
            }
        ]
    }
    storageService.saveToStorage(USER_KEY, user)
    return user
}

export const userService = {
    query,
    save,
    getEmptyResume
}