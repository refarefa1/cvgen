export interface Style {
	heading: {
		style: string
		capitalization: string
		headingColor: string
	}
	skills: {
		display: string
	}
	languages: {
		display: string
	}
}

export interface Military {
	role: string
	startDate: number
	endDate: number
	[index: string]: any
}

export interface Language {
	_id: string
	name: string
	level: number
}

export interface Skill {
	_id: string
	name: string
	level: number
}

export interface Experience {
	_id: string
	employer: string
	jobTitle: string
	city: string
	country: string
	startDate: number
	endDate: number
	[index: string]: any
}

export interface Education {
	_id: string
	degree: string
	school: string
	city: string
	country: string
	description: string
}

export interface Personal {
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
	style: Style
	personal: Personal
	education?: Education[]
	experience?: Experience[]
	languages?: Language[]
	skills?: Skill[]
	[index: string]: any
}
