import Resume from './resume-interface';

export default interface User {
	_id: string | null
	resumes?: Resume[]
}

export interface Credentials {
	username: string
	password: string
	email?: string
}
