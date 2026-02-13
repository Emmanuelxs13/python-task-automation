import { Link } from "react-router-dom";
import {
  Shield,
  BookOpen,
  Video,
  MessageCircle,
  ChevronRight,
  Search,
  Code,
  Settings,
  BarChart,
  Zap,
} from "lucide-react";

export const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SecureCheck
              </span>
            </div>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Volver al Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Centro de Documentación
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Todo lo que necesitas saber para aprovechar al máximo SecureCheck
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Buscar en la documentación..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Inicio Rápido
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comienza a usar SecureCheck en menos de 5 minutos
            </p>
            <Link
              to="#"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Leer más <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Referencia API
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Documentación completa de nuestra API REST
            </p>
            <Link
              to="#"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Ver API <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mejores Prácticas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Guías y recomendaciones de seguridad
            </p>
            <Link
              to="#"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Explorar <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Contenido
              </h3>
              <nav className="space-y-2">
                <a
                  href="#intro"
                  className="block px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  Introducción
                </a>
                <a
                  href="#install"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Instalación
                </a>
                <a
                  href="#config"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Configuración
                </a>
                <a
                  href="#scans"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Tipos de Escaneo
                </a>
                <a
                  href="#reports"
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Reportes
                </a>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                  ¿Necesitas ayuda?
                </h4>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Tutoriales
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Soporte en Vivo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
              <section id="intro" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Introducción a SecureCheck
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  SecureCheck es una plataforma empresarial de escaneo de
                  seguridad que te permite identificar vulnerabilidades en tus
                  aplicaciones web de forma automatizada y eficiente.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Con SecureCheck puedes realizar análisis SSL/TLS, verificación
                  de headers de seguridad, detección de vulnerabilidades
                  conocidas y mucho más.
                </p>
              </section>

              <section id="install" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Instalación
                </h2>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    npm install @securecheck/cli
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Una vez instalado, puedes comenzar a usar SecureCheck
                  directamente desde la línea de comandos o a través de nuestra
                  interfaz web.
                </p>
              </section>

              <section id="config" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Configuración Básica
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  SecureCheck funciona sin configuración adicional, pero puedes
                  personalizar el comportamiento según tus necesidades
                  específicas.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    <strong>💡 Consejo:</strong> Para proyectos empresariales,
                    recomendamos configurar escaneos programados para mantener
                    tu infraestructura siempre protegida.
                  </p>
                </div>
              </section>

              <section id="scans">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Tipos de Escaneo Disponibles
                </h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Escaneo SSL/TLS
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Verifica la configuración de certificados, protocolos y
                      cifrados de tu sitio web.
                    </p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Headers de Seguridad
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Analiza CSP, HSTS, X-Frame-Options y otras cabeceras
                      críticas.
                    </p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Escaneo Completo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Combina todos los análisis anteriores en un reporte
                      unificado.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
