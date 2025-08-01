import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Mail, MessageCircle, Building, Users } from "lucide-react";

const DemoForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoRifa: "",
    frecuencia: "",
    comentarios: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "¡Solicitud enviada exitosamente!",
      description: "Nos pondremos en contacto contigo en las próximas 24 horas.",
    });

    setIsSubmitting(false);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      tipoRifa: "",
      frecuencia: "",
      comentarios: ""
    });
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                Solicita tu Demo
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-6">
                Descubre el poder de{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  EasyRif
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agenda una demostración personalizada y descubre cómo EasyRif puede transformar 
                la gestión de tus rifas en un proceso profesional y eficiente.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                "Demo personalizada de 30 minutos",
                "Análisis de tus necesidades específicas",
                "Configuración gratuita para tu primer evento",
                "Soporte dedicado durante la implementación"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">easyrdemo@exesoft.cl</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-muted-foreground">+56928762136</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-elegant border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-poppins">Solicitar Demo Gratuita</CardTitle>
              <p className="text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleChange("nombre", e.target.value)}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    required
                    maxLength={12}
                    placeholder="+56123456789"
                    className="max-w-48"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de rifas que organizas</Label>
                    <Select value={formData.tipoRifa} onValueChange={(value) => handleChange("tipoRifa", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beneficas">Rifas benéficas</SelectItem>
                        <SelectItem value="empresariales">Eventos empresariales</SelectItem>
                        <SelectItem value="educativas">Instituciones educativas</SelectItem>
                        <SelectItem value="deportivas">Organizaciones deportivas</SelectItem>
                        <SelectItem value="otras">Otras</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frecuencia de eventos</Label>
                    <Select value={formData.frecuencia} onValueChange={(value) => handleChange("frecuencia", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="¿Qué tan seguido?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensual">Mensual</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                        <SelectItem value="semestral">Semestral</SelectItem>
                        <SelectItem value="anual">Anual</SelectItem>
                        <SelectItem value="esporadico">Esporádico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comentarios">Comentarios adicionales</Label>
                  <Textarea
                    id="comentarios"
                    value={formData.comentarios}
                    onChange={(e) => handleChange("comentarios", e.target.value)}
                    placeholder="Cuéntanos sobre tus necesidades específicas o preguntas..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Demo Gratuita"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo 
                  para programar tu demo personalizada.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;