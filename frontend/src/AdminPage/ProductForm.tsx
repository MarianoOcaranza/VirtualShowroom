import React, { useState } from "react"
import api from "../services/api";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}

const ProductForm = ({onProductCreated}: { onProductCreated: (product: Product)=> void})=>{
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '', 
        category: '',
        sizes_available: '',
        colors_available: '',
        is_featured: false,
        images: [] as File[],
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
        });
      };
      
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = [...formData.images, ...newFiles];
    
            if (totalFiles.length > 6) {
                alert("Solo podes subir un máximo de 6 imágenes");
                return;
            }
    
            setFormData({ ...formData, images: totalFiles });
        }
    };
    

      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        const toSend = new FormData();
        toSend.append('name', formData.name);
        toSend.append('description', formData.description)
        toSend.append('price', formData.price)
        toSend.append('category', formData.category)
        toSend.append('sizes_available', formData.sizes_available)
        toSend.append('colors_available', formData.colors_available)
        toSend.append('is_featured', String(formData.is_featured))
        formData.images.forEach((file)=> toSend.append('uploaded', file))

        try {
            const response = await api.post(`/api/products/create/`, toSend, {withCredentials: true});
            if (response.status == 201) {
                const newProduct = response.data
                onProductCreated(newProduct)
                alert('Producto creado exitosamente!') 
                
            }
        } catch (error) {
            console.error("Hubo un error", error)
        }
      }

    return (
        <div className='mt-5 mb-5'>
            <form className="flex flex-col w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
            onSubmit={handleSubmit}>
                <p className="text-2xl font-semibold text-gray-800 text-center">Crear producto nuevo</p>
                
                <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />

                <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />

                <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />

                <select className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Selecciona una categoría</option>
                    <option value="Remeras">Remeras</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Musculosas">Musculosas</option>
                    <option value="Buzos">Buzos</option>
                </select>

                <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text" name="sizes_available" placeholder="Tamaños (Ej: S, M)" value={formData.sizes_available} onChange={handleChange} required />

                <input className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text" name="colors_available" placeholder="Colores (Ej: Negro, Gris)" value={formData.colors_available} onChange={handleChange} required />

                <label htmlFor='imageinput' className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-indigo-600 font-medium cursor-pointer hover:bg-indigo-100 transition">
                    Click aquí para subir imágenes
                    <input id='imageinput' className="hidden" type="file" multiple accept="image/*" onChange={handleFileChange} required />
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" 
                        type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                    <span className="text-gray-700">Destacar Producto</span>
                </label>

                <button className="bg-indigo-600 cursor-pointer text-white font-semibold rounded-md py-2 hover:bg-indigo-700 transition-all duration-300"
                        type="submit">
                    Crear Producto
                </button>
            </form>
        </div>
    )
}

export default ProductForm