// Mock data para desarrollo sin backend
export const mockScans = [
  {
    id: 1,
    target_url: "https://example.com",
    scan_type: "full",
    status: "completed",
    vulnerabilities: [
      {
        type: "missing_header",
        severity: "medium",
        title: "Falta header de seguridad X-Frame-Options",
        description: "Tu sitio podría ser vulnerable a clickjacking",
        recommendation: "Agrega el header X-Frame-Options: DENY",
      },
      {
        type: "ssl_issue",
        severity: "low",
        title: "Certificado SSL expira pronto",
        description: "El certificado SSL expirará en 30 días",
        recommendation: "Renovar certificado SSL",
      },
    ],
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  },
  {
    id: 2,
    target_url: "https://github.com",
    scan_type: "ssl",
    status: "running",
    vulnerabilities: [],
    created_at: new Date(Date.now() - 300000).toISOString(),
    completed_at: null,
  },
  {
    id: 3,
    target_url: "https://google.com",
    scan_type: "headers",
    status: "pending",
    vulnerabilities: [],
    created_at: new Date(Date.now() - 600000).toISOString(),
    completed_at: null,
  },
  {
    id: 4,
    target_url: "https://test-site.com",
    scan_type: "full",
    status: "failed",
    vulnerabilities: [],
    created_at: new Date(Date.now() - 900000).toISOString(),
    completed_at: new Date(Date.now() - 850000).toISOString(),
  },
];

let nextId = 5;

export const mockScanService = {
  getScans: async () => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockScans;
  },

  createScan: async (data: { target_url: string; scan_type: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newScan = {
      id: nextId++,
      target_url: data.target_url,
      scan_type: data.scan_type,
      status: "pending",
      vulnerabilities: [],
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    mockScans.unshift(newScan);

    // Simular que después de 3 segundos pasa a running
    setTimeout(() => {
      newScan.status = "running";
    }, 3000);

    // Y después de 8 segundos se completa
    setTimeout(() => {
      newScan.status = "completed";
      newScan.completed_at = new Date().toISOString();
      newScan.vulnerabilities = [
        {
          type: "test",
          severity: "low",
          title: "Test vulnerability",
          description: "This is a test",
          recommendation: "Fix this",
        },
      ];
    }, 8000);

    return newScan;
  },

  getScan: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockScans.find((s) => s.id === id) || null;
  },

  deleteScan: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockScans.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockScans.splice(index, 1);
    }
    return { success: true };
  },

  restartScan: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const scan = mockScans.find((s) => s.id === id);
    if (scan) {
      scan.status = "pending";
      scan.vulnerabilities = [];
      scan.completed_at = null;

      setTimeout(() => {
        scan.status = "running";
      }, 2000);

      setTimeout(() => {
        scan.status = "completed";
        scan.completed_at = new Date().toISOString();
      }, 6000);
    }
    return scan;
  },
};
