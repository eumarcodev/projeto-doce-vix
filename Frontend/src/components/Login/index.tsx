import { TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { loginUser } from '../../services/api/userApi';
import * as S from './styles'

export type Credentials = {
    email: string;
    password: string;
};

const Login = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: '',
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await loginUser(credentials)

            if (response.token) {
                localStorage.setItem('authToken', response.token)
                console.log(response.token)
            }

            setIsAuthenticated(true)

            console.log(response)
            return response
        } catch (error) {
            console.log('Erro ao fazer Login: ', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <S.divBotao>
                <S.BotaoLogin onClick={openModal}>Login</S.BotaoLogin>
            </S.divBotao>
            <S.ModalStyleLogin isOpen={modalIsOpen} onRequestClose={closeModal}>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <TextField value={credentials.email} onChange={handleInputChange} name='email' type='email' id="outlined-basic" label="E-mail" variant="outlined" />
                    <TextField value={credentials.password} onChange={handleInputChange} name='password' type='password' id="outlined-basic" label="Senha" variant="outlined" />
                    <S.BotaoLogar type='submit'>Logar</S.BotaoLogar>
                    <p>Esqueceu a senha?</p>
                    <p>Não possuí uma conta? <span>Criar Conta</span></p>
                </form>
            </S.ModalStyleLogin>
            {isAuthenticated ? <h1>Bem-vindo</h1> : ''}
        </>
    )
}

export default Login