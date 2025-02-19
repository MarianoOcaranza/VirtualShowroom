import { useEffect, useState } from "react";
import Selector from "./Selector"
import Product from "./Product";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const ProductsPage: React.FC = ()=> {
    const [category, setCategory] = useState('Todo');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        console.log(category)
        const getProducts = async ()=> {
            setLoading(true);
            try {
                let url = `${import.meta.env.VITE_BACKEND_URL}/api/products`;
                if (category !== 'Todo') {
                    url += `/?category=${category.toLowerCase()}`;
                }
                const { data } = await axios.get(url);
                setProducts(data);
            } catch (error) {
                console.log('errorrrr: ', error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [category]);


    
    return (
    <>
        <Selector onSelectCategory={setCategory}/>
        <p>
            {loading ? 'cargando...' : ''}
        </p>
        <div>
            {products.map((product)=> (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    </>
    )
}


export default ProductsPage