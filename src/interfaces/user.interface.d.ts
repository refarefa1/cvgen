import Resume from './resume-interface';

export default interface User {
	_id: string | null
	name?: string
	email?: string
	resumes?: Resume[]
}

export interface Credentials {
	username: string
	password: string
	email?: string
}
