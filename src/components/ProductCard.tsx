import { ShoppingCart } from "lucide-react";
import { RevealOnScroll } from "./Loading-skeleton/RevealOnScroll";

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <RevealOnScroll>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/${product.imagenPrincipal.replace(/\\/g, "/")}`}
            alt={product.nombreProducto}
            className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.nombreProducto}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-indigo-600">
                ${product.precioProducto}
              </span>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transform active:scale-95 transition-all"
              aria-label={`Add ${product.nombreProducto} to cart`}
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
