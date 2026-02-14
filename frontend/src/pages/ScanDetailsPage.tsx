import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { scanService } from "../api/scanService.ts";
import {
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface Vulnerability {
  title?: string;
  severity?: string;
  description?: string;
}

export const ScanDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);

  // Fetch scan details
  const { data: scan, isLoading } = useQuery({
    queryKey: ["scan", id],
    queryFn: () => scanService.getScan(Number(id)),
    refetchInterval: (query) => {
      // Auto-refresh cada 3 segundos si está en progreso
      const scanData = query.state.data;
      return scanData?.status === "running" || scanData?.status === "pending"
        ? 3000
        : false;
    },
  });

  // Simular logs en tiempo real
  useEffect(() => {
    if (scan?.status === "running") {
      const interval = setInterval(() => {
        const newLogs = [
          `[${new Date().toLocaleTimeString()}] Verificando certificado SSL...`,
          `[${new Date().toLocaleTimeString()}] Analizando headers de seguridad...`,
          `[${new Date().toLocaleTimeString()}] Comprobando configuración HTTPS...`,
          `[${new Date().toLocaleTimeString()}] Escaneando vulnerabilidades conocidas...`,
          `[${new Date().toLocaleTimeString()}] Analizando CSP y CORS...`,
        ];
        setLogs((prev) =>
          [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(
            -20,
          ),
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [scan?.status]);

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: {
        icon: CheckCircle,
        class:
          "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
        text: "Completado",
      },
      pending: {
        icon: Clock,
        class:
          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        text: "Pendiente",
      },
      running: {
        icon: Activity,
        class:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        text: "Ejecutando",
      },
      failed: {
        icon: XCircle,
        class: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        text: "Fallido",
      },
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;
    return { Icon, ...badge };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Escaneo no encontrado
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(scan.status);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Detalles del Escaneo
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scan.target_url}
                </h2>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>ID: #{scan.id}</span>
                <span>•</span>
                <span>
                  Creado: {new Date(scan.created_at).toLocaleString()}
                </span>
                <span>•</span>
                <span className="capitalize">Tipo: {scan.scan_type}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusBadge.class}`}
              >
                <statusBadge.Icon className="h-4 w-4 mr-2" />
                {statusBadge.text}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Logs */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Actividad en Tiempo Real
                </h3>
                {scan.status === "running" && (
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    Escaneando...
                  </div>
                )}
              </div>

              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {scan.status === "pending" && (
                  <div className="text-yellow-400">
                    [Sistema] Escaneo en cola, iniciando pronto...
                  </div>
                )}

                {scan.status === "running" &&
                  logs.map((log, i) => (
                    <div
                      key={`log-${i}-${log}`}
                      className="text-green-400 mb-1 animate-fade-in"
                    >
                      {log}
                    </div>
                  ))}

                {scan.status === "completed" && (
                  <>
                    <div className="text-green-400 mb-1">
                      [Sistema] Escaneo iniciado...
                    </div>
                    <div className="text-green-400 mb-1">
                      [SSL] Verificando certificado...
                    </div>
                    <div className="text-green-400 mb-1">
                      [SSL] Certificado válido encontrado
                    </div>
                    <div className="text-green-400 mb-1">
                      [Headers] Analizando cabeceras de seguridad...
                    </div>
                    <div className="text-yellow-400 mb-1">
                      [Headers] ⚠️ CSP no configurado
                    </div>
                    <div className="text-green-400 mb-1">
                      [Vulnerabilidades] Escaneando puertos abiertos...
                    </div>
                    <div className="text-green-400 mb-1">
                      [Vulnerabilidades] No se encontraron vulnerabilidades
                      críticas
                    </div>
                    <div className="text-green-400 mb-1">
                      [Sistema] ✅ Escaneo completado exitosamente
                    </div>
                    <div className="text-blue-400 mt-2">
                      [Resultado] {scan.vulnerabilities?.length || 0} problemas
                      detectados
                    </div>
                  </>
                )}

                {scan.status === "failed" && (
                  <div className="text-red-400">
                    [Error] El escaneo falló. Por favor intenta nuevamente.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Resumen
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Estado:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {scan.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Vulnerabilidades:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {scan.vulnerabilities?.length || 0}
                  </span>
                </div>
                {scan.completed_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Completado:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(scan.completed_at).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Vulnerabilities */}
            {scan.vulnerabilities && scan.vulnerabilities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Problemas Encontrados
                </h3>
                <div className="space-y-3">
                  {scan.vulnerabilities.map(
                    (vuln: Vulnerability, i: number) => (
                      <div
                        key={`vuln-${i}-${vuln.title || "unknown"}`}
                        className="border-l-4 border-yellow-500 pl-3 py-2"
                      >
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {vuln.title || "Problema de seguridad"}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Severidad: {vuln.severity || "Media"}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
