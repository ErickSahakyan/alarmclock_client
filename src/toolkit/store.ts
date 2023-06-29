import { configureStore, combineReducers } from "@reduxjs/toolkit";
import alarmSlice from './slices/alarmSlice';
import authSlice from "./slices/authSlice";
import weekdaySlice from "./slices/weekdaySlice";
import storage from 'redux-persist/lib/storage'
import { useDispatch } from "react-redux";


import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'




const rootReducer = combineReducers({
	alarm: alarmSlice,
	auth: authSlice,
	weekday: weekdaySlice
})

const persistConfig = {
	key: 'root',
	storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});


export const persistor = persistStore(store)
export default store;


export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch

// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slices/authSlice";
// import alarmSlice from "./slices/alarmSlice";


// const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         alarm: alarmSlice
//     }
// })

// export default store;