import { Mail, MessageCircle, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-poppins bg-gradient-primary bg-clip-text text-transparent">
              EasyRif
            </h3>
            <p className="text-background/80 leading-relaxed">
              La plataforma SaaS líder para gestión profesional de rifas. 
              Transparente, eficiente y confiable.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Producto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-poppins">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Características</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Precios</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Integraciones</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">API</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Seguridad</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-poppins">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Press</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-poppins">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-background/80">easyrcont@exesoft.cl</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-background/80">+56928762136</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-background/80">Providencia, STGO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2025 EasyRif. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/terminos-de-servicio" className="text-background/60 hover:text-background transition-colors">
                Términos de Servicio
              </a>
              <a href="/politica-de-privacidad" className="text-background/60 hover:text-background transition-colors">
                Política de Privacidad
              </a>
              <a href="/politica-de-cookies" className="text-background/60 hover:text-background transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;