import User from "../interfaces/user.interface"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

const USER_KEY = 'loggedinUser'

function query() {
    const user = _getUser()
    return user
}

function save(user: User) {
    storageService.saveToStorage(USER_KEY, user)
}

function getEmptyUser() {
    const user: User = {
        _id: utilService.makeId(),
        name: 'Guest'
    }
    return user
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
                components: ['resume-profile', 'resume-education', 'resume-experience', 'resume-skills', 'resume-languages', 'resume-military'],
                style: {
                    heading: {
                        style: 'underline',
                        capitalization: 'capitalize',
                        headingColor: '#000000'
                    },
                    skills: {
                        display: 'grid'
                    },
                    languages: {
                        display: 'grid'
                    },
                },
                personal: {
                    fullName: 'Refael Abramov',
                    jobTitle: 'Fullstack Developer',
                    email: 'refaelavramov@gmail.com',
                    phone: '0538207782',
                    address: 'Givolim 10, Tel Aviv, Israel',
                    imgUrl: 'https://res.cloudinary.com/dznyyt4xc/image/upload/v1676808139/udnqwklz5xat1rn25zc4.jpg',
                },
                profile: {
                    about: `A junior full stack developer with a strong background in graphic design and exceptional computer skills developed from years of experience`
                },
                education: [
                    {
                        _id: utilService.makeId(),
                        degree: 'Fullstack Developer',
                        school: 'Coding Academy',
                        city: 'Ramat Gan',
                        country: 'Israel',
                        description: 'Fullstack Development , Web developer'
                    },
                    {
                        _id: utilService.makeId(),
                        degree: 'Graphic Designer',
                        school: 'HackerU',
                        city: 'Tel Aviv',
                        country: 'Israel',
                        description: 'Graphic design with UX / UI'
                    },
                ],
                experience: [
                    {
                        _id: utilService.makeId(),
                        employer: 'Bulldozer LTD',
                        jobTitle: 'Graphic Designer',
                        city: 'Ashdot Yaakov',
                        country: 'Israel',
                        startDate: 1644689492000,
                        endDate: 1662401492000
                    },
                    {
                        _id: utilService.makeId(),
                        employer: 'Kwix LTD',
                        jobTitle: 'Graphic Designer',
                        city: 'Yavne',
                        country: 'Israel',
                        startDate: 1601748692000,
                        endDate: 1634494292000
                    },

                ],
                skills: [
                    {
                        _id: utilService.makeId(),
                        name: 'React',
                        level: 3
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Vue3',
                        level: 5
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Angular',
                        level: 2
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'NodeJS',
                        level: 4
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Express',
                        level: 1
                    },
                ],
                languages: [
                    {
                        _id: utilService.makeId(),
                        name: 'Hebrew',
                        level: 5
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'English',
                        level: 4
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Russian',
                        level: 3
                    },
                ],
                military: {
                    role: 'Orev Nahal',
                    startDate: 1458500812000,
                    endDate: 1542654412000
                }


            }
        ]
    }
    storageService.saveToStorage(USER_KEY, user)
    return user
}

export const userService = {
    query,
    save,
    getEmptyUser,
}