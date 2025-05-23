import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
// import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";
import { Heart, CirclePlus, House, ShoppingCart, TrendingUp } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<string>("");
  const totalProducts = products.length;
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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

  const sortedProducts = [...filteredProducts];
  if (sortPrice === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortPrice === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

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

      <hr className="border-gray-700 mb-8" />

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
          className="p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
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
          className="p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
        >
          <option value="">Todas prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
        <select
          className="p-2 rounded-lg bg-gray-800 text-white cursor-pointer"
          value={sortPrice}
          onChange={e => setSortPrice(e.target.value)}
        >
          <option value="">Ordenar por preço</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Produtos à esquerda */}
        <div className="flex-1 min-w-0">
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
            <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-8">
              {sortedProducts.map(product => (
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

        {/* Card de resumo à direita */}
        <div className="w-full md:w-80">

          <div className="rounded-2xl bg-gradient-to-br from-purple-900 to-gray-900 text-white p-6 shadow-[0_0_15px_rgba(168,85,247,0.3)] border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">Total da Lista</span>
              <span className="bg-purple-800/60 rounded-full p-3">
                <ShoppingCart className="w-8 h-8" />
              </span>
            </div>

            <div className="text-3xl font-extrabold mb-2">
              R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>

            <div className="flex justify-between text-sm text-purple-100/80 mb-6 items-center">
              <div className="flex items-center">
                <ShoppingCart className="inline w-4 h-4 mr-1" />
                {totalProducts} itens
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                <TrendingUp className="inline w-4 h-4 mr-1"/>
                Valor médio<br />
                </div>
                <span className="font-bold justify-end text-center">
                  R$ {(totalProducts ? totalPrice / totalProducts : 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl py-3 font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar Novo Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;