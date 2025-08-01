import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-poppins mb-6">
              Política de Cookies
            </h1>
            <p className="text-lg text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">¿Qué son las Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. 
                Estas cookies nos permiten recordar sus preferencias y mejorar su experiencia de navegación en EasyRif.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">¿Cómo Utilizamos las Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies para varios propósitos esenciales en nuestra plataforma:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cookies Esenciales</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Estas cookies son necesarias para el funcionamiento básico del sitio web:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Mantener su sesión iniciada mientras navega por la plataforma</li>
                    <li>Recordar sus preferencias de idioma y configuración</li>
                    <li>Garantizar la seguridad y prevenir fraudes</li>
                    <li>Permitir el funcionamiento del carrito de compras y procesos de pago</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Cookies de Rendimiento</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Recopilar información sobre las páginas más visitadas</li>
                    <li>Medir el tiempo de carga y rendimiento del sitio</li>
                    <li>Identificar errores y problemas técnicos</li>
                    <li>Optimizar la experiencia del usuario</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Cookies de Funcionalidad</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Mejoran la funcionalidad y personalización:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Recordar sus configuraciones y preferencias personales</li>
                    <li>Proporcionar características mejoradas y contenido personalizado</li>
                    <li>Recordar información que ha introducido en formularios</li>
                    <li>Adaptar el contenido según su ubicación geográfica</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Cookies de Marketing</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Con su consentimiento, utilizamos cookies para:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Mostrar anuncios relevantes y personalizados</li>
                    <li>Medir la efectividad de nuestras campañas publicitarias</li>
                    <li>Rastrear conversiones y analizar el retorno de inversión</li>
                    <li>Crear perfiles de audiencia para publicidad dirigida</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">Cookies de Terceros</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                También utilizamos servicios de terceros que pueden establecer sus propias cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento del usuario</li>
                <li><strong>Stripe:</strong> Para procesamiento seguro de pagos</li>
                <li><strong>Intercom:</strong> Para chat de soporte al cliente</li>
                <li><strong>Hotjar:</strong> Para mapas de calor y grabaciones de sesiones</li>
                <li><strong>Facebook Pixel:</strong> Para publicidad y análisis en redes sociales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">Control de Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Configuración del Navegador</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Puede controlar y gestionar las cookies a través de la configuración de su navegador. 
                    La mayoría de los navegadores le permiten:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                    <li>Ver qué cookies están almacenadas</li>
                    <li>Eliminar cookies individualmente o todas a la vez</li>
                    <li>Bloquear cookies de sitios específicos</li>
                    <li>Configurar alertas cuando se establezcan cookies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Nuestro Panel de Preferencias</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Proporcionamos un panel de control donde puede gestionar sus preferencias de cookies 
                    directamente en nuestro sitio web. Puede acceder a él en cualquier momento desde el 
                    enlace en el pie de página.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">Impacto de Deshabilitar Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Si decide deshabilitar las cookies, algunas funcionalidades de nuestro sitio web pueden verse afectadas:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Podría necesitar volver a iniciar sesión cada vez que visite el sitio</li>
                <li>Sus preferencias y configuraciones no se recordarán</li>
                <li>Algunas características interactivas pueden no funcionar correctamente</li>
                <li>El contenido personalizado no estará disponible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">Actualizaciones de Esta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en 
                nuestras prácticas o por otros motivos operativos, legales o regulatorios. 
                Le recomendamos que revise esta página periódicamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tiene preguntas sobre nuestra utilización de cookies, puede contactarnos:
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-foreground">
                  <strong>Soporte General:</strong> easyrcont@exesoft.cl<br />
        <strong>Teléfono:</strong> +56928762136<br />
        <strong>Dirección:</strong> Providencia, STGO
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aviso: Este Sitio Utiliza Cookies
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Al continuar navegando en EasyRif, usted acepta el uso de cookies según se describe 
                    en esta política. Las cookies esenciales se utilizan automáticamente para garantizar 
                    el funcionamiento del sitio, mientras que las cookies opcionales requieren su consentimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;