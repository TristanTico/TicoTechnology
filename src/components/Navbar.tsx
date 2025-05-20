import { useState, useCallback } from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuMobile } from "./MenuMobile";
import { ModeToggle } from "./mode-toggle";
import { TooltipComponent } from "./TooltipComponent";
import { MenuDemo } from "./MenuDemo";
import { AuthModal } from "./Auth/AuthModal";
import { useAuthStore } from "@/store/authStore";
import { MenuUserAuth } from "./MenuUserAuth";
import { useCartStore } from "@/store/cartStore";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const isAuthenticated  = useAuthStore((state) => state);
  const userLogin = useAuthStore((state) => state.userLogin);
  const cartItems = useCartStore((state) => state.items);

  return (
    <>
      <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl cursor-pointer ">
        <Link to="/">
          <h1 className="text-3xl">
            Tico<span className="font-bold">Technology</span>
          </h1>
        </Link>
        <div className="items-center justify-between hidden sm:flex">
          <MenuDemo />
        </div>
        <div className="flex sm:hidden">
          <MenuMobile />
        </div>
        <div className="flex items-center justify-between gap-2 sm:gap-7">
          <div className="relative">
            <Link to="/cart">
              <TooltipComponent text="Carrito">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-800">
                  <ShoppingCart strokeWidth={1} className="cursor-pointer" />

                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                </button>
              </TooltipComponent>
            </Link>
          </div>

          {isAuthenticated && userLogin ? (
            <MenuUserAuth />
          ) : (
            <TooltipComponent text="Iniciar sesión">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-800"
                onClick={toggleModal}
              >
                <User strokeWidth={1} className="cursor-pointer" />
              </button>
            </TooltipComponent>
          )}

          <ModeToggle />
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};
