import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"

interface ProductDetailProps {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    sizes_available: string;
    colors_available: string;
    category: string;
    created_at: string;
}

const ProductDetail: React.FC = ()=> {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<ProductDetailProps | null>(null);

    useEffect(()=> {
        const getProducts = async ()=> {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`;
                const { data } = await axios.get(url)
                setProduct(data);
            } catch (error) {
                console.log('errorrrrrr', error);
            }
        };
        getProducts()
    }, [id])

    //Condicional necesario para manejar el asincronismo
    if (!product) {
        return <p>Cargando...</p>
    }
    return (
        <>
        <div className="flex">
            <img src={product.image} className='size-1/3' alt="" />
            <p>{product.name}</p>
        </div>
        </>
    )
}

export default ProductDetail