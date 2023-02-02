import { Resume } from "../interfaces/resume-interface"
import { userService } from "./user.service"
import { utilService } from "./util.service"

async function save(resume: Resume) {
    const user = await userService.query()
    if (!user.resumes) user.resumes = []
    if (!resume._id) {
        // TODO : POST REQUEST FOR /api/resume/
        resume._id = utilService.makeId()
        user.resumes.push(resume)
    } else {
        // TODO : PUT REQUEST FOR /api/resume/
        const idx: number = user.resumes.findIndex(r => r._id === resume._id)
        user.resumes[idx] = resume
    }
    userService.save(user)
}

function getEmptyResume(): Resume {
    const resume: Resume = {
        name: 'Resume 2',
        components: ['resume-personal']
    }
    return resume
}

export const resumeService = {
    save,
    getEmptyResume
}