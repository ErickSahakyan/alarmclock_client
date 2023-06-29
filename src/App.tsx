import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from './pages/home/Home';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import ChangeAlarm from './pages/changeAlarm/ChangeAlarm';
import AddAlarm from './pages/addAlarm/AddAlarm';
import { useAppDispatch } from './toolkit/store';
import { getMe } from './toolkit/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])


	return (
		<Box>
			<Router>
				<Routes>
					<Route path="/" element={
						<Home />
					}
					/>
					<Route path="/newAlarm" element={
						<AddAlarm />
					} />
					<Route path="/:id" element={
						<ChangeAlarm />
					} />
					<Route path="/register" element={
						<Registration />
					} />
					<Route path="/login" element={
						<Login />
					} />
					{/* <Route path="/view/:id" element={
						<ViewAlarmClock
							stopAudio={stopAudio}
							playAudio={playAudio}
						/>
					} />
					<Route path="/stopwatch" element={
						<Timer />
					} /> */}
				</Routes>
			</Router>
			<ToastContainer position='bottom-center' />
		</Box>
	);
}

export default App;