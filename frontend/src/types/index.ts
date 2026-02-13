// Authentication types
export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Scan types
export type ScanType = "basic" | "headers" | "ssl" | "full";
export type ScanStatus = "pending" | "running" | "completed" | "failed";
export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface Scan {
  id: number;
  user_id: number;
  target_url: string;
  scan_type: ScanType;
  status: ScanStatus;
  created_at: string;
  completed_at: string | null;
  vulnerabilities?: Vulnerability[];
}

export interface Vulnerability {
  id: number;
  scan_id: number;
  severity: Severity;
  title: string;
  description: string;
  recommendation: string | null;
  created_at: string;
}

export interface CreateScanRequest {
  target_url: string;
  scan_type: ScanType;
}
