import * as S from '../Login/styles'
import { TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from "react"
import { registerUser } from '../../services/api/userApi'

export type FormData = {
    name: string,
    email: string,
    password: string
}

const Cadastro = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await registerUser(formData)
            console.log('Usuário cadastrado com sucesso!', response)
        } catch (error) {
            console.log('Erro ao cadastrar o usuario', error)
        }
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <S.divBotao>
                <S.BotaoLogin onClick={openModal}>Cadastro</S.BotaoLogin>
            </S.divBotao>
            <S.ModalStyleLogin isOpen={modalIsOpen} onRequestClose={closeModal}>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>
                    <TextField value={formData.name} onChange={handleInputChange} name='name' type='text' id="outlined-basic" label="Nome" variant="outlined" />
                    <TextField value={formData.email} onChange={handleInputChange} name='email' type='email' id="outlined-basic" label="E-mail" variant="outlined" />
                    <TextField value={formData.password} onChange={handleInputChange} name='password' type='password' id="outlined-basic" label="Senha" variant="outlined" />
                    <S.BotaoLogar type='submit'>Cadastrar</S.BotaoLogar>
                </form>
            </S.ModalStyleLogin>
        </>
    )
}

export default Cadastro