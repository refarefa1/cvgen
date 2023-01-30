import Resume from './resume-interface';

export interface User {
	_id: string | null;
	name?: string;
	email?: string;
	resumes?: Resume[];
}
