import { useEffect, useState } from "react";
import Product from "../ProductsPage/Product";
import api from "../services/api";

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
                const { data } = await api.get('/api/products/featured');
                setProducts(data)
            } catch (error) {
                console.log('Error obteniendo los productos destacados: ', error)
            } finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [])

    return(
        <>
        {loading ?  
        <div className='flex gap-4 justify-center flex-wrap'>
            <p>Cargando productos...</p>
        </div>  : ''}
        <div className='flex gap-4 justify-center flex-wrap'>
            {products.map((product)=> (
                <Product key={product.id} product={product}/>
            ))}
        </div>  
        </>
    )
}


export default FeaturedProducts