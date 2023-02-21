import { Resume } from "../interfaces/resume-interface"
import { userService } from "./user.service"
import { utilService } from "./util.service"

function save(resume: Resume) {
    const user = userService.query()
    if (!user.resumes) user.resumes = []
    const idx: number = user.resumes.findIndex(r => r._id === resume._id)
    if (idx === -1) user.resumes.push(resume)
    else user.resumes[idx] = resume
    userService.save(user)
    return resume
}

function remove(id: string) {
    const user = userService.query()
    const resumes = user.resumes?.filter(resume => resume._id !== id)
    user.resumes = resumes
    userService.save(user)
}

function getEmptyResume(): Resume {
    const resume: Resume = {
        _id: utilService.makeId(),
        name: 'Untitled',
        components: [] as string[],
        personal: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            address: '',
            imgUrl: ''
        },
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
        }
    }
    return resume
}

export const resumeService = {
    save,
    remove,
    getEmptyResume
}