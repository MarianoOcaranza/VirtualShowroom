import { useRef, useState } from "react";
import { useNavigate } from "react-router";

interface ImageProps {
    id: number;
    image_url: string;
}
interface ProductProps {
    id: number;
    name: string;
    price: number;
    images: ImageProps[];
    category: string;
    colors_available: string;
    sizes_available: string;
}

const Product: React.FC<{product: ProductProps}> = ({product}) => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)
    const intervalRef = useRef<number | null>(null);


    //Cambiar imagenes cuando se pose el mouse encima
    const handleHover = ()=> {
        //Reiniciar el intervalo cada vez que se ponga el mouse encima
        if (intervalRef.current !== null) return;
        //Cambiar imagenes cada 1 segundo
        intervalRef.current = window.setInterval(()=> {
            setIndex((prevIndex)=> (prevIndex + 1) % product.images.length)
        }, 1000);
    };

    //Volver a la primera imagen cuando se quita el mouse
    const handleMouseLeave = ()=> {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIndex(0);
    }

    //Navegar al detalle del producto
    const handleClick = ()=> {
        navigate(`/products/${product.id}`)
    }

    return (
        <div 
        className="relative w-64 h-96 cursor-pointer rounded-lg shadow-lg overflow-hidden bg-white transition-transform hover:scale-105"
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        {/* Contenedor de la Imagen */}
        <div className="w-full h-2/3">
          <img src={product.images[index]?.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>
      
        {/* Contenedor de la Información */}
        <div className="absolute bottom-0 w-full bg-white p-3 border-t border-gray-200">
          <p className="text-lg font-semibold text-gray-700 text-center">{product.name}</p>
          <p className="text-md text-gray-600 text-center">${product.price}</p>
      
          <div className="mt-2 text-xs text-gray-500 text-center">
            <p><span className="font-medium">Categoría:</span> {product.category}</p>
            <p><span className="font-medium">Colores:</span> {product.colors_available}</p>
            <p><span className="font-medium">Talles:</span> {product.sizes_available}</p>
          </div>
        </div>
      </div>
      
    )
}

export default Product