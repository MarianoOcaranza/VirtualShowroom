import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import api from "../services/api";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sizes_available: string;
    category: string;
    is_featured: boolean;
    colors_available: string;
    images: { id: number; image: string }[];
}

const EditProduct = ()=>{
    const {id}  = useParams<{id: string}>();
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null);
    const [newImages, setNewImages] = useState<FileList | null>(null);

    //Para obtener el producto a editar
    useEffect(()=>{
        const getProduct = async()=> {
            try {
                const response = await api.get(`/api/products/${id}/`, {withCredentials: true})
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto ', error);
            }
        }
        getProduct();
    }, [id]);

    //Para manejar los cambios en el form y setearlo como propiedad del producto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (product) {
            setProduct({...product, [e.target.name]: e.target.value})
        }
    }

    //Se hace la llamada a la API para actualizar el producto
    const handleUpdate = async () => {
        try {
            await api.put(`api/products/${id}/update/`, product);
            navigate("/admin");
        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    };

    //Agregar imagenes (a traves de otra API para poder almacenar mas de una imagen por producto)
    const handleAddImages = async () => {
        if (!newImages) return;
        const formData = new FormData();
        for(const file of newImages) {
            formData.append("image", file);
        }
        try {
            await api.post(`api/products/${id}/images/add/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            window.location.reload(); // Recargar para ver las imágenes nuevas
        } catch (error) {
            console.error("Error al subir imágenes", error);
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (product?.images.length === 1) {
            alert("No podes eliminar la última imagen.");
            return;
        }
        if (!confirm('Seguro que queres eliminar la imagen?')) {
            return;
        }
        try {
            await api.delete(`api/images/${imageId}/delete/`);
            setProduct((prev) => prev ? { ...prev, images: prev.images.filter(img => img.id !== imageId) } : null);
        } catch (error) {
            console.error("Error al eliminar la imagen", error);
        }
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <div className='flex mt-5 mb-5 flex-col w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4'>
            <h1 className='text-xl font-bold text-center'>Editar Producto</h1>
            <input className='border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none' type="text" name="name" value={product.name} onChange={handleChange} />
            <textarea className='border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none' name="description" value={product.description} onChange={handleChange} />
            <input className='border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none' type="number" name="price" value={product.price} onChange={handleChange} />
            <button className='bg-green-400 text-white font-semibold rounded-md py-2 hover:bg-green-500 transition-all duration-300 cursor-pointer' onClick={handleUpdate}>Guardar Cambios</button>

            <h2 className='text-xl font-bold text-center'>Imágenes</h2>
            <div>
                {product.images.map((img) => (
                    <div className='flex h-[80px] gap-1 p-1 justify-center' key={img.id}>
                        <img src={img.image} alt="Producto" className=" h-full w-1/3 object-cover" />
                        <button className='bg-red-400 text-white font-semibold rounded-md py-2 hover:bg-red-500 transition-all duration-300 cursor-pointer' onClick={() => handleDeleteImage(img.id)}>Eliminar</button>
                    </div>
                ))}
            {
                (newImages && newImages.length > 0) && 
                <div>
                    <p>Hay imagenes nuevas... Click en confirmar para subirlas</p>
                </div>
            }
            </div>
            <label htmlFor='imageinput' className='border border-gray-300 rounded-md px-4 py-2 w-full text-center text-indigo-600 font-medium cursor-pointer hover:bg-indigo-100 transition'>
            Subir nuevas imagenes<input id='imageinput' className='hidden' type="file" multiple onChange={(e) => setNewImages(e.target.files)} />
            </label>
            <button className='bg-green-400 text-white font-semibold rounded-md py-2 hover:bg-green-500 transition-all duration-300 cursor-pointer' onClick={handleAddImages}>Confirmar Imágenes</button>
        </div>
    );
}


export default EditProduct