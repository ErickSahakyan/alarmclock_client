// import moment from "moment";
import 'moment/locale/ru'
import { useEffect, useState } from "react";
import useSound from "use-sound";
import sound from '../sound/sound.mp3'
import { useSelector } from 'react-redux';
import moment from 'moment';


export default function useAlarmClock() {
    const [play, {stop}] = useSound(sound, { volume: 0.25 })
    const [open, setOpen] = useState(false);

    const data = useSelector(state => state.alarm)
    // const alarmClockDate = useSelector(state => state.alarm.alarmDate)
    const weekday = useSelector(state => state.weekday.weekday)


    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const alarmStop = () => {
        stop();
    }
    
    function alarmPlaySound () {
        play()
    }

    function alarmPlay(val){
        if(val.included){
            play();
            handleOpen();
        }
    }

    useEffect(() => {
        data.alarms?.forEach(val => {
            let mom = moment(val.time, "HH:mm").valueOf();
            let momDay = moment().format('ddd')
            let weekdayArray = [];
            weekday?.map(elem => elem.included ? weekdayArray.push(elem.weekdayName) : '')
            if(mom < Date.now()){
                mom += 86400000
            }
            if(weekdayArray.length === 0){
                weekdayArray.push(momDay)
            }
            if(val.condition) {
                const timeoutID = setTimeout(() => {
                    for(let day of weekdayArray){
                        if(mom < Date.now()){
                            if(momDay === day){
                                if(val.included){
                                    alarmPlay(val)
                                }
                            }
                        }
                    }
                }, mom - Date.now())
                return () => clearTimeout(timeoutID);
            }
        })
    }, [ data ]);

    return {
        open,
        alarmStop,
        handleClose,
        alarmPlaySound
    }
}