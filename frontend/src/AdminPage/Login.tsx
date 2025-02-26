import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router";



const Login: React.FC = ()=> {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async(e : React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/`, {username, password});
            if(!response.data.is_vendedor) {
                setError(true)
                setErrorMessage('No es usuario vendedor!')
                setLoading(false)
            } else {
                const token = response.data.access;
                localStorage.setItem('jwt_token', token)
                setError(false)
                setLoading(false);
                navigate('/admin')
            }
        } catch(error) {
            console.error('Error', error);
            setLoading(false);
            setError(true);
            setErrorMessage('No se encontro usuario con estas credenciales')
        }
    }
    return (

        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className='font-bold'>Por favor, inicia sesion con una cuenta de vendedor/a</p>
            <form className='flex p-6 gap-2 shadow-md flex-col justify-center items-center'
            onSubmit={handleLogin}>
            <input
                className='border'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="border"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className='bg-gray-400 p-2 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer' type="submit">Login</button>
            <p className='text-red-500'>{error ? `${errorMessage}` : ''}</p>
            <p>{loading ? 'Cargando...' : ''}</p>
            </form>
        </div>
    )
}

export default Login