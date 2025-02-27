import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router";
import ProductForm from "./ProductForm";
import api from "../services/api";

const AdminPanel: React.FC = ()=> {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(()=> {
        const checkAuth = async()=> {
            try {
                await api.get('/api/auth/user/', {withCredentials: true});
                setIsAuthenticated(true);
            } catch(error) {
                console.error('No autenticado: ', error);
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate])

    const handleLogout = async ()=> {
        try {
            await api.post('api/auth/logout/');
            setIsAuthenticated(false);
            navigate('/login');
        } catch(error) {
            console.error('Error al cerrar sesion ', error);
        }
    };

    if (isAuthenticated === null) {
        return <div>Cargando...</div>
    }
    
    return(
        <div className=''>
            <div className="flex justify-center m-5 gap-5">
                <p className='text-3xl font-bold'>Panel de Administración</p>
                <button className='p-3 bg-gray-300 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'
                onClick={handleLogout}>Logout</button>
            </div>
            <ProductList/>
            <ProductForm/>
        </div>
    )
}

export default AdminPanel