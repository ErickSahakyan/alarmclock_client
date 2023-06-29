export interface IWeekday {
	id: number,
	weekdayName: string,
	condition: boolean,
}

export interface IAlarm {
	_id: string,
	time: string,
	text?: string,
	condition: boolean,
	weekday: IWeekday[],
	createdAt: {
		$date: string
	},
	updatedAt: {
		$data: string
	},
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
}