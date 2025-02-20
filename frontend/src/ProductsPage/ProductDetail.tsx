import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"

interface ImageProps {
    id: number;
    image: string;
}
interface ProductDetailProps {
    id: number;
    name: string;
    description: string;
    price: string;
    images: ImageProps[];
    sizes_available: string;
    colors_available: string;
    category: string;
    created_at: string;
}

const ProductDetail: React.FC = ()=> {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<ProductDetailProps | null>(null);
    const [index, setIndex] = useState(0)
    
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

    useEffect(()=> {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex+1) % product!.images.length)
        }, 3000)
        return ()=> clearInterval(interval);
    }, [product]);

    //Condicional necesario para manejar el asincronismo
    if (!product) {
        return <p>Cargando...</p>
    }
    return (
        <>
        <div className="w-full max-w-3xl gap-10 items-center mx-auto flex flex-col md:flex-row mt-10">
            <img src={product.images[index].image} className='w-md md:w-1/2 h-96 flex object-cover shadow-lg overflow-hidden' alt="" />
            <div className='w-1/2'>
                <p className='text-3xl font-bold'>{product.name}</p>
                <p className='text-xl font-extralight'>${product.price}</p>
                <p className='text-sm font-light mb-3 text-gray-800'>{product.description}</p>
                <p>Colores disponibles: {product.colors_available}</p>
                <p className='mb-4'>Talles disponibles: {product.sizes_available}</p>
                <button className='bg-black text-gray-200 p-4 mb-4 font-bold hover:text-black hover:bg-gray-200 cursor-pointer transition-all duration-300'>Consultar por el producto!</button>
                <p>Envíos y medios de pago</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae est explicabo laudantium consectetur sint reiciendis magnam. Ea vitae minus, sit asperiores quibusdam natus odit, at quos eveniet, error doloremque numquam.</p>
            </div>
        </div>
        </>
    )
}

export default ProductDetail