import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  TrendingUp,
  FileSearch,
  Award,
  ChevronRight,
  Zap,
  Globe,
  Users,
  CheckCircle2,
} from "lucide-react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SecureCheck
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
              >
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Plataforma de Seguridad Empresarial
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Protege tu Infraestructura
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                Antes que sea Tarde
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Identifica vulnerabilidades críticas en tiempo real. SecureCheck
              analiza tus aplicaciones web
              <br className="hidden sm:block" />
              con tecnología de nivel empresarial, proporcionando reportes
              accionables en segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold group"
              >
                Comenzar Prueba Gratuita
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-md border border-gray-200 dark:border-gray-700 text-lg font-semibold"
              >
                Ver Documentación
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  SOC 2 Certificado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ISO 27001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  GDPR Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  99.9% Uptime SLA
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Empresas Confían en Nosotros
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                  <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                1M+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Escaneos Completados
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                99.8%
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Precisión en Detección
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Análisis de Seguridad Integral
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Herramientas empresariales para proteger tu infraestructura
              digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all border border-blue-100 dark:border-blue-800">
              <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Análisis SSL/TLS
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Verifica configuración de certificados, protocolos de
                encriptación y vulnerabilidades conocidas
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all border border-purple-100 dark:border-purple-800">
              <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <FileSearch className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Headers de Seguridad
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Analiza CSP, HSTS, X-Frame-Options y todas las cabeceras
                críticas de seguridad
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all border border-green-100 dark:border-green-800">
              <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Reportes en Tiempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Resultados instantáneos con recomendaciones accionables y
                priorización automática
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all border border-orange-100 dark:border-orange-800">
              <div className="bg-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Cumplimiento Normativo
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Cumple con PCI-DSS, HIPAA, SOC 2 y otros estándares
                internacionales automáticamente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Proteger tu Empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Únete a más de 500 empresas que confían en SecureCheck para mantener
            sus aplicaciones seguras 24/7
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg font-semibold group"
          >
            Comenzar Ahora - Es Gratis
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-blue-100">
            ✓ Sin tarjeta de crédito requerida ✓ Configuración en 2 minutos ✓
            Soporte 24/7
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">SecureCheck</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 SecureCheck. Plataforma Empresarial de Escaneo de Seguridad.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Construido con seguridad, pensado para empresas.
          </p>
        </div>
      </footer>
    </div>
  );
};
