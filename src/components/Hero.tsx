import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import foto from "../assets/img/pocoSinFondo.png"

const datosOfertas = [
  {
    id: 1,
    title: "Laptop HP ProBook 450 G9 - ¡20% de descuento!",
    description: "Rendimiento profesional para trabajo y estudio. Incluye maletín de regalo.",
    to: "/oferta-1",
    image: foto,
  },
  {
    id: 2,
    title: "Monitor LG 27'' Full HD - Oferta Especial",
    description: "Ideal para gamers y diseñadores. Ahorra ₡30.000 por tiempo limitado.",
    to: "/oferta-2",
    image: foto,
  },
  {
    id: 3,
    title: "Xiaomi POCO F6 - ¡10% de descuento!",
    description: "Rendimiento extremo con Snapdragon 8s Gen 3 y pantalla AMOLED de 120Hz. ¡Incluye funda de regalo!",
    to: "/oferta-3",
    image: foto,
  },
];
export const Hero = () => {
  return (
    <div className="bg-gray-200 dark:bg-white">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[Autoplay({ delay: 2500 })]}
      >
        <CarouselContent>
          {datosOfertas.map((oferta) => (
            <CarouselItem key={oferta.id}>
              <Card className="shadow-none border-none bg-transparent">
                <CardContent className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
                  
                  {/* Texto a la izquierda */}
                  <div className="text-left max-w-sm">
                    <p className="font-bold sm:text-lg text-wrap dark:text-secondary">
                      {oferta.title}
                    </p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-secondary">
                      {oferta.description}
                    </p>
                    <Link to={oferta.to}>
                      <Button className="bg-blue-500 mt-2">
                        <Eye className="mr-2" /> Ver Producto
                      </Button>
                    </Link>
                  </div>
                  <img src={oferta.image} alt="Producto" className="w-48 sm:w-64 md:w-72 lg:w-80" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
