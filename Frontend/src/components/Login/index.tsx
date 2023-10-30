import { TextField } from '@mui/material'
import { useState } from "react"
import * as S from './styles'

const Login = () => {
    const [modalIsOpen, setIsOpen] = useState(false)

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
                <h1>Cadastro</h1>
                <TextField id="outlined-basic" label="Nome" variant="outlined" />
                <TextField id="outlined-basic" label="Senha" variant="outlined" />
                <S.BotaoLogar>Logar</S.BotaoLogar>
                <p>Esqueceu a senha?</p>
                <p>Não possuí uma conta? <span>Criar Conta</span></p>
            </S.ModalStyleLogin>
        </>
    )
}

export default Login