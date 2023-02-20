import { Resume } from "../interfaces/resume-interface"
import { userService } from "./user.service"
import { utilService } from "./util.service"

function save(resume: Resume) {
    const user = userService.query()
    if (!user.resumes) user.resumes = []
    if (!resume._id) {
        resume._id = utilService.makeId()
        user.resumes.push(resume)
    } else {
        const idx: number = user.resumes.findIndex(r => r._id === resume._id)
        user.resumes[idx] = resume
    }
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
        name: 'Untitled',
        components: [] as string[],
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