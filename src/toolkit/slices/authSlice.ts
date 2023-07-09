import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'
import { IUser } from "../../types/types";


type AuthState = {
	user: IUser | null,
	token: string | boolean | null,
	isLoading: boolean,
	status: string | null,
}

const initialState: AuthState = {
	user: null,
	token: null,
	isLoading: false,
	status: null
}


export const registerUser = createAsyncThunk<AuthState, { email: string, password: string }>(
	'auth/registerUser',
	async ({ email, password }) => {
		try {
			const { data } = await axios.post('/auth/registration', {
				email,
				password,
			})
			if (data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch (error) {
			console.log(error)
		}
	},
)

export const loginUser = createAsyncThunk<AuthState, { email: string, password: string }>(
	'auth/loginUser',
	async function ({ email, password }) {
		try {
			const { data } = await axios.post('/auth/authorization', {
				email,
				password,
			})
			if (data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch (error) {
			console.log(error)
		}
	},
)

export const getMe = createAsyncThunk<AuthState>(
	'auth/getMe',
	async () => {
		try {
			const { data } = await axios.get('/auth/user')

			return data
		} catch (error) {
			console.log(error)
		}
	},
)

export const resetPassword = createAsyncThunk<IUser, {email: string, password: string}>(
	'auth/resetPassword',
	async ({email, password}) => {
		try {
			const {data} = await axios.put('auth/reset', {
				email,
				password
			})

			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const findUser = createAsyncThunk<AuthState, { email: string }>(
	'auth/findUser',
	async function ({ email }) {
		try {
			const { data } = await axios.post('/auth/findUser', {email})
			return data
		} catch (error) {
			console.log(error)
		}
	},
)


export const signInGoogle = createAsyncThunk(
	'sigIn/signInGoogle',
	async () => {
		const {data} = await axios.get('/sign/google')
		return data
	}
)

export const signInFacebook = createAsyncThunk(
	'sigIn/signInFacebook',
	async () => {
		const {data} = await axios.get('/facebook')
		return data
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null
			state.token = null
			state.isLoading = false
			state.status = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.status = payload?.status
				state.user = payload?.user
				state.token = payload?.token
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.status = payload?.status
				state.user = payload?.user
				state.token = payload?.token
			})
			.addCase(getMe.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(getMe.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.status = null
				state.user = payload?.user
				state.token = payload?.token
			})

			.addCase(findUser.pending, (state) => {
				state.isLoading = true;
				state.status = null;
			})
			.addCase(findUser.fulfilled, (state, action) => {
				state.isLoading = true;
				state.status = null;
				state.user = action.payload?.user
			})
	}
})

export const checkIsAuth = (state: AuthState) => state.token

export const { logout } = authSlice.actions

export default authSlice.reducer;