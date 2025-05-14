import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

const computadoras = [
  { title: "Web Development", to: "/web-development" },
  { title: "Mobile Apps", to: "/mobile-apps" },
  { title: "Cloud Services", to: "/cloud-services" },
  { title: "Consulting", to: "/consulting" },
];

const perifericos = [
  { title: "Our Story", to: "/our-story" },
  { title: "Team", to: "/team" },
  { title: "Careers", to: "/careers" },
  { title: "Contact", to: "/contact" },
];
export const MenuDemo = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Computadoras
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {computadoras.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Periféricos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {perifericos.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Componentes
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {perifericos.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Celulares
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {perifericos.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none hover:bg-transparent cursor-pointer"
          >
            Accesorios
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {perifericos.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
