import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ChangeEvent, FC, useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '@mui/joy/Input';
import { useAppSelector } from '../../hooks/useToolkit'
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../toolkit/store';
import { createAlarm, duplicateAlarmClock } from '../../toolkit/slices/alarmSlice';



const NewAlarm: FC = () => {
	const [time, setTime] = useState<string>('10:00')
	const [text, setText] = useState<string>('')
	const [condition, setCondition] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl)


	const weekday = useAppSelector(state => state.weekday.weekday)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()



	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function onChangeTime(event: ChangeEvent<HTMLInputElement>) {
		setTime(event.target.value);
	};

	const handleCondition = () => {
		setCondition(!condition)
	}

	const duplicateAlarm = () => {
		try {
			dispatch(duplicateAlarmClock({ time, text, condition }))
			toast('Будильник успешно отдублирован!')
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddNewAlarm = () => {
		try {
			dispatch(createAlarm({ time, text, condition, weekday }))
			navigate('/')
			toast('Будильник успешно создан!')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={e => e.preventDefault()}>
			<Box sx={{
				flexGrow: 1,
				minWidth: '100vw'
			}}>
				{/* <Toaster /> */}
				<AppBar
					position="static"
					sx={{
						background: 'none',
						boxShadow: 'none'
					}}
				>
					<Toolbar
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
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
								}} >
								<ClearIcon
									sx={{
										color: 'white',
										fontSize: '1.5rem',
										mr: 12
									}}
								/>
							</IconButton>
						</Link>
						{/* <Link to={`/view/${id}`}>
                        <Button 
                            sx={{
                                color: 'white'
                            }}
                            onClick={() => playAudio()}
                        >
                            Просмотр
                        </Button>
                    </Link> */}
						{/* <LongMenu
							time={time}
							text={text}
							condition={condition}
						/> */}
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
										onClick={duplicateAlarm}
									>
										Дублировать
									</Button>
									{/* <Link to='/'>
                        <Button 
                            sx={{
                                color: 'white'
                            }}
                        >
                            Удалить
                        </Button>
                    </Link> */}
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={style.box3}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						mt: {
							xs: '2rem',
						}
					}}
				>
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
						onChange={onChangeTime}
						value={time}
					/>
					<Box sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2
					}}>
						<Typography sx={{ fontSize: '15px', color: 'white' }}>Включить?</Typography>
						<input
							onChange={handleCondition}
							checked={condition}
							type='checkbox'
							style={{ width: '20px', height: '20px', marginLeft: '20px' }}
						/>
					</Box>
					{/* <Weekday /> */}
					<Input
						sx={style.input}
						onChange={e => setText(e.target.value)}
						value={text}
						placeholder='Сообщение...'
						id="filled-basic"
					/>
					<Button sx={{ mt: 3 }} variant='contained' color='primary' onClick={handleAddNewAlarm}>Создать</Button>
				</Box>
			</Box>
		</form>
	)
}

const style = {
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


export default NewAlarm