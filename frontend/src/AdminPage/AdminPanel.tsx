import React, { useEffect } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router";
import ProductForm from "./ProductForm";

const AdminPanel: React.FC = ()=> {
    const token = localStorage.getItem('jwt_token');
    const navigate = useNavigate()

    useEffect(()=> {
        if (token == null) {
            navigate('/login')
        }
    }, [token, navigate])

    const handleLogout = ()=> {
        localStorage.removeItem('jwt_token')
        navigate('/login')
    }

    return(
        <div className=''>
            <div className="flex justify-center m-5 gap-5">
                <p className='text-3xl font-bold'>Admin panel</p>
                <button className='p-3 bg-gray-300 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'
                onClick={handleLogout}>Logout</button>
            </div>
            <ProductList/>
            <ProductForm/>
        </div>
    )
}

export default AdminPanel