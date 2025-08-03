import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Mail, MessageCircle, X } from "lucide-react";
import { insertDemoRequest, getDemoCredentials, markEmailSent } from "@/config/supabase";
import { sendDemoCredentials } from "@/services/emailService";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoRequestModal = ({ isOpen, onClose }: DemoRequestModalProps) => {
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

    try {
      // Validar campos requeridos
      if (!formData.nombre || !formData.email || !formData.telefono) {
        toast({
          title: "Error de validación",
          description: "Por favor completa todos los campos requeridos.",
          variant: "destructive"
        });
        return;
      }

      console.log('Enviando datos a Supabase:', {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipo_rifa: formData.tipoRifa,
        frecuencia: formData.frecuencia,
        comentarios: formData.comentarios
      });

      // Enviar datos a Supabase (las credenciales se generan automáticamente)
      const result = await insertDemoRequest({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipo_rifa: formData.tipoRifa,
        frecuencia: formData.frecuencia,
        comentarios: formData.comentarios
      });

      console.log('Resultado de insertDemoRequest:', result);

      // Obtener las credenciales generadas
      if (result && result[0]?.id) {
        console.log('Obteniendo credenciales para ID:', result[0].id);
        const credentials = await getDemoCredentials(result[0].id);
        console.log('Credenciales obtenidas:', credentials);
        
        // Enviar email con credenciales
        console.log('Enviando email con credenciales...');
        const emailSent = await sendDemoCredentials({
          nombre: credentials.nombre,
          email: credentials.email,
          username: credentials.username,
          password: credentials.password,
          expires_at: credentials.expires_at
        });
        console.log('Email enviado:', emailSent);
        
        // Marcar email como enviado si fue exitoso
        if (emailSent) {
          await markEmailSent(result[0].id);
          console.log('Email marcado como enviado');
        }
      } else {
        console.error('No se pudo obtener el ID del resultado:', result);
      }

      toast({
        title: "¡Solicitud enviada exitosamente!",
        description: "Revisa tu email para recibir las credenciales de acceso a la demo.",
      });

      // Limpiar formulario y cerrar modal
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoRifa: "",
        frecuencia: "",
        comentarios: ""
      });
      onClose();

    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast({
        title: "Error al enviar solicitud",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins text-center">
            Solicitar Acceso a Demo
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                Acceso a Demo Interactiva
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4">
                Prueba{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  EasyRif
                </span>
                {" "}gratis por 24 horas
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Solicita acceso a nuestra demo interactiva y recibe credenciales temporales 
                para explorar todas las funcionalidades de EasyRif durante 24 horas.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Acceso completo por 24 horas",
                "Credenciales enviadas por email",
                "Explora todas las funcionalidades",
                "Únete a la waitlist desde la demo"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-foreground font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="grid gap-4 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium text-sm">Email</div>
                  <div className="text-muted-foreground text-sm">easyrdemo@exesoft.cl</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium text-sm">WhatsApp</div>
                  <div className="text-muted-foreground text-sm">+56928762136</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
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
                />
              </div>

              <div className="grid gap-4">
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
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Solicitar Acceso a Demo"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Al enviar este formulario, recibirás credenciales temporales válidas por 24 horas 
                para acceder a nuestra demo interactiva.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;