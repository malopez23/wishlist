import { Pencil, Trash } from "lucide-react";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition hover:scale-105 hover:shadow-purple-500/40 duration-300 h-full flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full aspect-[3/4] sm:aspect-[4/3] object-cover"
      />
      <div className="p-4 space-y-2 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <p className="text-purple-400 text-lg font-semibold">
          R$ {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-300">{product.description}</p>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Categoria: {product.category}</span>
            <span>Prioridade: {product.priority}</span>
          </div>
          <div>
          <a
            href={product.link}
            target="_blank"
            className="mt-2 inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition duration-300"
          >
            Ver produto
          </a>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-3">
          <button onClick={() => onEdit(product)} className="bg-gray-500 px-2 py-2 rounded-md cursor-pointer hover:bg-blue-500 transition duration-300" title="Editar">
            <Pencil className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(product.id)} className="bg-gray-500 px-2 py-2 rounded-md cursor-pointer hover:bg-red-500 transition duration-300" title="Excluir">
            <Trash className="w-5 h-5 cursor-pointer hover:" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
