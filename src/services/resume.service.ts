import { Resume } from "../interfaces/resume-interface"
import { userService } from "./user.service"
import { utilService } from "./util.service"
import axios from 'axios'

const prod = false
const BASE_URL = prod ? '/api/resume/' : 'http://localhost:3000/api/resume/'

async function save(resume: Resume) {
    // For backend - in backend need also to save the resume in the user object after updating / adding resume
    // try {
    //     if (!resume._id) {
    //         await axios.post(BASE_URL, { resume })
    //     } else {
    //         await axios.put(BASE_URL, { resume })
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
    const user = await userService.query()
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

function getEmptyResume(): Resume {
    const resume: Resume = {
        name: 'Resume 2',
        components: [] as string[],
        style: {
            heading: {
                style: 'underline',
                capitalization: 'capitalize',
                headingColor: '#000000'
            }
        }
    }
    return resume
}

export const resumeService = {
    save,
    getEmptyResume
}