import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-poppins mb-6">
              Política de Privacidad
            </h1>
            <p className="text-lg text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">1. Información que Recopilamos</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  En EasyRif recopilamos información para proporcionar mejores servicios a nuestros usuarios:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Información que nos proporciona</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Información de la cuenta (nombre, email, contraseña)</li>
                      <li>Información de perfil y empresa</li>
                      <li>Información de pago y facturación</li>
                      <li>Contenido que crea usando nuestros servicios</li>
                      <li>Comunicaciones con nuestro equipo de soporte</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Información que recopilamos automáticamente</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Información de uso y actividad en la plataforma</li>
                      <li>Direcciones IP y información del dispositivo</li>
                      <li>Cookies y tecnologías similares</li>
                      <li>Logs de servidor y datos analíticos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">2. Cómo Utilizamos la Información</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                  <li>Procesar transacciones y gestionar su cuenta</li>
                  <li>Enviar comunicaciones relacionadas con el servicio</li>
                  <li>Proporcionar soporte al cliente</li>
                  <li>Detectar y prevenir fraudes y abusos</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Realizar análisis y mejorar nuestros productos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">3. Compartir Información</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  No vendemos, alquilamos ni compartimos su información personal con terceros excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Con su consentimiento:</strong> Cuando nos autoriza explícitamente</li>
                  <li><strong>Proveedores de servicios:</strong> Con empresas que nos ayudan a operar nuestros servicios</li>
                  <li><strong>Cumplimiento legal:</strong> Cuando lo requiera la ley o procesos legales</li>
                  <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad</li>
                  <li><strong>Transacciones comerciales:</strong> En caso de fusión, adquisición o venta de activos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">4. Seguridad de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de seguridad técnicas, administrativas y físicas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                <li>Cifrado de datos en tránsito y en reposo</li>
                <li>Controles de acceso estrictos</li>
                <li>Monitoreo continuo de seguridad</li>
                <li>Auditorías regulares de seguridad</li>
                <li>Capacitación del personal en privacidad</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">5. Sus Derechos</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Dependiendo de su ubicación, puede tener los siguientes derechos:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos personales</li>
                  <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado</li>
                  <li><strong>Objeción:</strong> Oponerse al procesamiento de sus datos</li>
                  <li><strong>Limitación:</strong> Solicitar la limitación del procesamiento</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Para ejercer estos derechos, contáctenos a través de nuestros canales de contacto disponibles.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">6. Cookies y Tecnologías Similares</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Mantener su sesión iniciada</li>
                  <li>Recordar sus preferencias</li>
                  <li>Analizar el uso de nuestros servicios</li>
                  <li>Personalizar contenido y anuncios</li>
                  <li>Mejorar la seguridad</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Puede controlar las cookies a través de la configuración de su navegador.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">7. Retención de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera o permita un período de retención más largo. Cuando ya no necesitemos su información, la eliminaremos o anonimizaremos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">8. Transferencias Internacionales</h2>
              <p className="text-muted-foreground leading-relaxed">
                Su información puede ser transferida y procesada en países distintos al suyo. Implementamos salvaguardas apropiadas para garantizar que sus datos reciban un nivel adecuado de protección, incluyendo cláusulas contractuales estándar y certificaciones de adecuación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">9. Privacidad de Menores</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores. Si descubrimos que hemos recopilado información de un menor, la eliminaremos inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">10. Cambios a Esta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios significativos publicando la nueva política en nuestro sitio web y, cuando sea apropiado, a través de otros canales de comunicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">11. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, puede contactarnos:
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-foreground">
                  <strong>Email General:</strong> easyrcont@exesoft.cl<br />
        <strong>Teléfono:</strong> +56928762136<br />
        <strong>Dirección:</strong> Providencia, STGO
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;