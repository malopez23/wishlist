import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";
import { Heart, CirclePlus, House } from "lucide-react";


const Home = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? product : p))
      );
      setEditingProduct(null);
    } else {
      setProducts(prev => [product, ...prev]);
    }
    setShowForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };



  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Heart className="w-8 h-8 text-purple-600" />
            WishList
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <House />
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
          >
            <CirclePlus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </button>
        </div>
      </div>

      <hr className="border-gray-700 mb-4" />

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingProduct(null); }}>
        <ProductForm
          onAdd={handleAddProduct}
          initialData={editingProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      </Modal>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
