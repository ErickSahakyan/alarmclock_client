import { Box, Button, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import img from './../../image/img.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import moon from './../../image/moon.png'
import { useAppSelector } from '../../hooks/useToolkit'

interface ViewAlarmClockProps {
    stopAudio: () => void,
    playAudio: () => void
}

const ViewAlarmClock: FC<ViewAlarmClockProps> = ({stopAudio, playAudio }) => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [show, setShow] = useState<boolean>(false);
    const data = useAppSelector(state => state.alarm)
    const currentAlarm = data.alarms.find((el) => el._id === id) 
    console.log(currentAlarm)

    const handleShow = () => {
        setShow(!show)
    }

    const handlePostponeCount = () => {
        setPostponeCount(postponeCount+=1)
    }


    let [durationTime, setDurationTime] = useState<number>(600000)

    let [postponeCount, setPostponeCount] = useState<number>(0)

    let mm = '0' + Math.floor((durationTime / 1000 / 60 ) << 0)
    let ss = Math.floor((durationTime / 1000 ) % 60)  < 10 ? '0' +  Math.floor((durationTime / 1000 ) % 60) :  Math.floor((durationTime / 1000 ) % 60)
    let time  = '0:' + mm + ':' + ss

    useEffect(() => {
        if(durationTime === 0) {
            handleShow();
            playAudio();
        } 
        const timerID = setTimeout(()=> {
            if(show === true) {
                setDurationTime(durationTime -= 1000)
            }
        }, 1000)
        return () => clearTimeout(timerID)
    }, [durationTime, postponeCount])


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <img
                style={{
                    minHeight: '100vh',
                    objectFit: 'cover',
                    zIndex: 0,
                    position: 'relative'
                }}
                src={img} 
                alt='#$'
            /> 
            <Typography
                sx={{
                    position:  'absolute',
                    zIndex: 1,
                    color: 'white',
                    top: '2%',
                    fontSize: 35,
                    fontWeight: 'bold'
                }}
            >
                {currentAlarm?.time}
            </Typography>
            
                {show ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                        }}
                    >
                        <img 
                            alt='#$@'
                            src={moon}
                            style={{
                                width: '120px',
                                height: '120px'
                            }}
                        />
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: 28,
                                ml: 1.5
                            }}
                        >
                            {time}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                opacity: 0.8,
                            }}
                        >
                            Отложено {postponeCount} раз
                        </Typography>
                    </Box>
                ) : (
                    <Button
                        sx={{
                            position: 'absolute',
                            width: '95vw',
                            height: '65vh',
                            bgcolor: 'rgba(128, 128, 128, 0.4)',
                            mt: -5,
                        }}
                        onClick={() => {
                            handleShow();
                            handlePostponeCount();
                            setDurationTime(600000)
                            stopAudio()
                        }}
                        >       
                        <Typography
                            sx={{
                                color: 'white',
                            }}
                        >
                            Отложить
                        </Typography>
                    </Button>
                )}
            <Button 
                sx={{
                    position: 'absolute',
                    top: '88%',
                    width: '95vw',
                    height: '50px',
                    bgcolor: 'rgba(128, 128, 128, 0.4)',
                    mt: -3
                }}
                onClick={()=> {
                    stopAudio();
                    navigate("/")
                }}
            >
                <Typography
                    sx={{
                        color: 'white',
                    }}
                >
                    Вернуться
                </Typography>
            </Button>
        </Box>
    )
}

export default ViewAlarmClock