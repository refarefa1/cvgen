import { Resume } from "../interfaces/resume-interface"

function getEmptyResume() {
    const resume: Resume = {
        _id: 'r103',
        name: 'Resume 2'
    }
    return resume
}

export const resumeService = {
    getEmptyResume
}