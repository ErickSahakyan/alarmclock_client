import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { IAlarm, IWeekday } from "../../types/types";



type AlarmsState = {
	alarms: IAlarm[],
	isLoading: boolean
}


export const getAllAlarms = createAsyncThunk<IAlarm[]>(
	'alarm/getAllAlarms',
	async () => {
		try {
			const { data } = await axios.get('/alarm/user/me');
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const createAlarm = createAsyncThunk<IAlarm[], { time: string, text: string, condition: boolean, weekday: IWeekday[] }>(
	'alarm/createAlarm',
	async ({ time, text, condition, weekday }) => {
		try {
			const { data } = await axios.post('/alarm/', {
				time,
				text,
				condition,
				weekday
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const handleCondition = createAsyncThunk<IAlarm[], { id: string, condition: boolean }>(
	'alarm/handleCondition', async ({ id, condition }) => {
		try {
			const { data } = await axios.put('/alarm/toggle', {
				id, condition
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const handleRemove = createAsyncThunk<IAlarm[], { id: string }>(
	'alarm/handleRemove', async (id) => {
		try {
			const { data } = await axios.delete(`/alarm/${id}`)

			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const changeAlarm = createAsyncThunk<IAlarm[], { time: string, text: string, id: string | undefined, condition: boolean, weekday: IWeekday[] }>(
	'alarm/changeAlarm', async ({ time, text, id, condition, weekday }) => {
		try {
			const { data } = await axios.put(`/alarm/${id}`, {
				time,
				text,
				condition,
				weekday
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}
)


export const duplicateAlarmClock = createAsyncThunk<IAlarm[], { time: string, text: string, condition: boolean | undefined }>(
	'alarm/duplicateAlarmClock',
	async ({ time, text, condition }) => {
		try {
			const { data } = await axios.post('/alarm/duplicate', {
				time,
				text,
				condition,
			})

			return data
		} catch (error) {
			console.log(error)
		}
	}
)

const initialState: AlarmsState = {
	alarms: [],
	isLoading: false
}

export const alarmSlice = createSlice({
	name: 'alarm',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllAlarms.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllAlarms.fulfilled, (state, { payload }) => {
				state.isLoading = false
				// state.alarms = payload.alarms
			})

			.addCase(createAlarm.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAlarm.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				// state.alarms.push(payload)
			})

			.addCase(handleCondition.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleCondition.fulfilled, (state, { payload }) => {
				state.isLoading = false
				// const toggleWeekday = state.alarms.find(alarm => alarm._id !== payload._id)
				// if (toggleWeekday) {
				// toggleWeekday.condition = !toggleWeekday.condition
				// }
			})

			.addCase(handleRemove.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(handleRemove.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				// state.alarms.filter((alarm) => alarm._id !== payload._id);
			})

			.addCase(changeAlarm.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changeAlarm.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				// const index = state.alarms?.findIndex((alarm) => alarm?._id === payload._id)
				// state.alarms === undefined ? '' : state.alarms[index] = payload

			})

			.addCase(duplicateAlarmClock.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(duplicateAlarmClock.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				// state.alarms.push(payload)
			})
	}
})





export default alarmSlice.reducer;