import { ChevronRight } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";

interface ProductCardProps {
  title: any;
  products: any;
  onAddToCart: (product: any) => void;
}
export const CategoriesHome: React.FC<ProductCardProps> = ({ title, products, onAddToCart }) => {
  
  return (
    <RevealOnScroll>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link
            to={`/category/${title}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
          >
            View {title}
            <ChevronRight className="ml-1 inline" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
};
