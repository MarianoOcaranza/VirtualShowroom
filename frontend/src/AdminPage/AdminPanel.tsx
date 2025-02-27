import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router";
import ProductForm from "./ProductForm";
import api from "../services/api";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}

const AdminPanel: React.FC = ()=> {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(()=> {
        const fetchProducts = async()=> {
            const response = await api.get('api/products/');
            setProducts(response.data);
        }
        fetchProducts()
    },[]);

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

    const handleCreate = (newProduct: Product) => {
        setProducts(prevProducts => [...prevProducts, newProduct])
    }

    const handleDelete = async(id: number)=> {
        try {
            await api.get('/api/auth/user/', {withCredentials: true});
            setIsAuthenticated(true);
            if(confirm('Estas seguro de que queres eliminar el producto?')) {
                await api.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}/delete/`, {
                    withCredentials: true
                })
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            } else {
                return
            }
        } catch(error){
            console.error('No autenticado: ', error);
            setIsAuthenticated(false);
            navigate('/login');
        }
    }

    if (isAuthenticated === null) {
        return <div>Cargando...</div>
    }
    const handleLogout = async ()=> {
        try {
            await api.post('api/auth/logout/');
            setIsAuthenticated(false);
            navigate('/login');
        } catch(error) {
            console.error('Error al cerrar sesion ', error);
        }
    };

    
    return(
        <div className=''>
            <div className="flex justify-center m-5 gap-5">
                <p className='text-3xl font-bold'>Panel de Administración</p>
                <button className='p-3 bg-gray-300 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'
                onClick={handleLogout}>Logout</button>
            </div>
            <ProductList products={products} handleDelete={handleDelete}/>
            <ProductForm onProductCreated={handleCreate}/>
        </div>
    )
}

export default AdminPanel