import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold font-poppins bg-gradient-primary bg-clip-text text-transparent">
                EasyRif
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
                Inicio
              </a>
              <a href="#caracteristicas" className="text-foreground hover:text-primary transition-colors font-medium">
                Características
              </a>
              <span className="text-muted-foreground font-medium cursor-not-allowed opacity-50">
                Precios
              </span>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">
                Contacto
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" disabled className="cursor-not-allowed opacity-50">
              Iniciar Sesión
            </Button>
            <Button variant="hero" size="sm" asChild>
              <a href="#contacto">Solicitar Demo</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a href="#inicio" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Inicio
              </a>
              <a href="#caracteristicas" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Características
              </a>
              <span className="block px-3 py-2 text-muted-foreground cursor-not-allowed opacity-50">
                Precios
              </span>
              <a href="#contacto" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Contacto
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full cursor-not-allowed opacity-50" disabled>
                  Iniciar Sesión
                </Button>
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <a href="#contacto">Solicitar Demo</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;