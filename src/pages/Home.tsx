import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";

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
        <h2 className="text-3xl font-bold text-white">Minha Lista de Desejos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
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
