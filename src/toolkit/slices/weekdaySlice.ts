import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeekday } from "../../types/types";


type WeekdayState = {
	weekday: IWeekday[],
}

const initialState: WeekdayState = {
	weekday: [
		{ id: 0, weekdayName: 'пн', condition: true },
		{ id: 1, weekdayName: 'вт', condition: true },
		{ id: 2, weekdayName: 'ср', condition: true },
		{ id: 3, weekdayName: 'чт', condition: true },
		{ id: 4, weekdayName: 'пт', condition: true },
		{ id: 5, weekdayName: 'сб', condition: true },
		{ id: 6, weekdayName: 'вс', condition: true },
	],
}


export const weekdaySlice = createSlice({
	name: 'weekday',
	initialState,
	reducers: {
		weekdayToggleIncluded: (state, action: PayloadAction<number | string>) => {
			const toggleWeekday = state.weekday.find(day => day.id !== action.payload)
			if (toggleWeekday) {
				toggleWeekday.condition = !toggleWeekday.condition
			}
		}
	}
})

export const { weekdayToggleIncluded } = weekdaySlice.actions


export default weekdaySlice.reducer;
