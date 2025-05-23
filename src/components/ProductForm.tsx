// components/ProductForm.tsx
import { useState } from "react";
import type { Category, Product } from "../types/Product";
import { Save, X, Image as ImageIcon } from "lucide-react";

interface ProductFormProps {
    onAdd: (product: Product) => void;
    initialData?: Product | null;
    onClose: () => void;
}

const ProductForm = ({ onAdd, initialData, onClose }: ProductFormProps) => {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [price, setPrice] = useState(initialData?.price.toString() || "");
    const [imageUrl, setImage] = useState(initialData?.imageUrl || "");


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value);

    // Se quiser adicionar campos para link, category e priority:
    const [link, setLink] = useState(initialData?.link || "");
    const [category, setCategory] = useState<Category>(initialData?.category || "Outros");
    const [priority, setPriority] = useState(initialData?.priority || "Média");

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value);
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category);
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as "Alta" | "Média" | "Baixa");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            id: initialData?.id || crypto.randomUUID(),
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            link,         // Corrigido: usar o estado atual
            category,     // Corrigido: usar o estado atual
            priority,     // Corrigido: usar o estado atual
            createdAt: initialData?.createdAt || new Date(),
        };

        onAdd(newProduct);

        if (!initialData) {
            setName("");
            setDescription("");
            setPrice("");
            setImage("");
            setLink("");         // Corrigido: limpar campo link
            setCategory("Outros"); // Corrigido: resetar categoria
            setPriority("Média");  // Corrigido: resetar prioridade
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <><form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl space-y-4 max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold text-white">Adicionar Produto</h2>
            <hr className="border-gray-700 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-300 mb-1">Nome*</label>
                    <input id="name" className="input" name="name" placeholder="Ex: Playstation 5" value={name} onChange={handleNameChange} required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-gray-300 mb-1">Preço*</label>
                    <input id="price" className="input appearance-none" name="price" placeholder="R$ 0,00" type="number" value={price} onChange={handlePriceChange} required />
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="link" className="text-gray-300 mb-1">Link do produto</label>
                <input id="link" className="input w-full" name="link" placeholder="Link do produto" value={link} onChange={handleLinkChange} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="imageUrl" className="text-gray-300 mb-1">URL da imagem</label>
                <input
                    id="imageUrl"
                    className="input w-full"
                    name="imageUrl"
                    placeholder="URL da imagem"
                    value={imageUrl}
                    onChange={handleImageChange}
                    type="url"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="imageFile" className="text-gray-300 mb-1">Ou selecione uma imagem do seu dispositivo</label>
                <label
                    htmlFor="imageFile"
                    className="flex items-center gap-2 input w-full bg-gray-800 text-white cursor-pointer py-6 justify-center"
                    style={{ minHeight: "56px" }}
                >
                    <ImageIcon className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-400">Escolher imagem do dispositivo</span>
                    <input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {imageUrl && (
                <div className="flex justify-center my-2">
                    <img
                        src={imageUrl}
                        alt="Prévia"
                        className="max-h-32 rounded-lg border border-gray-700"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col flex-1">
                    <label htmlFor="category" className="text-gray-300 mb-1">Categoria</label>
                    <select
                        id="category"
                        className="input"
                        name="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option>Eletrônicos</option>
                        <option>Moda</option>
                        <option>Casa</option>
                        <option>Esportes</option>
                        <option>Livros</option>
                        <option>Outros</option>
                    </select>
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="priority" className="text-gray-300 mb-1">Prioridade</label>
                    <select
                        id="priority"
                        className="input"
                        name="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                    >
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-300 mb-1">Descrição</label>
                <textarea id="description" className="input w-full" name="description" placeholder="Descreva o produto..." value={description} onChange={handleDescriptionChange} />
            </div><div className="flex justify-end gap-4 mt-4">
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gray-700 cursor-pointer hover:bg-white transition hover:text-gray-900"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-purple-600 cursor-pointer hover:bg-purple-800 transition"
                >
                    <Save className="w-5 h-5" />
                    Salvar
                </button>
            </div>
        </form>
        </>
    );
};

export default ProductForm;
