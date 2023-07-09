import React, { FC, useState, useEffect } from 'react'
import { useAppSelector } from '../../hooks/useToolkit'
import { useAppDispatch } from '../../toolkit/store'
import { IAlarm } from '../../types/types'
import moment from 'moment'
import { handleCondition } from '../../toolkit/slices/alarmSlice'
import { Box, Card, CardContent, Typography } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CloseIcon from '@mui/icons-material/Close';
import { Switch } from '@mui/joy'
import LongMenu from './LongMenu'
import ModalWindow from '../../pages/modalWindow/ModalWindow'
import axios from '../../utils/axios'

interface AlarmCardProps {
	playAudio: () => void,
	open: boolean,
    alarmStop: () => void,
    handleClose: () => void,
    alarmPlaySound:() => void,

}


const AlarmCard: FC<AlarmCardProps> = ({playAudio, open, alarmStop, handleClose, alarmPlaySound}) => {
	const [alarms, setAlarms] = useState<IAlarm[]>([])
	const isAuth = useAppSelector(state => state.auth.token)
	const data = useAppSelector(state => state.alarm.alarms)
	const weekday = useAppSelector(state => state.weekday.weekday)
	const dispatch = useAppDispatch()

	const alarm = data.find(alarm => alarm.condition === true)
    let currentTime = moment(alarm?.time, 'HH:mm').valueOf();
	let timeNow = moment().valueOf()
    if (currentTime < timeNow) {
        currentTime += 86400000  
    }
    let differenceTime = currentTime - timeNow
    if (currentTime < timeNow) {
        currentTime += 86400000
    }
    let mm = moment.duration(differenceTime).minutes() < 10 ? '0' + moment.duration(differenceTime).minutes() : moment.duration(differenceTime).minutes();
    let hh = Math.trunc(moment.duration(differenceTime).asHours()) === 0 ? '0' + Math.trunc(moment.duration(differenceTime).asHours()) : Math.trunc(moment.duration(differenceTime).asHours())
    let diffTime = hh + 'ч' + ' : ' + mm + 'м'

	const fetchMyAlarms = async () => {
        try {
            const { data } = await axios.get('alarm/alarms')
            setAlarms(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchMyAlarms()
    }, [alarms])

	return (
		<Box sx={style.box1}>
            <>
                {isAuth && alarm?.time ? (
                    <Typography
                        sx={{ color: 'white', fontSize: 12 }}
                    >
                        {`Следующий будильник через: ${diffTime}`}
                    </Typography>
                ) : (
                    <>
                        {!isAuth && <Typography sx={{ color: 'red', fontSize: 12 }}>Пожалуйста авторизуйтесь или создайте нового пользователя!</Typography>}
                        {isAuth && <Typography sx={{ color: 'white', fontSize: 12 }}>Активных будильник нет!</Typography>}
                    </>
                )}
            </>

            {isAuth && alarms?.map((val) => (
                <Box key={val?._id}>
                    <ModalWindow selectedTime={val?.time} timeText={val?.text ? val.text : ''} open={open} alarmStop={alarmStop} handleClose={handleClose} alarmPlaySound={alarmPlaySound} />
                    <Card
                        sx={style.card}
                    >
                        <CardContent sx={style.cardContent}>
                            <Switch
                                key={val?._id}
                                checked={val?.condition}
                                onClick={() => {
                                    let id = val?._id;
                                    let condition = val?.condition;
                                    dispatch(handleCondition({id, condition}))
                                }}
                                slotProps={{
                                    input: { 'aria-label': 'Dark mode' },
                                    thumb: {
                                        children: val?.condition ?
                                            <AccessAlarmIcon
                                                sx={{
                                                    color: 'black',
                                                    fontSize: '28px'
                                                }}
                                            /> :
                                            <CloseIcon
                                                sx={{
                                                    color: 'gray',
                                                    fontSize: '28px',
                                                }}
                                            />
                                    },
                                }}
                                sx={{
                                    width: 60,
                                    height: 34,
                                    mr: 2.5,
                                    '& .MuiSwitch-switchBase': {
                                        margin: 1,
                                        padding: 0,
                                        transform: 'translateX(6px)',
                                        '&.Mui-checked': {
                                            color: '#fff',
                                            transform: 'translateX(22px)',
                                            '& .MuiSwitch-thumb:before': {
                                            },
                                            '& + .MuiSwitch-track': {
                                                opacity: 1,
                                                backgroundColor: val?.condition ? 'blue' : 'gray',
                                            },
                                        },
                                    },
                                    '& .MuiSwitch-thumb': {
                                        backgroundColor: val?.condition ? '#02b2ed' : '#4a434a',
                                        width: 45,
                                        height: 45,
                                        borderRadius: '50%',
                                        '&:before': {
                                            content: "''",
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            left: 0,
                                            top: 0,
                                        },
                                    },
                                    '& .MuiSwitch-track': {
                                        width: 40,
                                        height: 25,
                                        borderRadius: 30 / 2,
                                        backgroundColor: val?.condition ? 'blue' : 'gray',
                                    },
                                }}
                            />
                            <Box >
                                <Typography
                                    sx={{
                                        color: val?.condition ? 'white' : '#474747',
                                        fontSize: '9px'
                                    }}
                                >
                                    {val?.text === null ? '' : val?.text}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: val?.condition ? 'white' : '#474747',
                                        fontSize: '24px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {val?.time === null ? '' : val?.time}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: val?.condition ? 'white' : '#474747',
                                        fontSize: '8px',
                                    }}>
                                    {weekday?.every(elem => elem.condition === true)
                                        ?
                                        'КАЖДЫЙ ДЕНЬ'
                                        :
                                        weekday?.map(elem => elem.condition === true ? elem.weekdayName.toUpperCase() + ', ' : '')}
                                </Typography>
                            </Box>
                            <Box sx={style.box3}>
                                <NotificationsIcon
                                    sx={{
                                        fontSize: '28px',
                                        color: val?.condition ? 'white' : '#474747',
                                        borderBottom: '2px solid',
                                        pb: 0.5,
                                        mt: 1.1,
                                        borderColor: val?.condition ? '#02b2ed' : '#474747'
                                    }}
                                />
                                <LongMenu
                                    val={val}
                                    // removeAlarmClock={removeAlarmClock}
                                    // alarms={alarms}
                                    // duplicateAlarmClock={duplicateAlarmClock}
                                    playAudio={playAudio}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
	)
}


const style = {
	box1: {
		mt: '10rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	box2: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#9da7ab',
		fontSize: {
			xs: '10px',
		},
	},
	text1: {
		color: 'white',
		fontSize: {
			xs: '12px',
		},
		ml: 1
	},
	text2: {
		color: 'red',
		textAlign: 'center',
		fontSize: {
			xs: '12px',
		},
		ml: 1,
		width: '200px'
	},
	card: {
		minWidth: '100vw',
		height: '100px',
		background: 'none',
		boxShadow: 'none',
		ml: 2
	},
	cardContent: {
		display: 'grid',
		gridTemplateColumns: '1.8fr 6fr 1fr',
	},
	box3: {
		display: 'flex',
		flexDirection: 'row'
	},
	textTime: {
		color: 'white',
		fontSize: {
			xs: '12px',
		},
		ml: 1
	},
	boxDifferenceTime: {
		color: '#9da7ab',
		fontSize: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
}

export default AlarmCard