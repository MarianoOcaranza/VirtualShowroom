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
    images: { id: number; image_url: string;}[];
}

const EditProduct = ()=>{
    const {id}  = useParams<{id: string}>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [newImages, setNewImages] = useState<File[]>([]);

    useEffect(()=>{
        const getProduct = async()=> {
            try {
                const response = await api.get(`/api/products/${id}/`, {withCredentials: true});
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto ', error);
            }
        };
        getProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (product) {
            setProduct({...product, [e.target.name]: e.target.value});
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (product) {
            setProduct({ ...product, is_featured: e.target.checked });
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = [...newImages, ...newFiles];

            if (totalFiles.length > 6) {
                alert("Solo puedes subir un máximo de 6 imágenes");
                return;
            }

            setNewImages(totalFiles);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('category', product.category)
        formData.append('sizes_available', product.sizes_available)
        formData.append('colors_available', product.colors_available)
        formData.append('is_featured', String(product.is_featured))

        newImages.forEach((file) => formData.append('uploaded', file));

        try {
            await api.put(`/api/admin/products/${id}/update/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            alert("Producto actualizado correctamente");
            navigate("/admin");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error al actualizar el producto", error.response.data);
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (product?.images.length == 1) {
            alert('No podes eliminar la ultima imagen')
            return
        }

        if (!confirm('Seguro que quieres eliminar la imagen?')) {
            return;
        }
        try {
            await api.delete(`/api/admin/images/${imageId}/delete/`);
            setProduct((prev) => prev ? { ...prev, images: prev.images.filter(img => img.id !== imageId) } : null);
        } catch (error) {
            console.error("Error al eliminar la imagen", error);
        }
    };

    if (!product) {
        return <p>Cargando...</p>
    }
    return (
        <form className="flex flex-col w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
            onSubmit={handleUpdate}>
            <p className="text-2xl font-semibold text-gray-800 text-center">Editar Producto</p>
            
            <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="text" name="name" placeholder="Nombre" value={product?.name} onChange={handleChange} required />

            <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                name="description" placeholder="Descripción" value={product?.description} onChange={handleChange} required />

            <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="number" name="price" placeholder="Precio" value={product?.price} onChange={handleChange} required />

            <select className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                name="category" value={product?.category} onChange={()=>handleChange} required>
                <option value="">Selecciona una categoría</option>
                <option value="Remeras">Remeras</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Musculosas">Musculosas</option>
                <option value="Buzos">Buzos</option>
            </select>

            <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="text" name="sizes_available" placeholder="Talles (Ej: S, M, Único)" value={product?.sizes_available} onChange={handleChange} required />

            <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="text" name="colors_available" placeholder="Colores (Ej: Negro, Gris)" value={product?.colors_available} onChange={handleChange} required />

            {/* Sección de imágenes existentes */}
            <h2 className="text-xl font-bold text-center">Imágenes actuales</h2>
            <div className="flex flex-wrap gap-2 justify-center">
                {product?.images.map((img) => (
                    <div className="flex flex-col items-center" key={img.id}>
                        <img src={img.image_url} alt="Producto" className="w-20 h-20 object-cover rounded" />
                        <button className="bg-red-400 text-white font-semibold rounded-md py-1 px-2 mt-1 hover:bg-red-500 transition-all duration-300 cursor-pointer"
                            type="button" onClick={() => handleDeleteImage(img.id)}>Eliminar</button>
                    </div>
                ))}
            </div>

            {/* Subir nuevas imágenes */}
            <label htmlFor='imageinput' className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-indigo-600 font-medium cursor-pointer hover:bg-indigo-100 transition">
                Click aquí para subir nuevas imágenes
                <input id='imageinput' className="hidden" type="file" multiple accept="image/*" onChange={handleFileChange} />
            </label>

            {/* Vista previa de nuevas imágenes */}
            {newImages.length > 0 && (
                <div className="flex space-x-2 mt-2">
                    {newImages.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                </div>
            )}

            {/* Checkbox para destacar el producto */}
            <label className="flex items-center space-x-3 cursor-pointer">
                <input className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                    type="checkbox" name="is_featured" checked={product?.is_featured !== undefined ? product.is_featured : false} onChange={handleCheckboxChange} />
                <span className="text-gray-700">Destacar Producto</span>
            </label>

        <button className="bg-green-500 cursor-pointer text-white font-semibold rounded-md py-2 hover:bg-green-600 transition-all duration-300"
            type="submit">
            Guardar Cambios
        </button>
    </form>

    );
}



export default EditProduct