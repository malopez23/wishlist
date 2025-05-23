import type { Product } from "../types/Product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition hover:scale-105 hover:shadow-purple-500/40 duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <p className="text-purple-400 text-lg font-semibold">
          R$ {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-300">{product.description}</p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Categoria: {product.category}</span>
          <span>Prioridade: {product.priority}</span>
        </div>
        <a
          href={product.link}
          target="_blank"
          className="inline-block mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full transition"
        >
          Ver produto
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
