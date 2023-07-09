import React, { FC, useState } from "react";
import { IAlarm } from "../../types/types";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'
import { useAppDispatch } from "../../toolkit/store";
import { duplicateAlarmClock, handleRemove } from "../../toolkit/slices/alarmSlice";
import { persistor } from '../../toolkit/store';




interface ILongMenuProps {
    val: IAlarm
    playAudio: () => void
}

const LongMenu: FC<ILongMenuProps> = ({val, playAudio}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch()


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let id = val?._id;
    const handleRemoveAlarm = () => {
        try {
            dispatch(handleRemove({id}))
            persistor.pause()
            persistor.flush().then(() => {
                return persistor.purge()
            })
        } catch (error) {
            console.log(error)
        }
    }

    let time = val?.time;
    let text = val?.text;
    let condition = val?.condition;
    const duplicateAlarm = () => {
        try {
            dispatch(duplicateAlarmClock({time, text, condition}))
        } catch (error) {
            console.log(error)
        }
    }
    

    const notifyDuplicate = () => toast('Будильник скопирован', {
        icon: '🔥',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
    const notifyDelete = () => toast('Будильник удалён', {
        icon: '🔥',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })

    return (
        <div>
        <Toaster/>
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
                    <Link to={{
                        pathname: `/${val?._id}`,
                    }}>
                        <Button
                            sx={{
                            color: 'white'
                        }}
                        >
                            Изменить
                        </Button>
                    </Link>
                    <Button 
                        sx={{
                            color: 'white'
                        }}
                        onClick={() => {
                            duplicateAlarm()
                            notifyDuplicate()
                        }}
                    >
                        Дублировать
                    </Button>
                    <Link to={`/view/${id}`}>
                        <Button 
                            sx={{
                                color: 'white'
                            }}
                            onClick={() => playAudio()}
                        >
                            Просмотр
                        </Button>
                    </Link>
                    <Button 
                        onClick={() => {
                            handleRemoveAlarm()
                            notifyDelete()
                        }}
                        sx={{
                            color: 'white'
                        }}
                    >
                        Удалить
                    </Button>
            </MenuItem>
        </Menu>
    </div>
    );
};

export default LongMenu;
