import { FormData } from "../../components/Cadastro";
import { Credentials } from "../../components/Login";

const API_BASE_URL = 'http://localhost:3333'

export async function registerUser(userData: FormData) {
    try {
        const req = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })

        if (!req.ok) {
            throw new Error('Erro ao cadastrar o usuário')
        }

        return req.json()
    } catch (error) {
        throw error
    }
}

export async function loginUser(userCredentials: Credentials) {
    try {
        const req = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        })

        if (!req.ok) {
            throw new Error('Erro ao cadastar o usuário')
        }

        return req.json()
    } catch (error) {
        throw error
    }
}