import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const computadoras = [
  { title: "Web Development", description: "Custom website solutions", to: "/web-development" },
  { title: "Mobile Apps", description: "iOS and Android development", to: "/mobile-apps" },
  { title: "Cloud Services", description: "Scalable cloud solutions", to: "/cloud-services" },
  { title: "Consulting", description: "Technical consultation", to: "/consulting" },
];

const perifericos = [
  { title: "Our Story", description: "Journey through time", to: "/our-story" },
  { title: "Team", description: "Meet our experts", to: "/team" },
  { title: "Careers", description: "Join our team", to: "/careers" },
  { title: "Contact", description: "Get in touch", to: "/contact" },
];

const DropdownMenu = ({ items, isOpen, onClose }: any) => (
  <div
    className={`absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg transition-all duration-300 transform ${
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >
    <div className="py-2">
      {items.map((item: any, index: number) => (
        <Link
          to={item.to}
          key={index}
          onClick={onClose}
          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="text-gray-800 font-medium">{item.title}</div>
          <div className="text-gray-500 text-sm">{item.description}</div>
        </Link>
      ))}
    </div>
  </div>
);

export const Menu = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsServicesOpen(false);
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex space-x-8 relative" ref={dropdownRef}>
      <div className="relative">
        <button
          className={`inline-flex items-center text-sm font-medium text-gray-900 border-b-2 dark:text-white ${
            isServicesOpen ? "border-blue-500" : "border-transparent"
          } hover:border-gray-300 transition-colors duration-200`}
          onClick={() => {
            setIsServicesOpen(!isServicesOpen);
            setIsAboutOpen(false);
          }}
        >
          Computadoras
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isServicesOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <DropdownMenu
          items={computadoras}
          isOpen={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
        />
      </div>

      <div className="relative">
        <button
          className={`inline-flex items-center text-sm font-medium text-gray-900 border-b-2 dark:text-white ${
            isAboutOpen ? "border-blue-500" : "border-transparent"
          } hover:border-gray-300 transition-colors duration-200`}
          onClick={() => {
            setIsAboutOpen(!isAboutOpen);
            setIsServicesOpen(false);
          }}
        >
          Periféricos
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isAboutOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <DropdownMenu
          items={perifericos}
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </div>
    </div>
  );
};
