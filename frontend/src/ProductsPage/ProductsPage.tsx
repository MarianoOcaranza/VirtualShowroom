import { useEffect, useState } from "react";
import Selector from "./Selector"
import Product from "./Product";
import api from "../services/api";

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

const ProductsPage: React.FC = ()=> {
    const [category, setCategory] = useState('Todo');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);


    //Llamada a la API para obtener los productos
    useEffect(()=> {
        const getProducts = async ()=> {
            setLoading(true);
            try {
                let url = '/api/products';
                //Filtrar segun categoria seleccionada
                if (category !== 'Todo') {
                    url += `/?category=${category.toLowerCase()}`;
                }
                const { data } = await api.get(url, {withCredentials: false});
                setProducts(data);
            } catch (error) {
                console.log('Error obteniendo los productos: ', error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [category]);


    
    return (
    <>
        <Selector onSelectCategory={setCategory}/>
        {loading ?  
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