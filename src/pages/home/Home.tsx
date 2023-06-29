import { AppBar, Box, Drawer, IconButton, Toolbar, Button, Divider, List, ListItem, ListItemButton, ListItemText, Typography, Popper } from '@mui/material'
import React, { FC, useState } from 'react'
import img from './../../image/img.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import TimerIcon from '@mui/icons-material/Timer';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import BackHandIcon from '@mui/icons-material/BackHand';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../hooks/useToolkit';
import { useAppDispatch } from '../../toolkit/store';
import { logout } from '../../toolkit/slices/authSlice';
import { toast } from 'react-toastify'


// interface HomeProps {
// 	playAudio: () => void
// }

const Home: FC = () => {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const isAuth = useAppSelector(state => state.auth.token)
	const data = useAppSelector(state => state.auth.user?.email)

	const handleLogout = () => {
		dispatch(logout())
		// dispatch(logout())
		window.localStorage.removeItem('token')
		navigate('/')
		toast('Выход из системы!')
	}

	return (
		<Box >
			<Box
				sx={{ flexGrow: 1, position: 'relative' }}
			>
				<AppBar position="static"
					sx={{
						background: 'none',
						boxShadow: 'none',
						position: 'absolute',
						zIndex: 1
					}}>
					<img
						style={{
							maxHeight: '150px',
							objectFit: 'cover',
						}}
						src={img}
						alt='#$'
					/>
					<Toolbar variant="dense"
						sx={{
							position: 'absolute',
							zIndex: 3
						}}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}>
							<MenuIcon
								sx={{
									color: 'white'
								}}
							/>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Box component="nav">
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
						}}
					>
						<Box
							onClick={handleDrawerToggle}
							sx={{
								textAlign: 'center',
								bgcolor: '#2e374a',
								height: '100%'
							}}>
							<Typography variant="h6" sx={{ my: 2, color: 'white' }}>
								Alarm Clock ESA
							</Typography>
							<Divider />
							{isAuth ? (
								<List >
									<ListItem
										disablePadding sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'flex-start',
											alignItems: 'flex-start'
										}}>
										<Link style={{ textDecoration: 'none' }} to={'/'}>
											<ListItemButton sx={{ textAlign: 'start' }}>
												<AccessAlarmIcon
													sx={{
														mr: 2,
														color: 'white'
													}}
												/>
												<ListItemText
													sx={{
														color: 'white'
													}}
												>
													Будильники
												</ListItemText>
											</ListItemButton>
										</Link>
										<Link style={{ textDecoration: 'none' }} to={'/stopwatch'}>
											<ListItemButton sx={{ textAlign: 'start' }}>
												<TimerIcon
													sx={{
														mr: 2,
														color: 'white'
													}}
												/>
												<ListItemText
													sx={{
														color: 'white'
													}}
												>
													Секундомер
												</ListItemText>
											</ListItemButton>
										</Link>
									</ListItem>
								</List>
							) : ''}
							<Divider />
							{isAuth ? (
								<Box sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignItems: 'center',
									mt: 2
								}}>
									<Typography sx={{ color: 'blue', fontSize: 14 }}> {data ? data : ''}</Typography>
									<Button sx={{ background: 'red', color: 'white' }} onClick={handleLogout}>Выйти</Button>
								</Box>
							) : <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Войти</Link>}
						</Box>
					</Drawer >
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					minHeight: {
						xs: '600px',
					},
				}}
			>
				{/* <AlarmCard
					playAudio={playAudio}
				/> */}
			</Box>
			<Box
				sx={{
					width: '100vw'
				}}
			>
				{isAuth ? (
					<PopupState variant="popper" popupId="demo-popup-popper">
						{(popupState) => (
							<>
								<IconButton
									{...bindToggle(popupState)}
									sx={{
										position: 'absolute',
										top: '92%',
										right: '3%',
										padding: 0,
										margin: 0,
										width: '50px',
										height: '50px',
										backgroundColor: '#20d6fa',
										'&:hover': {
											backgroundColor: '#20d6fa'
										}
									}}
								>
									{popupState.isOpen ? (
										<Link to={'/newAlarm'}>
											<Typography
												sx={{
													fontSize: '12px',
													bgcolor: '#2e374a',
													p: 1,
													borderRadius: '8%',
													color: 'white',
													position: 'absolute',
													right: '135%',
													'&:hover': {
														bgcolor: '#2e374a',
													}
												}}
											>
												Будильник
											</Typography>
											<AccessAlarmsIcon
												style={{
													color: 'black',
													backgroundColor: 'none',
													borderRadius: '50%',
													marginTop: '7px'
												}}
											/>
										</Link>
									) : (
										<AddCircleOutlineIcon
											style={{
												color: 'black',
											}}
										/>
									)}
								</IconButton>
								<Popper {...bindPopper(popupState)} transition>
									{({ TransitionProps }) => (
										<Fade {...TransitionProps} timeout={350}>
											<Paper sx={{
												background: 'none',
												display: 'flex',
												flexDirection: 'column-reverse'
											}}>
												<IconButton
													sx={{
														width: '150px',
														fontSize: '12px',
														bgcolor: '#2e374a',
														p: 1,
														borderRadius: '8%',
														color: 'white',
														position: 'absolute',
														bottom: '15%',
														right: '155%',
														'&:hover': {
															bgcolor: '#2e374a',
														}
													}}
												>
													Быстрый будильник
												</IconButton>
												<IconButton
													sx={{
														bgcolor: '#02416b',
														mb: 2,
														fontSize: '3rem',
														'&:hover': {
															backgroundColor: '#02416b'
														}
													}}
												>
													<FlashOnIcon
														style={{
															color: 'white',
															background: '#02416b',
														}}
													/>
												</IconButton>
												<IconButton
													sx={{
														fontSize: '12px',
														bgcolor: '#2e374a',
														p: 1,
														borderRadius: '8%',
														color: 'white',
														position: 'absolute',
														bottom: '65%',
														right: '155%',
														'&:hover': {
															bgcolor: '#2e374a',
														}
													}}
												>
													Напоминание
												</IconButton>
												<IconButton
													sx={{
														bgcolor: '#02416b',
														mb: 2,
														fontSize: '3rem',
														'&:hover': {
															backgroundColor: '#02416b'
														}
													}}
												>
													<BackHandIcon
														style={{
															color: 'white',
															background: '#02416b',
														}}
													/>
												</IconButton>
											</Paper>
										</Fade>
									)}
								</Popper>
							</>
						)}
					</PopupState>
				) : ''}
			</Box>
		</Box>
	)
}

export default Home