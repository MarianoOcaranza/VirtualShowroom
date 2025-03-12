import React, {useState } from "react"
import { useNavigate } from "react-router";
import { useAuthStore } from "./store/authStore";

const Login: React.FC = ()=> {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login, checkAuth} = useAuthStore()
    
    const handleLogin = async(e : React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            await login(username, password)
            console.log('login exitoso')
            await checkAuth()
            console.log('auth verificado')
            navigate('/admin')   
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: any) {
            setLoading(false);
            setError(true);
            if (error.message === 'Usuario no vendedor') {
                setErrorMessage('No es usuario vendedor!')
            } else if(error.message === 'Credenciales incorrectas') {
                setErrorMessage('No se encontro usuario con estas credenciales')
            } else {
                setErrorMessage('Error no conocido (unhandled). Contacta a su administrador!')
            }
        } finally {
            setLoading(false)
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