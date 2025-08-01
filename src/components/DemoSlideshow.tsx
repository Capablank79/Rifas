import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  duration: number; // en segundos
  image: string;
}

// Crear array de rutas de imágenes desde la carpeta public
const slideImages: string[] = [];
for (let i = 1; i <= 45; i++) {
  slideImages.push(`/slides/Captura_${i}.JPG`);
}

// Generar slides dinámicamente usando las imágenes cargadas
const generateSlides = (): Slide[] => {
  const slideData = [
    // Fotos 1-3: Introducción
    {
      title: "Bienvenido a EasyRif",
      description: "La plataforma más completa para gestionar rifas de manera profesional y segura.",
      duration: 5
    },
    {
      title: "Tu Solución Integral",
      description: "Desde la creación hasta el sorteo, EasyRif te acompaña en cada paso del proceso.",
      duration: 4
    },
    {
      title: "Comencemos el Tour",
      description: "Descubre cómo crear y gestionar rifas exitosas de manera sencilla y profesional.",
      duration: 4
    },
    
    // Fotos 4-5: Configuración previa a la creación de la rifa
    {
      title: "Configuración Inicial",
      description: "Define el nombre de tu rifa, precio por número y cantidad de participantes.",
      duration: 4
    },
    {
      title: "Fecha del Sorteo",
      description: "Establece cuándo se realizará el sorteo para generar expectativa en los participantes.",
      duration: 4
    },
    
    // Fotos 6-7: Configuración de cuenta para recibir pagos
    {
      title: "Configuración de Pagos",
      description: "Conecta tu cuenta bancaria o método de pago preferido para recibir los ingresos.",
      duration: 4
    },
    {
      title: "Métodos de Pago",
      description: "Configura múltiples opciones de pago para facilitar la participación de tus clientes.",
      duration: 4
    },
    
    // Fotos 8-11: Configuración de premios
    {
      title: "Gestión de Premios",
      description: "Define los premios que se sortearán y su orden de entrega.",
      duration: 4
    },
    {
      title: "Detalles de Premios",
      description: "Agrega descripciones, imágenes y valores para hacer más atractivos los premios.",
      duration: 4
    },
    {
      title: "Organización de Premios",
      description: "Establece el orden de sorteo y las reglas para cada premio.",
      duration: 4
    },
    {
      title: "Validación de Premios",
      description: "Revisa que todos los premios estén correctamente configurados antes de continuar.",
      duration: 4
    },
    
    // Fotos 12-13: Creación de la rifa
    {
      title: "Creación de la Rifa",
      description: "Finaliza la configuración y crea oficialmente tu rifa con todos los parámetros definidos.",
      duration: 4
    },
    {
      title: "Confirmación de Creación",
      description: "Tu rifa ha sido creada exitosamente y está lista para comenzar a recibir participantes.",
      duration: 4
    },
    
    // Foto 14: Detalles de la rifa creada
    {
      title: "Vista Detallada de la Rifa",
      description: "Revisa todos los detalles de tu rifa: premios, fechas, precios y configuraciones.",
      duration: 4
    },
    
    // Fotos 15-19: Gestión de vendedores
     {
       title: "Red de Vendedores",
       description: "Invita y gestiona vendedores para ampliar el alcance de tu rifa.",
       duration: 4
     },
     {
       title: "Registro de Vendedores",
       description: "Los vendedores se registran fácilmente y obtienen acceso a sus herramientas de venta.",
       duration: 4
     },
     {
       title: "Crea tu Vendedor",
       description: "Registra nuevos vendedores de manera individual con sus datos y comisiones.",
       duration: 4
     },
     {
       title: "Panel del Vendedor",
       description: "Cada vendedor tiene acceso a su propio panel para gestionar sus ventas.",
       duration: 4
     },
     {
       title: "Descarga Planilla XLS y Carga Masiva",
       description: "Descarga la plantilla Excel y súbela para cargar vendedores de forma masiva.",
       duration: 4
     },
    
    // Fotos 20-27: Venta directa por vendedor (Foto 27 se crea el QR)
     {
       title: "Proceso de Venta Directa",
       description: "Los vendedores pueden realizar ventas directas desde su panel personalizado.",
       duration: 4
     },
     {
       title: "Selección de Números",
       description: "El comprador elige sus números favoritos o permite que el sistema los asigne automáticamente.",
       duration: 4
     },
     {
       title: "Datos del Comprador",
       description: "Captura los datos del comprador de manera rápida y sencilla para el registro.",
       duration: 4
     },
     {
       title: "Confirmación de Datos del Comprador",
       description: "Verifica que toda la información del comprador esté correcta antes de proceder.",
       duration: 4
     },
     {
       title: "Proceso de Compra",
       description: "El vendedor procesa la compra y confirma la participación en la rifa.",
       duration: 4
     },
     {
       title: "Comprobante Digital",
       description: "Se genera automáticamente un comprobante digital de la participación.",
       duration: 4
     },
     {
       title: "Pagos Seguros",
       description: "Sistema de pagos seguro que garantiza transacciones confiables y protegidas.",
       duration: 4
     },
     {
       title: "Generación de Código QR",
       description: "Crea códigos QR únicos para facilitar las ventas presenciales y el acceso rápido.",
       duration: 4
     },
    
    // Fotos 28-37: Gestión de compradores externos por link de compra
     {
       title: "Link de Compra Compartible",
       description: "Genera un link único que puedes compartir para que cualquiera pueda participar.",
       duration: 4
     },
     {
       title: "Revisa tus Ventas y Compradores",
       description: "Monitorea todas las ventas realizadas y gestiona la base de datos de compradores.",
       duration: 4
     },
     {
       title: "Link de Venta Compartido - Números Disponibles",
       description: "El link público muestra en tiempo real todos los números disponibles para compra.",
       duration: 4
     },
     {
       title: "Selecciona Números",
       description: "Los compradores eligen sus números favoritos desde la interfaz pública.",
       duration: 4
     },
     {
       title: "Ingresa Datos para Compra Segura",
       description: "Los clientes ingresan sus datos personales en un formulario seguro y protegido.",
       duration: 4
     },
     {
       title: "Confirmación Automática",
       description: "El comprador recibe confirmación inmediata por email y SMS.",
       duration: 4
     },
     {
       title: "QR y Link para Compartir en RRSS",
       description: "Genera códigos QR y links optimizados para compartir en redes sociales.",
       duration: 4
     },
    {
      title: "Comunicación Directa",
      description: "Envía actualizaciones y recordatorios a todos los participantes.",
      duration: 4
    },
    {
      title: "Base de Datos de Clientes",
      description: "Construye una base de datos valiosa para futuras rifas y promociones.",
      duration: 4
    },
    {
      title: "Seguimiento de Ventas",
      description: "Monitorea en tiempo real las ventas realizadas a través del link público.",
      duration: 4
    },
    
    // Fotos 38-43: Sorteo de la rifa con algoritmo
     {
       title: "Preparación del Sorteo",
       description: "El sistema verifica que todo esté listo para realizar el sorteo oficial.",
       duration: 4
     },
     {
       title: "Algoritmo Certificado",
       description: "Utilizamos un algoritmo transparente y auditable para garantizar la imparcialidad.",
       duration: 5
     },
     {
       title: "Realiza Sorteo de Múltiples Premios",
       description: "Ejecuta el sorteo automático de todos los premios configurados de manera transparente.",
       duration: 4
     },
     {
       title: "Selección de Ganadores",
       description: "El algoritmo selecciona automáticamente los ganadores según el orden de premios.",
       duration: 4
     },
     {
       title: "Rifa Completada",
       description: "El sorteo ha finalizado exitosamente con todos los ganadores seleccionados.",
       duration: 4
     },
     {
       title: "Notificación de Ganadores",
       description: "Todos los ganadores son notificados automáticamente por múltiples canales.",
       duration: 4
     },
    
    // Foto 44: Dashboard interactivo
    {
      title: "Dashboard Interactivo",
      description: "Visualiza todas las métricas, ventas y estadísticas de tu rifa en tiempo real.",
      duration: 4
    },
    
    // Foto 45: Cierre de sesión, gracias y motivar a inscribirse
    {
      title: "¡Gracias por el Tour!",
      description: "Has visto el poder de EasyRif. ¡Únete a nuestra waitlist y sé de los primeros en acceder!",
      duration: 8
    }
  ];

  return slideData.map((slide, index) => ({
    id: index + 1,
    title: slide.title,
    description: slide.description,
    duration: slide.duration,
    image: slideImages[index]
  }));
};

