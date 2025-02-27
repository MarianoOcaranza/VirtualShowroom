import React from "react";
import { useNavigate } from "react-router";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}

interface Props {
    products: Product[];
    handleDelete: (id: number)=> void
}


const ProductList: React.FC<Props> = ({products, handleDelete})=> {
    const navigate = useNavigate()
    return( 
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <ul className="w-full">
                <li className="flex items-center justify-between bg-gray-800 text-white font-semibold py-3 px-4 rounded-t-lg">
                <p className="w-1/3 text-center">Nombre</p>
                <p className="w-1/3 text-center">Precio</p>
                <p className="w-1/3 text-center">Gestionar</p>
            </li>
            
                {products.map((product, index) => (
                    <li key={product.id} className={`flex items-center justify-between py-3 px-4 text-gray-800 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        <p className="w-1/3 text-center font-medium">{product.name}</p>
                        <p className="w-1/3 text-center font-semibold">${product.price}</p>
                        <div className="w-1/3 flex justify-center gap-2">
                            <button 
                                className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-300" 
                                onClick={() => handleDelete(product.id)}>
                                Eliminar
                            </button>
                            <button 
                                className="bg-indigo-500 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-indigo-700 transition-all duration-300" 
                                onClick={() => navigate(`/edit/${product.id}`)}>
                                Editar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}

export default ProductList