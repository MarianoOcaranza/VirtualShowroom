interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const Product: React.FC<{product: ProductProps}> = ({product}) => {
    return (
        <div>
            <img src={product.image} alt="" />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
        </div>
    )

}

export default Product