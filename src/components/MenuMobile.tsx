import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { title: "Web Development", to: "/web-development" },
  { title: "Mobile Apps", to: "/mobile-apps" },
  { title: "Cloud Services", to: "/cloud-services" },
  { title: "Consulting", to: "/consulting" },
];

const aboutLinks = [
  { title: "Our Story", to: "/our-story" },
  { title: "Team", to: "/team" },
  { title: "Careers", to: "/careers" },
  { title: "Contact", to: "/contact" },
];

export const MenuMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="sm:hidden relative">
      {/* Toggle icon */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-700 p-2 dark:text-white"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full w-36 bg-white shadow-lg z-50 space-y-2 py-4">
          <div>
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsAboutOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isServicesOpen && (
              <div className="pl-4">
                {services.map((item, index) => (
                  <Link
                    to={item.to}
                    key={index}
                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => {
                setIsAboutOpen(!isAboutOpen);
                setIsServicesOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              About
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isAboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAboutOpen && (
              <div className="pl-4">
                {aboutLinks.map((item, index) => (
                  <Link
                    to={item.to}
                    key={index}
                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 text-left"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
