import React, { FC, ChangeEvent, FormEvent, useCallback, useState, useEffect } from 'react'
import { Button, Card, CardContent, FormControl, FormLabel, Grid, IconButton, Typography } from '@mui/material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Input from '@mui/joy/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useToolkit';
import { toast } from 'react-toastify'
import { registerUser } from '../../toolkit/slices/authSlice';
import { useAppDispatch } from '../../toolkit/store';


const Registration: FC = () => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [visibility, setVisibility] = useState<boolean>(true)

	const dispatch = useAppDispatch()

	const { status } = useAppSelector(state => state.auth)
	const isAuth = useAppSelector(state => state.auth.token)
	const navigate = useNavigate()


	useEffect(() => {
		if (status) {
			toast(status)
		}
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth, status, navigate])

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	const createUser = () => {
		dispatch(registerUser({email, password}))
	}

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handleVisibility = useCallback(() => {
		setVisibility(!visibility)
	}, [visibility])


	return (
		<Card sx={style.card}>
			<CardContent sx={style.cardContent}>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<Grid container spacing={1}>
							<Grid sx={style.grid1} xs={12} sm={6} item>
								<Typography sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2 }}>Регистрация</Typography>
							</Grid>
							<Grid sx={{ mb: 3 }} xs={12} item>
								<FormLabel>
									Email
								</FormLabel>
								<Input
									value={email}
									onChange={onChangeEmail}
									type='email'
									placeholder='Введите E-mail'
									variant='outlined'
									fullWidth
									required
								/>
							</Grid>
							<Grid sx={{ mb: 3 }} xs={12} item>
								<FormLabel>
									Password
								</FormLabel>
								<Input size="sm"
									startDecorator={<KeyRoundedIcon />}
									placeholder="Введите Пароль"
									type={visibility ? 'password' : 'text'}
									endDecorator={
										<IconButton onClick={handleVisibility}>
											<VisibilityRoundedIcon />
										</IconButton>
									}
									value={password}
									onChange={onChangePassword}
									variant='outlined'
									fullWidth
									required
								/>
							</Grid>
							<Grid sx={style.grid2} xs={12} item>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									disabled={password === '' || email === ''}
									onClick={createUser}
								>
									Войти
								</Button>
								<Link to='/login' style={style.link}>Уже есть аккаунт?</Link>
							</Grid>
						</Grid>
					</FormControl>
				</form>
			</CardContent>
		</Card>
	)
}

const style = {
	card: {
		width: '100%', height: '100vh',
	},
	cardContent: {
		display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px'
	},
	grid1: {
		display: 'flex', justifyContent: 'center', alignItems: 'center'
	},
	grid2: {
		display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
	},
	link: {
		textDecoration: 'none', color: 'black'
	}
}

export default Registration