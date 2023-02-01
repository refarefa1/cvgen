interface Education {
	_id: string
	degree: string
	school: string
	city: string
	country: string
	description: string
}

interface Personal {
	fullName: string
	jobTitle: string
	email: string
	phone: string
	address: string
	imgUrl: string
}

export interface Resume {
	_id?: string
	name: string
	components: string[]
	personal?: Personal
	education?: Education[]
	[index: string]: any
}
