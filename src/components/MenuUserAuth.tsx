import { useAuthStore } from "@/store/authStore";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, UserPen } from "lucide-react";

export const MenuUserAuth = () => {
  const logout = useAuthStore((state) => state.logout);
  const userLogin = useAuthStore((state) => state.userLogin);

  const handleLogout = () => logout();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Bienvenid@, {userLogin.nombreUsuario}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <UserPen className="mr-2" /> <Link to="/profile">Mi Perfil</Link>
          </DropdownMenuItem>
          {userLogin.rol === "Admin" && (
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2" />{" "}
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2" /> Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
