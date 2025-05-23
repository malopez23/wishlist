import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";
import { Heart } from "lucide-react";
import { CirclePlus } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
        <Heart className="w-8 h-8 text-purple-600" />
          WishList
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
        >
          <CirclePlus className="w-4 h-4 mr-2" />
          Adicionar Produto
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ProductForm onAdd={handleAddProduct} />
      </Modal>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
