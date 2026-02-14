import { useState } from "react";
import type { FormEvent } from "react";
import { X, Globe, Shield, Zap } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scanService } from "../api/scanService.ts";
import type { CreateScanRequest, ScanType } from "../api/scanService.ts";
import { toast } from "sonner";

interface NewScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewScanModal = ({ isOpen, onClose }: NewScanModalProps) => {
  const [targetUrl, setTargetUrl] = useState("");
  const [scanType, setScanType] = useState<ScanType>("full");
  const queryClient = useQueryClient();

  const createScanMutation = useMutation({
    mutationFn: (data: CreateScanRequest) => scanService.createScan(data),
    onSuccess: () => {
      toast.success("¡Escaneo creado exitosamente!");
      queryClient.invalidateQueries({ queryKey: ["scans"] });
      onClose();
      setTargetUrl("");
      setScanType("full");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || "Error al crear el escaneo");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!targetUrl.trim()) {
      toast.error("Por favor ingresa una URL");
      return;
    }

    // Validar formato URL
    try {
      new URL(targetUrl);
    } catch {
      toast.error("Por favor ingresa una URL válida (ej: https://example.com)");
      return;
    }

    createScanMutation.mutate({
      target_url: targetUrl,
      scan_type: scanType,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Cerrar modal"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nuevo Escaneo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Objetivo
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Ingresa la URL completa incluyendo http:// o https://
            </p>
          </div>

          {/* Scan Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tipo de Escaneo
            </label>
            <div className="grid grid-cols-1 gap-3">
              <label
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  scanType === "ssl"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="scanType"
                  value="ssl"
                  checked={scanType === "ssl"}
                  onChange={(e) => setScanType(e.target.value as ScanType)}
                  className="sr-only"
                />
                <Shield
                  className={`h-5 w-5 mr-3 ${scanType === "ssl" ? "text-blue-600" : "text-gray-400"}`}
                />
                <div className="flex-1">
                  <div
                    className={`font-medium ${scanType === "ssl" ? "text-blue-600" : "text-gray-900 dark:text-white"}`}
                  >
                    Escaneo SSL/TLS
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Verifica certificados y configuración SSL
                  </div>
                </div>
              </label>

              <label
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  scanType === "headers"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="scanType"
                  value="headers"
                  checked={scanType === "headers"}
                  onChange={(e) => setScanType(e.target.value as ScanType)}
                  className="sr-only"
                />
                <Shield
                  className={`h-5 w-5 mr-3 ${scanType === "headers" ? "text-blue-600" : "text-gray-400"}`}
                />
                <div className="flex-1">
                  <div
                    className={`font-medium ${scanType === "headers" ? "text-blue-600" : "text-gray-900 dark:text-white"}`}
                  >
                    Headers de Seguridad
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Analiza cabeceras HTTP de seguridad
                  </div>
                </div>
              </label>

              <label
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  scanType === "full"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="scanType"
                  value="full"
                  checked={scanType === "full"}
                  onChange={(e) => setScanType(e.target.value as ScanType)}
                  className="sr-only"
                />
                <Zap
                  className={`h-5 w-5 mr-3 ${scanType === "full" ? "text-blue-600" : "text-gray-400"}`}
                />
                <div className="flex-1">
                  <div
                    className={`font-medium ${scanType === "full" ? "text-blue-600" : "text-gray-900 dark:text-white"}`}
                  >
                    Escaneo Completo
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Análisis completo de seguridad (Recomendado)
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createScanMutation.isPending}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createScanMutation.isPending ? "Creando..." : "Crear Escaneo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
