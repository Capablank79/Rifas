import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, ExternalLink } from "lucide-react";
import { useState } from "react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import DemoSlideshow from "./DemoSlideshow";
import { URLS } from "@/config/urls";

const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                #1 Plataforma para Rifas
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
                  Transforma tus{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    rifas
                  </span>{" "}
                  en un negocio{" "}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    profesional
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-inter leading-relaxed max-w-xl">
                  Gestiona vendedores, ventas en tiempo real, compradores registrados y sorteos transparentes. 
                  Todo con integración a redes sociales y análisis completo.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={URLS.getDemoUrl()} target="_blank" rel="noopener noreferrer">
                    Probar Demo Interactivo
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="group"
                  onClick={() => setIsDemoOpen(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo (2 min)
                </Button>
                <Button variant="outline" size="xl" className="group" asChild>
                  <a href="#contacto">
                    Solicitar Demo Personalizada
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Rifas Activas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$2M+</div>
                <div className="text-sm text-muted-foreground">Recaudado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img 
                src={heroIllustration} 
                alt="EasyRif Platform Illustration" 
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-card animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">Venta en tiempo real</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-card animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Sorteo transparente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Demo Slideshow */}
    <DemoSlideshow 
      isOpen={isDemoOpen} 
      onClose={() => setIsDemoOpen(false)} 
    />
  </>
  );
};

export default HeroSection;