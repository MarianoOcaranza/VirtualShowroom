import Product from "../ProductsPage/Product";
import {api} from "../services/api";
import { useQuery } from "@tanstack/react-query";

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

const getFeaturedProducts = async() => {
    const {data} = await api.get(`products/featured`)
    return data;
}
const FeaturedProducts: React.FC = ()=> {

    const { data: products = [], isLoading } = useQuery<Product[]>({
        queryKey: ['featuredProducts'], 
        queryFn: () => getFeaturedProducts(), 
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: false,
        refetchOnWindowFocus: false,
    });

    return(
        <>
        {isLoading ?  
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