import api from "./axios";

export type ScanType = "ssl" | "headers" | "full";

export interface CreateScanRequest {
  target_url: string;
  scan_type: ScanType;
}

export const scanService = {
  // Get all scans
  async getScans() {
    const response = await api.get("/api/v1/scans");
    return response.data;
  },

  // Create new scan
  async createScan(data: CreateScanRequest) {
    const response = await api.post("/api/v1/scans", data);
    return response.data;
  },

  // Get scan by ID
  async getScan(id: number) {
    const response = await api.get(`/api/v1/scans/${id}`);
    return response.data;
  },

  // Delete scan
  async deleteScan(id: number) {
    const response = await api.delete(`/api/v1/scans/${id}`);
    return response.data;
  },

  // Restart scan
  async restartScan(id: number) {
    const response = await api.post(`/api/v1/scans/${id}/restart`);
    return response.data;
  },
};
