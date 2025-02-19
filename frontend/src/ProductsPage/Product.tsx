import { useNavigate } from "react-router";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    colors_available: string;
    sizes_available: string;
}

const Product: React.FC<{product: ProductProps}> = ({product}) => {
    const navigate = useNavigate()

    const handleClick = ()=> {
        navigate(`/products/${product.id}`)
    }

    return (
        <div className='shadow-md p-3 cursor-pointer' onClick={handleClick}>
            <img src={product.image} alt="" />
            <p className='text-2xl text-center text-gray-700'>{product.name}</p>
            <p className='text-xl font-extralight'>${product.price}</p>
            <p className='mt-3 text-sm text-gray-500'>Categoría: {product.category}</p>
            <p className='text-sm text-gray-500'>Colores disponibles: {product.colors_available}</p>
            <p className='text-sm text-gray-500'>Talles disponibles: {product.sizes_available}</p>
        </div>
    )

}

export default Product