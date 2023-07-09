import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { IAlarm, IWeekday } from "../../types/types";




interface AlarmsState {
	alarms: IAlarm[],
	token: string | boolean | null,
	isLoading: boolean,
	status: string | null,
}


export const getAllAlarms = createAsyncThunk<IAlarm[]>(
	'alarm/getAllAlarms',
	async () => {
		try {
			const { data } = await axios.get('/alarm/alarms');
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const createAlarm = createAsyncThunk<IAlarm, { time: string, text: string, condition: boolean | undefined, weekday: IWeekday[] }>(
	'alarm/createAlarm',
	async ({ time, text, condition, weekday }) => {
		try {
			const { data } = await axios.post('/alarm/create', {
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

export const handleCondition = createAsyncThunk<IAlarm, { id: string, condition: boolean | undefined }>(
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

export const handleRemove = createAsyncThunk<IAlarm, { id: string | undefined }>(
	'alarm/handleRemove',
	async function ({ id }) {
		try {
			const { data } = await axios.delete(`/alarm/${id}`)

			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const changeAlarm = createAsyncThunk<IAlarm, { time: string, text?: string, id: string | undefined, condition: boolean | undefined, weekday: IWeekday[] }>(
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


export const duplicateAlarmClock = createAsyncThunk<IAlarm, { time: string, text: string | undefined, condition: boolean | undefined }>(
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


const initialState = {
	alarms: [],
	token: null,
	isLoading: false,
	status: null,
} as AlarmsState

export const alarmSlice = createSlice({
	name: 'alarm',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllAlarms.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllAlarms.fulfilled, (state, action) => {
				state.isLoading = false
				state.alarms = action.payload
			})

			.addCase(createAlarm.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAlarm.fulfilled, (state, action) => {
				state.isLoading = false;
				state.alarms.push(action.payload)
			})

			.addCase(handleCondition.pending, (state) => {
				state.isLoading = true
			})
			.addCase(handleCondition.fulfilled, (state, { payload }) => {
				state.isLoading = false
				const toggleWeekday = state.alarms?.find(alarm => alarm._id !== payload._id)
				if (toggleWeekday) {
					toggleWeekday.condition = !toggleWeekday.condition
				}
			})

			.addCase(handleRemove.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(handleRemove.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.alarms.filter((alarm) => alarm._id !== payload._id);
			})

			.addCase(changeAlarm.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changeAlarm.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const index = state.alarms?.findIndex((alarm) => alarm?._id === payload._id)
				state.alarms[index] = payload
			})

			.addCase(duplicateAlarmClock.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(duplicateAlarmClock.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.alarms.push(payload)
			})
	}
})





export default alarmSlice.reducer;