const slides: Slide[] = generateSlides();

interface DemoSlideshowProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoSlideshow = ({ isOpen, onClose }: DemoSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(slides[0].duration);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
      setIsPlaying(true);
      setTimeLeft(slides[0].duration);
      return;
    }

    setTimeLeft(slides[currentSlide].duration);
  }, [isOpen, currentSlide]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Pasar al siguiente slide
          setCurrentSlide((current) => {
            if (current >= slides.length - 1) {
              setIsPlaying(false);
              return current;
            }
            return current + 1;
          });
          return slides[currentSlide + 1]?.duration || 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isOpen) return null;

  const progress = ((slides[currentSlide].duration - timeLeft) / slides[currentSlide].duration) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Demo EasyRif</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="h-8 w-8"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted h-1">
          <div 
            className="bg-primary h-1 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide Content */}
        <div className="p-8 text-center min-h-[400px] flex flex-col justify-center">
          {/* Imagen del slide */}
          <div className="rounded-lg h-64 mb-6 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-foreground">
            {slides[currentSlide].title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>

          {/* Timer */}
          <div className="mt-6 text-sm text-muted-foreground">
            Siguiente slide en: {timeLeft}s
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </Button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Te gusta lo que ves? 
            <Button variant="link" className="p-0 ml-1 h-auto" onClick={onClose}>
              Solicita tu demo personalizada
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoSlideshow;