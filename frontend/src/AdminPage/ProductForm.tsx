import axios from "axios";
import React, { useState } from "react"


const ProductForm: React.FC = ()=>{
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
            const filesArray = Array.from(e.target.files);
            if (filesArray.length > 6) {
                alert("Solo podes subir 6 imagenes")
                return;
            }
            setFormData({ ...formData, images: filesArray })
        }
      }

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
            const token = localStorage.getItem('jwt_token');
            console.log(token)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/create/`, 
                toSend,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/formdata"
                },
            });
            if (response.status == 201) {
                alert('Producto creado exitosamente!')                
            }
        } catch (error) {
            console.error("Hubo un error", error)
        }
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Selecciona una categoría</option>
                    <option value="Remeras">Remeras</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Musculosas">Musculosas</option>
                    <option value="Buzos">Buzos</option>
                </select>
                <input type="text" name="sizes_available" placeholder="Tamaños (Ej: S, M)" value={formData.sizes_available} onChange={handleChange} required />
                <input type="text" name="colors_available" placeholder="Colores (Ej: Negro, Gris)" value={formData.colors_available} onChange={handleChange} required />
                <input type="file" multiple accept="image/*" onChange={handleFileChange} required />
                <label>
                Destacar Producto<input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                </label>
                <button type="submit">Crear Producto</button>
            </form>
    </div>
    )
}

export default ProductForm