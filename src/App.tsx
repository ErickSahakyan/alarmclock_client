import React from 'react';
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from './pages/home/Home';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import ChangeAlarm from './pages/changeAlarm/ChangeAlarm';
import AddAlarm from './pages/addAlarm/AddAlarm';


function App() {
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
		</Box>
	);
}

export default App;