import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../services/api";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    is_featured: boolean;
    colors_available: string;
    sizes_available: string;
}

const createProduct = async (formData: FormData) => {
    const response = await adminApi.post("products/create/", formData, { withCredentials: true });
    return response.data
};

const ProductForm = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (newProduct) => {
            alert("Producto creado exitosamente!")
            queryClient.setQueryData(['products'], (oldData: Product[] | undefined)=> {
                return oldData ? [...oldData, newProduct] : [newProduct]
            })
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                sizes_available: "",
                colors_available: "",
                is_featured: false,
                images: [] as File[],
            })
        },
        onError: (error) => {
            console.error("Hubo un error", error);
        },
    });
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        sizes_available: "",
        colors_available: "",
        is_featured: false,
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
        });
    };

    // File change
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

    // Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.images.length == 0 ) {
            alert('No podes subir un producto sin imagenes!')
            return;
        }
        
        const toSend = new FormData();
        toSend.append("name", formData.name);
        toSend.append("description", formData.description);
        toSend.append("price", formData.price);
        toSend.append("category", formData.category);
        toSend.append("sizes_available", formData.sizes_available);
        toSend.append("colors_available", formData.colors_available);
        toSend.append("is_featured", String(formData.is_featured));

        formData.images.forEach((file) => toSend.append("uploaded", file));

        mutation.mutate(toSend);
    };

    return (
        <div className="mt-5 mb-5">
            <form
                className="flex flex-col w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
                onSubmit={handleSubmit}
            >
                <p className="text-2xl font-semibold text-gray-800 text-center">Crear producto nuevo</p>

                <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <select
                    className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Remeras">Remeras</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Musculosas">Musculosas</option>
                    <option value="Buzos">Buzos</option>
                </select>

                <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text"
                    name="sizes_available"
                    placeholder="Talles (Ej: S, M, Único)"
                    value={formData.sizes_available}
                    onChange={handleChange}
                    required
                />

                <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    type="text"
                    name="colors_available"
                    placeholder="Colores (Ej: Negro, Gris)"
                    value={formData.colors_available}
                    onChange={handleChange}
                    required
                />
                 <label className="flex items-center space-x-3 cursor-pointer">
                    <input className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" 
                        type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                    <span className="text-gray-700">Destacar Producto</span>
                </label>

                <label
                    htmlFor="imageinput"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-indigo-600 font-medium cursor-pointer hover:bg-indigo-100 transition"
                >
                    Click aquí para subir imágenes (Mínimo una, sino no se subirá el producto)
                    <input id="imageinput" className="hidden" name="images" type="file" multiple accept="image/*" onChange={handleFileChange} />
                    <div className="flex space-x-2 mt-2">
                        {formData.images.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                    </div>
                </label>

                <button
                    className="bg-indigo-600 disabled:bg-gray-400 cursor-pointer text-white font-semibold rounded-md py-2 hover:bg-indigo-700 transition-all duration-300"
                    type="submit"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Creando..." : "Crear producto"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;