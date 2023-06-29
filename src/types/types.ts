export interface IWeekday {
	id: number,
	weekdayName: string,
	condition: boolean,
}

export interface IAlarm {
	_id: {
		$oid: string
	},
	time: string,
	text: string,
	condition: boolean,
	weekday: IWeekday[],
	createdAt: {
		$date: string
	},
	updatedAt: {
		$data: string
	},
	__v: number,
}

export interface IUser {
	_id: {
		$oid: string
	},
	email: string,
	password: string,
	alarms: IAlarm[],
	createdAt: {
		$date: string
	},
	updatedAt: {
		$data: string
	},
	__v: number,
}