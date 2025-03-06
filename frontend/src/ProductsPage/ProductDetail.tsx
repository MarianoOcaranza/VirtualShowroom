import { useEffect, useState } from "react";
import { useParams } from "react-router"
import api from "../services/api";

interface ImageProps {
    id: number;
    image_url: string;
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

    //Llamada a la API para obtener el detalle de producto
    useEffect(()=> {
        const getProducts = async ()=> {
            try {
                const { data } = await api.get(`/api/products/${id}`, {withCredentials: false})
                setProduct(data);
            } catch (error) {
                console.log('Hubo un error al obtener el detalle del producto: ', error);
            }
        };
        getProducts()
    }, [id])

    //Efecto para cambiar las imagenes cada 2 segundos
    useEffect(()=> {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex+1) % product!.images.length)
        }, 2000)
        return ()=> clearInterval(interval);
    }, [product]);

    //Condicional necesario para manejar el asincronismo, esperar a que cargue el producto
    if (!product) {
        return <p>Cargando...</p>
    }
    return (
        <>
        <div className="w-full max-w-3xl gap-10 items-center mx-auto flex flex-col md:flex-row mt-10 mb-10">
            <img src={product.images[index].image_url} className='w-md md:w-1/2 h-96 flex object-cover shadow-lg overflow-hidden' alt="" />
            <div className='md:w-1/2 w-xs'>
                <p className='text-3xl font-bold'>{product.name}</p>
                <p className='text-xl font-extralight'>${product.price}</p>
                <p className='text-sm font-light mb-3 text-gray-800'>{product.description}</p>
                <p>Colores disponibles: {product.colors_available}</p>
                <p className='mb-4'>Talles disponibles: {product.sizes_available}</p>
                <div className='flex-col flex'>
                    <a  href='https://ig.me/m/_clothesempty' target="_blank" rel="noopener noreferrer" className='bg-black text-gray-200 p-4 mb-4 font-bold hover:text-black hover:bg-gray-200 text-center cursor-pointer transition-all duration-300'>Consultar por el producto!</a>
                    <a className='p-3 w-fit bg-gray-200 mb-4 hover:bg-gray-500 hover:text-white transition-all duration-300' href="/products">...Volver al showroom</a>
                </div>
                <section className=''>
                    <h1 className='font-bold text-xl'>Envíos 📦</h1>
                    <p>-Puntos de encuentro lunes a sábado (10hs-18hs)</p>
                    <p>-Envíos desde el correo argentino a cualquier parte del país</p>
                    <p></p>
                    <h1 className='font-bold text-xl'>Medios de pago</h1>
                    <p>Transferencias + 5%IVA o efectivo </p>
                    <a href="/about" className='underline flex mt-3'>¿Tenes alguna consulta? visitá nuestra sección de consultas o contactate con nosotros</a>
                </section>      
            </div>
        </div>
        </>
    )
}

export default ProductDetail