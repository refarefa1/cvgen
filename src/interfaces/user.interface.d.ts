import { Resume } from './resume-interface';

export interface User {
	_id: string;
	name: string;
	email: string;
	resumeList: Resume[];
}
