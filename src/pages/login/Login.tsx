import React, { FC, ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, FormControl, FormLabel, Grid, IconButton, Typography } from '@mui/material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Input from '@mui/joy/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useToolkit';
import { toast } from 'react-toastify'
import { loginUser, signInFacebook, signInGoogle } from '../../toolkit/slices/authSlice';
import { useAppDispatch } from '../../toolkit/store';
import GoogleIcon from '../../image/7611770.png';
import FacebookIcon from '../../image/Facebook_f_logo_(2021).svg.png';


const Login: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [visibility, setVisibility] = useState<boolean>(true)


	const dispatch = useAppDispatch()

	const isAuth = useAppSelector(state => state.auth.token)
	const { status } = useAppSelector(state => state.auth)
	const navigate = useNavigate()


	useEffect(() => {
		if (status) {
			toast(status)
		}
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth, status, navigate])

	const handleGoogle = () => {
		try {
			dispatch(signInGoogle())
		} catch (error) {
			console.log(error)
		}
	}

	const handleFacebook = () => {
		try {
			dispatch(signInFacebook())
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	const authUser = () => {
		dispatch(loginUser({ email, password }))
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
								<Typography sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2 }}>Авторизация</Typography>
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
									onClick={authUser}
								>
									Войти
								</Button>
								<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
									<Link to='/register' style={style.link}>Нет аккаунта?</Link>
									<Link to='/reset' style={style.link}>Сбросить пароль?</Link>
								</Box>
							</Grid>
							<Box sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								minWidth: '100%',
								mt: 3,
								gap: '10px'
							}}>
								<Button 
									sx={{
										width: '150px',
										height: '50px',
										border: '1px solid black',
									}}
									onClick={handleGoogle}										
									>
									<img src={GoogleIcon} alt='@#$' style={{width: '35px', height: '35px'}}/>
									<Typography sx={{color: 'black', ml: 1, fontSize: 16}}>Google</Typography>
								</Button>
								<Button 
									sx={{
										border: '1px solid black',
										width: '150px',
										height: '50px',
									}}
									onClick={handleFacebook}
									> 
									<img src={FacebookIcon} alt='@#$' style={{width: '25px', height: '25px'}}/>
									<Typography sx={{color: 'black', ml: 1.5, fontSize: 16}}>Facebook</Typography>
								</Button>
							</Box>
						</Grid>
					</FormControl>
				</form>
			</CardContent>
		</Card>
	)
}

const style = {
	card: {
		width: '100%', height: '100vh' 
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

export default Login