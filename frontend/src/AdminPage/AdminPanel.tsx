import React, { useEffect } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router";
import ProductForm from "./ProductForm";
import {api, adminApi} from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./store/authStore";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}
const fetchProducts = async ()=> {
    const response = await api.get('products/')
    return response.data;
}

const AdminPanel: React.FC = ()=> {
    const navigate = useNavigate()
    const {isAuthenticated, checkAuth, logout} = useAuthStore();
    const queryClient = useQueryClient()

    const {data: products, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        enabled: isAuthenticated === true,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number)=> {
            await adminApi.delete(`products/${id}/delete/`, {
                withCredentials: true
            })
        },
        onMutate: (id: number)=> {
            const previousProducts = queryClient.getQueryData<Product[]>(['products']);
            if (previousProducts) {
                queryClient.setQueryData(
                    ['products'],
                    previousProducts.filter(product => product.id !== id)
                );
            }
        }
    })

    const handleLogout = async()=>{
        await logout()
        navigate('/login')
    }
    
    useEffect(() => {
        if (isAuthenticated === null) {
            checkAuth();
        }
    }, [isAuthenticated, checkAuth]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }

    
    return(
        <div className=''>
            <div className="flex justify-center m-5 gap-5">
                <p className='text-3xl font-bold'>Panel de Administración</p>
                <button className='p-3 bg-gray-300 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'
                onClick={handleLogout}>Logout</button>
            </div>
            {isLoading ? <p>Cargando productos...</p> : <ProductList products={products || []} handleDelete={(id) => deleteMutation.mutate(id)} />}
            <ProductForm />
        </div>
    )
}

export default AdminPanel