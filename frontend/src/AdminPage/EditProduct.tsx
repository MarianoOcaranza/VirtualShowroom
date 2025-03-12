import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import {api, adminApi} from "../services/api";
import { useQuery } from "@tanstack/react-query";

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

const getProduct = async(id: string) => {
    const {data} = await api.get(`products/${id}`, {withCredentials: true})
    return data;
}

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [newImages, setNewImages] = useState<File[]>([]);
    
    // Crea estados locales para cada campo del formulario
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [sizesAvailable, setSizesAvailable] = useState<string>('');
    const [colorsAvailable, setColorsAvailable] = useState<string>('');
    const [isFeatured, setIsFeatured] = useState<boolean>(false);

    const { data: product } = useQuery<Product>({
        queryKey: ['productDetail', id],
        queryFn: () => getProduct(id!),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
        gcTime: 1000 * 60 * 10,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setSizesAvailable(product.sizes_available);
            setColorsAvailable(product.colors_available);
            setIsFeatured(product.is_featured);
        }
    }, [product]);

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

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('category', category);
        formData.append('sizes_available', sizesAvailable);
        formData.append('colors_available', colorsAvailable);
        formData.append('is_featured', String(isFeatured));

        newImages.forEach((file) => formData.append('uploaded', file));

        try {
            await adminApi.put(`products/${id}/update/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            alert("Producto actualizado correctamente");
            navigate("/admin");
            alert("Es posible que no veas los cambios hasta que actualices la pagina")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error al actualizar el producto", error.response.data);
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (product?.images.length === 1) {
            alert('No puedes eliminar la última imagen');
            return;
        }

        if (!confirm('Seguro que quieres eliminar la imagen?')) {
            return;
        }
        try {
            await adminApi.delete(`images/${imageId}/delete/`);
            alert('Imagen eliminada! Haz clic en Guardar Cambios');
        } catch (error) {
            console.error("Error al eliminar la imagen", error);
        }
    };

    if (!product) {
        return <p>Cargando...</p>;
    }

    return (
        <form className="flex flex-col w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4" onSubmit={handleUpdate}>
            <p className="text-2xl font-semibold text-gray-800 text-center">Editar Producto</p>

            <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)} // Actualiza el estado
                required
            />

            <textarea
                className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                name="description"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Actualiza el estado
                required
            />

            <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="number"
                name="price"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))} // Actualiza el estado
                required
            />

            <select
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Actualiza el estado
                required
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
                value={sizesAvailable}
                onChange={(e) => setSizesAvailable(e.target.value)} // Actualiza el estado
                required
            />

            <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                type="text"
                name="colors_available"
                placeholder="Colores (Ej: Negro, Gris)"
                value={colorsAvailable}
                onChange={(e) => setColorsAvailable(e.target.value)} // Actualiza el estado
                required
            />

            {/* Sección de imágenes actuales */}
            <h2 className="text-xl font-bold text-center">Imágenes actuales</h2>
            <div className="flex flex-wrap gap-2 justify-center">
                {product?.images.map((img) => (
                    <div className="flex flex-col items-center" key={img.id}>
                        <img src={img.image_url} alt="Producto" className="w-20 h-20 object-cover rounded" />
                        <button
                            className="bg-red-400 text-white font-semibold rounded-md py-1 px-2 mt-1 hover:bg-red-500 transition-all duration-300 cursor-pointer"
                            type="button"
                            onClick={() => handleDeleteImage(img.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            {/* Subir nuevas imágenes */}
            <label
                htmlFor="imageinput"
                className="border border-gray-300 rounded-md px-4 py-2 w-full text-center text-indigo-600 font-medium cursor-pointer hover:bg-indigo-100 transition"
            >
                Click aquí para subir nuevas imágenes
                <input id="imageinput" className="hidden" type="file" multiple accept="image/*" onChange={handleFileChange} />
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
                <input
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                    type="checkbox"
                    name="is_featured"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(!isFeatured)} // Actualiza el estado
                />
                <span className="text-gray-700">Destacar Producto</span>
            </label>

            <button
                className="bg-green-500 cursor-pointer text-white font-semibold rounded-md py-2 hover:bg-green-600 transition-all duration-300"
                type="submit"
            >
                Guardar cambios
            </button>
        </form>
    );
};

export default EditProduct