import React, {
    FC,
    FormEvent,
    useState,
    ChangeEvent,
    useCallback,
} from "react";
import { useAppDispatch } from "../../toolkit/store";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Input from "@mui/joy/Input";
import axios from '../../utils/axios'
import { resetPassword } from "../../toolkit/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const ResetPassword: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [visibility, setVisibility] = useState<boolean>(true);
    const [visibilityConfirm, setVisibilityConfirm] = useState<boolean>(true);
    const [userF, setUser] = useState(null)


    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = ( event: ChangeEvent<HTMLInputElement> ) => {
        setConfirmPassword(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    const handleUserFind = async () => {
        try {
            const { data } = await axios.post('/auth/findUser', {email})
			setUser(data)
            if(data) {
                toast('Пользователь успешно найден!')
            } else {
                toast('Пользователь не найден!')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetPassword = async () => {
        try {
            dispatch(resetPassword({email, password}))
            navigate('/login')
            toast('Пароль успешно сброшен!')
        } catch (error) {
            console.log(error)
        }
    }

    const handleVisibilityConfirm = useCallback(() => {
        setVisibilityConfirm(!visibilityConfirm);
    }, [visibilityConfirm])

    const handleVisibility = useCallback(() => {
        setVisibility(!visibility);
    }, [visibility]);

    return (
        <Card sx={style.card}>
            <CardContent sx={style.cardContent}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Grid container spacing={1}>
                            <Grid sx={style.grid1} xs={12} sm={6} item>
                                <Typography
                                    sx={{ fontSize: "24px", fontWeight: "bold", mb: 2 }}
                                >
                                    Сброс пароля
                                </Typography>
                            </Grid>
                            <Grid sx={{ mb: 3 }} xs={12} item>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    value={email}
                                    onChange={onChangeEmail}
                                    type="email"
                                    placeholder="Введите E-mail"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            {userF && <>
                                <Grid sx={{ mb: 3 }} xs={12} item>
                                        <FormLabel>Пароль</FormLabel>
                                        <Input
                                            size="sm"
                                            startDecorator={<KeyRoundedIcon />}
                                            placeholder="Введите новый пароль"
                                            type={visibility ? "password" : "text"}
                                            endDecorator={
                                                <IconButton onClick={handleVisibility}>
                                                    <VisibilityRoundedIcon />
                                                </IconButton>
                                            }
                                            value={password}
                                            onChange={onChangePassword}
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid sx={{ mb: 3 }} xs={12} item>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <Input
                                            size="sm"
                                            startDecorator={<KeyRoundedIcon />}
                                            placeholder="Повторите пароль"
                                            type={visibilityConfirm ? "password" : "text"}
                                            endDecorator={
                                                <IconButton onClick={handleVisibilityConfirm}>
                                                    <VisibilityRoundedIcon />
                                                </IconButton>
                                            }
                                            value={confirmPassword}
                                            onChange={onChangeConfirmPassword}
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                            </>
                            }
                            <Grid sx={style.grid2} xs={12} item>
                                {userF === null ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUserFind}
                                    >
                                        Найти пользователя
                                    </Button>
                                ) : (
                                    
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={password !== confirmPassword || password === '' || confirmPassword === '' }
                                        onClick={handleResetPassword}
                                    >
                                        Изменить пароль
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

const style = {
    card: {
        width: "100%",
        height: "100vh",
    },
    cardContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
    },
    grid1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    grid2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
};

export default ResetPassword;
