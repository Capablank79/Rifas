import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Share2, 
  Bell, 
  BarChart3,
  CheckCircle,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestión de Vendedores",
    description: "Administra tu equipo de vendedores con roles, comisiones y seguimiento de rendimiento en tiempo real."
  },
  {
    icon: TrendingUp,
    title: "Ventas en Tiempo Real",
    description: "Monitorea cada venta instantáneamente con dashboards en vivo y notificaciones automáticas."
  },
  {
    icon: Shield,
    title: "Sorteos Transparentes",
    description: "Sistema de sorteo verificable y transparente que genera confianza en tus compradores."
  },
  {
    icon: Share2,
    title: "Integración Social",
    description: "Comparte automáticamente números disponibles en redes sociales para maximizar el alcance."
  },
  {
    icon: Bell,
    title: "Notificaciones Inteligentes",
    description: "Alertas automáticas para vendedores y compradores sobre el estado de la rifa."
  },
  {
    icon: BarChart3,
    title: "Analíticas Avanzadas",
    description: "Reportes detallados de ventas, rendimiento y proyecciones para tomar mejores decisiones."
  },
  {
    icon: CheckCircle,
    title: "Registro de Compradores",
    description: "Base de datos completa de participantes con verificación y gestión de contactos."
  },
  {
    icon: Globe,
    title: "Acceso Web",
    description: "Plataforma 100% web, accesible desde cualquier dispositivo sin necesidad de instalación."
  }
];

const FeaturesSection = () => {
  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Características Principales
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Todo lo que necesitas para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              gestionar rifas
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desde la creación hasta el sorteo final, EasyRif te proporciona todas las herramientas 
            necesarias para ejecutar rifas profesionales y transparentes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold font-poppins mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold font-poppins mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Únete a cientos de organizadores que ya confían en EasyRif para gestionar sus rifas de manera profesional.
            </p>
            <div className="flex justify-center">
              <a 
                href="#contacto"
                className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-glow"
              >
                Comenzar Gratis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;