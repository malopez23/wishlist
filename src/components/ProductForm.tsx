import { useState } from "react";
import type { Product } from "../types/Product";
import { v4 as uuidv4 } from "uuid";
import { X, Save } from "lucide-react";

interface Props {
    onAdd: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onAdd }) => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        link: "",
        category: "Eletrônicos",
        priority: "Média",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            id: uuidv4(),
            name: form.name,
            price: parseFloat(form.price),
            description: form.description,
            imageUrl: form.imageUrl,
            link: form.link,
            category: form.category as Product["category"],
            priority: form.priority as Product["priority"],
            createdAt: new Date(),
        };

        onAdd(newProduct);
        setForm({
            name: "",
            price: "",
            description: "",
            imageUrl: "",
            link: "",
            category: "Eletrônicos",
            priority: "Média",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl space-y-4 max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold text-white">Adicionar Produto</h2>
            <hr className="border-gray-700 mb-4" />

            {/* Nome e Preço lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-300 mb-1 font-bold">Nome*</label>
                    <input id="name" className="input" name="name" placeholder="Ex: Playstation 5" value={form.name} onChange={handleChange} required />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-gray-300 mb-1 font-bold">Preço*</label>
                    <input id="price" className="input appearance-none" name="price" placeholder="R$ 0,00" type="number" value={form.price} onChange={handleChange} required />
                </div>
            </div>

            {/* Link do produto */}
            <div className="flex flex-col">
                <label htmlFor="link" className="text-gray-300 mb-1">Link do produto</label>
                <input id="link" className="input w-full" name="link" placeholder="Link do produto" value={form.link} onChange={handleChange} />
            </div>

            {/* URL da Imagem */}
            <div className="flex flex-col">
                <label htmlFor="imageUrl" className="text-gray-300 mb-1">URL da imagem</label>
                <input id="imageUrl" className="input w-full" name="imageUrl" placeholder="URL da imagem" value={form.imageUrl} onChange={handleChange} />
            </div>

            {/* Categoria e Prioridade lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="category" className="text-gray-300 mb-1">Categoria</label>
                    <select id="category" className="input" name="category" value={form.category} onChange={handleChange}>
                        <option>Eletrônicos</option>
                        <option>Moda</option>
                        <option>Casa</option>
                        <option>Esportes</option>
                        <option>Livros</option>
                        <option>Outros</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="priority" className="text-gray-300 mb-1">Prioridade</label>
                    <select id="priority" className="input" name="priority" value={form.priority} onChange={handleChange}>
                        <option>Alta</option>
                        <option>Média</option>
                        <option>Baixa</option>
                    </select>
                </div>
            </div>

            {/* Descrição */}
            <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-300 mb-1">Descrição</label>
                <textarea id="description" className="input w-full" name="description" placeholder="Descreva o produto..." value={form.description} onChange={handleChange} />
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gray-700 hover:bg-white transition hover:text-gray-900"
                // Adicione aqui a lógica de cancelar, se necessário
                >
                    <X className="w-5 h-5" />
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-800 transition"
                >
                    <Save className="w-5 h-5" />
                    Salvar
                </button>
            </div>

        </form>
    );
};

export default ProductForm;