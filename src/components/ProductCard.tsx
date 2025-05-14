import { ShoppingCart } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

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
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-indigo-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transform active:scale-95 transition-all"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
