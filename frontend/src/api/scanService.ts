import api from "./axios";
import type { Scan, CreateScanRequest } from "../types";

export const scanService = {
  // Get all scans
  async getScans(): Promise<Scan[]> {
    const response = await api.get<Scan[]>("/api/v1/scans");
    return response.data;
  },

  // Get scan by ID
  async getScanById(id: number): Promise<Scan> {
    const response = await api.get<Scan>(`/api/v1/scans/${id}`);
    return response.data;
  },

  // Create new scan
  async createScan(data: CreateScanRequest): Promise<Scan> {
    const response = await api.post<Scan>("/api/v1/scans", data);
    return response.data;
  },

  // Delete scan
  async deleteScan(id: number): Promise<void> {
    await api.delete(`/api/v1/scans/${id}`);
  },
};
