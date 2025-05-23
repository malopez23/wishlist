import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/mockProducts";

const Home = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mockProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Home;
