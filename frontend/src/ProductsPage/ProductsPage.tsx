import {useState } from "react";
import Selector from "./Selector"
import Product from "./Product";
import {api} from "../services/api";
import {useQuery} from '@tanstack/react-query'

interface ImageProps {
    id: number;
    image_url: string;
}
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: ImageProps[];
    category: string;
    colors_available: string;
    sizes_available: string;
}

const getProducts = async(category: string): Promise<Product[]> => {
    const endpoint = category === "Todo" ? "products/" : `products/?category=${category.toLowerCase()}`
    const {data} = await api.get(endpoint)
    return data
}

const ProductsPage: React.FC = ()=> {
    const [category, setCategory] = useState('Todo');

    const {data: products = [], isLoading} = useQuery<Product[]>({
        queryKey: ["products", category],
        queryFn: ()=> getProducts(category),
        staleTime: 1000*60*5,
    })
    
    return (
    <>
        <Selector onSelectCategory={setCategory}/>
        {isLoading ?  
        <div className='flex gap-4 justify-center flex-wrap'>
            <p>Cargando productos...</p>
        </div>  : ''}
        <div className='flex gap-4 mt-5 mx-5 justify-center flex-wrap'>
            {products.map((product)=> (
                <Product key={product.id} product={product}/>
            ))}
        </div>        
    </>
    )
}


export default ProductsPage