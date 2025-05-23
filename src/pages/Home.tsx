import { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setAutocomplete(
        products
          .map((product) => product.name)
          .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5)
      );
    } else {
      setAutocomplete([]);
    }
  };

  const handleAutocompleteClick = (name: string) => {
    setSearchTerm(name);
    setAutocomplete([]);
  };

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
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory ? product.category === filterCategory : true) &&
    (filterPriority ? product.priority === filterPriority : true)
  );

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

      <div className="flex gap-3 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          {autocomplete.length > 0 && (
            <ul className="absolute z-10 bg-gray-900 border border-gray-700 rounded-lg mt-1 w-full">
              {autocomplete.map((name: string, idx: number) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-600"
                  onClick={() => handleAutocompleteClick(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          className="p-2 rounded-lg bg-gray-800 text-white"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="">Todas categorias</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Roupas">Roupas</option>
          <option value="Decoração">Decoração</option>
          <option value="Esportes">Esportes</option>
          <option value="Livros">Livros</option>
          <option value="Outros">Outros</option>
        </select>
        <select
          className="p-2 rounded-lg bg-gray-800 text-white"
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
        >
          <option value="">Todas prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <hr className="border-gray-700 mb-4" />

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingProduct(null); }}>
        <ProductForm
          onAdd={handleAddProduct}
          initialData={editingProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      </Modal>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-60">
          <Heart className="text-gray-500 w-20 h-20" />
          <p className="text-gray-500 mt-8 text-xl font-bold">
            Ainda não existem produtos cadastrados
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;