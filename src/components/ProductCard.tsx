import type { Product } from "../types/Product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition hover:scale-105 hover:shadow-purple-500/40 duration-300 h-full flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
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
            className="mt-2 inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            Ver produto
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
