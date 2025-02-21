import { useEffect, useState } from "react";
import Product from "../ProductsPage/Product";
import axios from "axios";

interface ImageProps {
    id: number;
    image: string;
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

const FeaturedProducts: React.FC = ()=> {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const getProducts = async ()=> {
            setLoading(true)
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/featured`
                const { data } = await axios.get(url);
                setProducts(data)
            } catch (error) {
                console.log('error con productos destacados', error)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [])

    return(
        <>
        <p>
            {loading ? 'cargando...' : ''}
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
            {products.map((product)=> (
                <Product key={product.id} product={product}/>
            ))}
        </div>  
        </>
    )
}


export default FeaturedProducts