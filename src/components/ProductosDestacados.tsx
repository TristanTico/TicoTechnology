import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./Loading-skeleton/SkeletonCard";
import { CategoriesHome } from "./CategoriesHome";
import { ProductCart, ProductoConSubcategoria } from "@/types/types";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";

export const ProductosDestacados = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const fetchProductsHome = useProductStore((state) => state.fetchProductsHome);
  const productsHome = useProductStore((state) => state.productsHome);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchProductsHome();
      } catch {
        setError("Ocurrió un error al cargar los productos.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: ProductoConSubcategoria | ProductCart) => {
    const cleanProduct =
      "subcategorias" in product
        ? { ...product, subcategorias: undefined }
        : product;

    addToCart(cleanProduct);
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  if (loading) return <SkeletonCard />;
  if (error)
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );

  const categories = ["teclados", "laptops"];
  const destacados = productsHome?.ProductosDestacados || [];
  const porSubcategoria = productsHome?.ProductosPorSubcategoria || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Productos Destacados
          </h1>
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center cursor-pointer"
          >
            {showMore ? "Ver Menos" : "Ver Más"}
            <ChevronRight className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {(showMore ? destacados : destacados.slice(0, 5)).map((product) => (
            <ProductCard
              key={product.productos_id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {categories.map((category) => {
        const title = capitalize(category);
        const products = porSubcategoria[title] || [];
        return (
          <CategoriesHome
            key={category}
            title={category}
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
};
