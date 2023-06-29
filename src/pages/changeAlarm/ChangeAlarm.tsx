import React, { ChangeEvent, FC, useEffect, useState, MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from '../../hooks/useToolkit'
import ClearIcon from '@mui/icons-material/Clear';
import Input from '@mui/joy/Input';
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../toolkit/store';
import { changeAlarm, getAllAlarms, handleRemove } from '../../toolkit/slices/alarmSlice';


const ChangeAlarm: FC = () => {
	const [changeTime, setChangeTime] = useState<string>('')
	const [changeText, setChangeText] = useState<string>('')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	// const [time, setTime] = useState<string>(new Date().toLocaleDateString());

	const open = Boolean(anchorEl);
	const { id } = useParams()

	const dispatch = useAppDispatch()

	const alarms = useAppSelector(state => state.alarm.alarms)
	const weekday = useAppSelector(state => state.weekday.weekday)
	const currentAlarm = alarms?.find(el => el._id === id)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const removeAlarm = () => {
		dispatch(handleRemove({ id }))
	}

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setTime(new Date().toLocaleTimeString());
	// 	}, 1000);

	// 	return () => clearInterval(intervalId);
	// }, []);


	let time = changeTime;
	let text = changeText === '' ? currentAlarm?.text : changeText;
	let condition = currentAlarm?.condition

	useEffect(() => {
		dispatch(getAllAlarms())
	}, [dispatch])

	const updateAlarm = () => {
		dispatch(changeAlarm({ time, text, id, condition, weekday }))
	}

	const handleTime = (event: ChangeEvent<HTMLInputElement>) => {
		setChangeTime(event.target.value)
	}


	return (
		<>
			{/*NAVBAR */}
			<Box sx={{
				flexGrow: 1,
				minWidth: '100vw'
			}}>
				<AppBar
					position="static"
					sx={{
						background: 'none',
						boxShadow: 'none'
					}}>
					<Toolbar
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Link to={'/'}>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{
									mr: {
										xs: 2,
									},
									color: 'black',
								}}
							>
								<ClearIcon
									sx={{
										color: 'white',
										fontSize: '1.5rem',
										mr: 12
									}}
								/>
							</IconButton>
						</Link>
						<Link to={`/view/${id}`}>
							<Button
								sx={{
									color: 'white'
								}}
							// onClick={() => playAudio()}
							>
								Просмотр
							</Button>
						</Link>
						<div>
							<IconButton
								aria-label="more"
								id="long-button"
								aria-controls={open ? 'long-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-haspopup="true"
								onClick={handleClick}
							>
								<MoreVertIcon
									sx={{
										color: '#474747',
										fontSize: '28px'
									}}
								/>
							</IconButton>
							<Menu
								id="long-menu"
								MenuListProps={{
									'aria-labelledby': 'long-button',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								PaperProps={{
									style: {
										width: '20ch',
										backgroundColor: '#24334a',
										color: 'white',
										borderRadius: '5%',
									},
								}}
							>
								<MenuItem
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-start',
										alignItems: 'flex-start'
									}}
									onClick={handleClose}>
									<Button
										sx={{
											color: 'white'
										}}
									// onClick={duplicateAlarm}
									>
										Дублировать
									</Button>
									<Link to='/'>
										<Button
											sx={{
												color: 'white'
											}}
											onClick={removeAlarm}
										>
											Удалить
										</Button>
									</Link>
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</Box>
			{/*	CHange */}
			<Box sx={style.box3}>
				<Box
					sx={style.box1}>
					{/* <Box sx={style.box2}>
                    <Typography sx={{ fontSize: '15px', color: 'white' }}>Состояние будильника</Typography>
                    <input
                        value={included}
                        onChange={handleIncluded }
                        type='checkbox'
                        checked={included || currentAlarm.condition}
                        style={{marginLeft: '15px', width: '20px', height: '20px'}}
                    />
                </Box> */}
					<input
						style={{
							background: 'white',
							marginBottom: '20px',
							width: '120px',
							height: '40px',
							fontSize: '24px',
							paddingLeft: '10px',
							borderRadius: '5%'
						}}
						type='time'
						onChange={handleTime}
						value={changeTime === '' ? currentAlarm?.time : changeTime}
					/>
					{/* <Weekday /> */}
					<Input
						sx={style.input}
						placeholder='Сообщение...'
						id="filled-basic"
						value={changeText === '' ? currentAlarm?.text : changeText}
						onChange={e => setChangeText(e.target.value)}
					/>
					<Link to={'/'}>
						<Button sx={{ mt: 3 }} variant='contained' color='primary' onClick={updateAlarm}>Обновить</Button>
					</Link>
				</Box>
			</Box>
		</>
	)
}

const style = {
	box1: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		mt: {
			xs: '3rem',
		}
	},
	box2: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	box3: {
		mt: '8rem'
	},
	input: {
		color: 'black',
		bgcolor: 'none',
		width: {
			xs: '250px',
		},
		fontSize: {
			xs: 18,
		}
	}
}

export default ChangeAlarm