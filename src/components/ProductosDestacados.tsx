import { useState, useEffect } from "react";
import { RevealOnScroll } from "./RevealOnScroll";
import { ChevronRight } from "lucide-react";
import ASUS from "../assets/img/asus.jpg";
import MSI from "../assets/img/msi.jpg";
import GRAFICA from "../assets/img/grafica.jpg";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./SkeletonCard";
import { CategoriesHome } from "./CategoriesHome";
import { showToast } from "@/lib/showToast";
import { Product } from "@/types/types";

import img1 from "../assets/img/msi-cyborg-15-ai-a1vfk-intel-core-ultra-7-155h-16-gb-rtx-4060-144hz.jpg"
import img2 from "../assets/img/msi-vector-16-hx-ai-a2xwhg-ultra-7-255hx-rtx-5070-ti-16gb.jpg"
import img3 from "../assets/img/poco-f6-5g-8gb256gb-green.jpg"
import img4 from "../assets/img/gigabyte-b840m-aorus-elite-wifi6e.jpg"
import img5 from "../assets/img/samsung-s25-ultra-12-gb-512-gb-titanium-black-sm-s938b.jpg"


export const ProductosDestacados = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [cartCant, setCartCant] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Asegura que comience cargando
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "MSI Vector 16 HX AI A2XWHG - Ultra 7-255HX - RTX 5070 Ti - 16GB",
            price: 1999.99,
            originalPrice: 2399.99,
            discount: 15,
            category: "Computers",
            image: img1,
            inStock: true,
            quantity: 10,
          },
          {
            id: 2,
            name: "MSI Cyborg 15 AI A1VFK - Intel Core Ultra 7 155H - RTX 4060",
            price: 1099.99,
            category: "Electronics",
            image: img2,
            inStock: true,
            quantity: 10,
          },
          {
            id: 3,
            name: "POCO F6 5G 8GB+256GB - Green",
            price: 349.99,
            originalPrice: 399.99,
            discount: 10,
            category: "Accessories",
            image: img3,
            inStock: true,
            quantity: 10,
          },
          {
            id: 4,
            name: "Gigabyte B840M Aorus Elite WIFI6E",
            price: 899.99,
            category: "Electronics",
            image: img4,
            inStock: true,
            quantity: 10,
          },
          {
            id: 5,
            name: "Samsung s25 Ultra - 12 GB - 256 GB - Titanium Black- SM-S938B",
            price: 399.99,
            category: "Accessories",
            image: img5,
            inStock: true,
            quantity: 10,
          },
          {
            id: 6,
            name: "Dell XPS 15",
            price: 1799.99,
            category: "Computers",
            image: GRAFICA,
            inStock: true,
            quantity: 10,
          },
          {
            id: 7,
            name: "Samsung Galaxy S21",
            price: 799.99,
            category: "Electronics",
            image: MSI,
            inStock: true,
            quantity: 10,
          },
          {
            id: 8,
            name: "AirPods Pro",
            price: 249.99,
            category: "Accessories",
            image: GRAFICA,
            inStock: true,
            quantity: 10,
          },
          {
            id: 9,
            name: "Gaming PC",
            price: 2499.99,
            category: "Computers",
            image: ASUS,
            inStock: true,
            quantity: 10,
          },
          {
            id: 10,
            name: "Smart Watch",
            price: 199.99,
            category: "Accessories",
            image: MSI,
            inStock: true,
            quantity: 10,
          },
          {
            id: 11,
            name: "Sony WH-1000XM4",
            price: 349.99,
            originalPrice: 399.99,
            discount: 10,
            category: "Accessories",
            image: ASUS,
            inStock: true,
            quantity: 10,
          },
          {
            id: 12,
            name: "Sony WH-1000XM4",
            price: 349.99,
            originalPrice: 399.99,
            discount: 10,
            category: "Accessories",
            image: ASUS,
            inStock: true,
            quantity: 10,
          },
          {
            id: 13,
            name: "Sony WH-1000XM4",
            price: 349.99,
            originalPrice: 399.99,
            discount: 10,
            category: "Accessories",
            image: ASUS,
            inStock: true,
            quantity: 10,
          },
        ];

        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    showToast.success('Product "' + product.name + '" added to cart');
    const newValue = cartCant + 1;
    console.log(newValue);
    setCartCant(newValue);
  };

  if (loading) {
    return <SkeletonCard />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  const categories = ["Computers", "Electronics", "Accessories"];
  return (
    <div className="container mx-auto px-4 py-8">
      <RevealOnScroll>
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
            {(showMore ? products : products.slice(0, 5)).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
        {categories.map((category) => (
          <CategoriesHome
            key={category}
            title={category}
            products={products.filter((p) => p.category === category)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </RevealOnScroll>
    </div>
  );
};
