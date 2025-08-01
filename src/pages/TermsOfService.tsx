import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-poppins mb-6">
              Términos de Servicio
            </h1>
            <p className="text-lg text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">1. Aceptación de Términos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al acceder y utilizar EasyRif ("la Plataforma"), usted acepta cumplir con estos Términos de Servicio. 
                Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">2. Descripción del Servicio</h2>
              <p className="text-muted-foreground leading-relaxed">
                EasyRif es una plataforma SaaS que permite a los usuarios crear, gestionar y administrar rifas de manera 
                profesional y transparente. Nuestros servicios incluyen gestión de vendedores, ventas en tiempo real, 
                registro de compradores, sorteos transparentes e integraciones con redes sociales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">3. Registro y Cuenta de Usuario</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Para utilizar nuestros servicios, debe crear una cuenta proporcionando información precisa y completa.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Es responsable de mantener la confidencialidad de su cuenta y contraseña</li>
                  <li>Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta</li>
                  <li>Debe ser mayor de 18 años para crear una cuenta</li>
                  <li>Solo puede tener una cuenta activa por persona o entidad</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">4. Uso Aceptable</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Al utilizar EasyRif, se compromete a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                  <li>No utilizar el servicio para actividades ilegales o fraudulentas</li>
                  <li>No interferir con el funcionamiento del servicio</li>
                  <li>Respetar los derechos de propiedad intelectual</li>
                  <li>Proporcionar información veraz en las rifas creadas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">5. Tarifas y Facturación</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Los precios de nuestros servicios se encuentran detallados en nuestra página web:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Las tarifas se cobran por adelantado según el plan seleccionado</li>
                  <li>Los pagos son no reembolsables salvo excepciones específicas</li>
                  <li>Nos reservamos el derecho de modificar precios con aviso previo</li>
                  <li>El incumplimiento de pago puede resultar en suspensión del servicio</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">6. Propiedad Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                EasyRif y su contenido son propiedad de nuestra empresa y están protegidos por leyes de derechos de autor, 
                marcas comerciales y otras leyes de propiedad intelectual. Usted mantiene los derechos sobre el contenido 
                que crea usando nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">7. Privacidad y Protección de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Su privacidad es importante para nosotros. El uso de sus datos personales se rige por nuestra Política de 
                Privacidad, que forma parte integral de estos términos de servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">8. Limitación de Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                En la máxima medida permitida por la ley, EasyRif no será responsable de daños indirectos, incidentales, 
                especiales o consecuenciales que surjan del uso o la incapacidad de usar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">9. Terminación</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Podemos terminar o suspender su cuenta inmediatamente si:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Viola estos términos de servicio</li>
                  <li>No paga las tarifas adeudadas</li>
                  <li>Utiliza el servicio de manera fraudulenta o ilegal</li>
                  <li>Por razones comerciales legítimas con aviso previo</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">10. Ley Aplicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estos términos se rigen por las leyes de [Jurisdicción] y cualquier disputa se resolverá en los tribunales 
                competentes de dicha jurisdicción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-poppins mb-4">11. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-foreground">
                  <strong>Email:</strong> easyrlegal@exesoft.cl<br />
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

export default TermsOfService;