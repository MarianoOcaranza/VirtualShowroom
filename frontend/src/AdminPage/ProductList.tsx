import React, { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}

const ProductList: React.FC = ()=> {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        const fetchProducts = async()=> {
            const response = await api.get('api/products/');
            setProducts(response.data);
        }
        fetchProducts()
    },[]);

    const handleDelete = async(id: number)=> {
        try {
            const token = localStorage.getItem('jwt_token')
            if (!token) {
                console.error('no hay token...')
                return;
            }
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));

        } catch(error){
            console.error(error)
        }
    }

    return( 
        <div className=''>
            <p>Lista de productos:</p>
            <ul className='flex flex-col m-10 gap-2'>
                {products.map(product => (
                    <li key={product.id} className='flex items-center gap-4 w-full justify-around bg-blue-300'>
                        {product.name}
                        <div className="flex gap-4">
                            <button className='bg-red-400 p-3 hover:bg-red-700 cursor-pointer' onClick={()=> handleDelete(product.id)}>Eliminar</button>
                            <button className='bg-indigo-400 p-3 hover:bg-indigo-700 cursor-pointer'>Editar</button>
                        </div>  
                    </li>
                ))}
            </ul>
        </div>
    )
    
}

export default ProductList