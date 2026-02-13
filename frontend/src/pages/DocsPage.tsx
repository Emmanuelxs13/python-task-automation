import { Link } from "react-router-dom";
import {
  Shield,
  BookOpen,
  FileText,
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
  const sections = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "blue",
      items: [
        { title: "Quick Start Guide", href: "#quick-start" },
        { title: "Creating Your First Scan", href: "#first-scan" },
        { title: "Understanding Results", href: "#results" },
      ],
    },
    {
      title: "API Reference",
      icon: Code,
      color: "purple",
      items: [
        { title: "Authentication", href: "#auth" },
        { title: "Scan Endpoints", href: "#scan-api" },
        { title: "Reports & Analytics", href: "#reports-api" },
      ],
    },
    {
      title: "Configuration",
      icon: Settings,
      color: "green",
      items: [
        { title: "Scan Types", href: "#scan-types" },
        { title: "Webhooks", href: "#webhooks" },
        { title: "Integration", href: "#integration" },
      ],
    },
    {
      title: "Best Practices",
      icon: BarChart,
      color: "orange",
      items: [
        { title: "Security Guidelines", href: "#guidelines" },
        { title: "Performance Tips", href: "#performance" },
        { title: "Compliance", href: "#compliance" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SecureCheck
              </span>
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation & Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to master SecureCheck
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Link
            to="#quick-start"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Start</h3>
            <p className="text-sm text-gray-600">
              Get up and running in 5 minutes
            </p>
          </Link>

          <Link
            to="#api"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-sm text-gray-600">Complete API documentation</p>
          </Link>

          <Link
            to="#video"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Video Tutorials
            </h3>
            <p className="text-sm text-gray-600">Learn by watching</p>
          </Link>

          <Link
            to="#support"
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
          >
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <MessageCircle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Support</h3>
            <p className="text-sm text-gray-600">Contact our team</p>
          </Link>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`bg-${section.color}-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3`}
                  >
                    <Icon className={`h-5 w-5 text-${section.color}-600`} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-gray-700 group-hover:text-blue-600">
                          {item.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Quick Start Guide */}
        <div
          id="quick-start"
          className="mt-12 bg-white rounded-xl border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🚀 Quick Start Guide
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 1: Create Your Account
              </h3>
              <p className="text-gray-600 mb-3">
                Sign up with your company email and verify your account.
              </p>
              <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                POST /api/v1/auth/register
              </code>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 2: Run Your First Scan
              </h3>
              <p className="text-gray-600 mb-3">
                Navigate to Dashboard → New Scan. Enter your target URL and
                select scan type:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>
                  <strong>Basic:</strong> Quick security check (30 seconds)
                </li>
                <li>
                  <strong>Headers:</strong> Security headers analysis (45
                  seconds)
                </li>
                <li>
                  <strong>SSL/TLS:</strong> Certificate and encryption check (1
                  minute)
                </li>
                <li>
                  <strong>Full:</strong> Comprehensive security audit (2-3
                  minutes)
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 3: Analyze Results
              </h3>
              <p className="text-gray-600 mb-3">
                Review vulnerabilities categorized by severity:
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  Critical
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  High
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Medium
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Low
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Info
                </span>
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Step 4: Export Reports
              </h3>
              <p className="text-gray-600">
                Download results in JSON or CSV format for team sharing and
                compliance.
              </p>
            </div>
          </div>
        </div>

        {/* API Example */}
        <div id="api" className="mt-12 bg-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Code className="h-6 w-6 mr-2" />
            API Integration Example
          </h2>
          <pre className="bg-black rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-green-400">{`// Initialize scan via API
fetch('http://localhost:8000/api/v1/scans', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    target_url: 'https://example.com',
    scan_type: 'full'
  })
})
.then(res => res.json())
.then(data => console.log('Scan ID:', data.id));

// Check scan status
fetch(\`http://localhost:8000/api/v1/scans/\${scanId}\`)
  .then(res => res.json())
  .then(scan => console.log('Status:', scan.status));`}</code>
          </pre>
        </div>

        {/* Support Section */}
        <div
          id="support"
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-blue-100 mb-6">
            Our enterprise support team is available 24/7
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📧 Email</h3>
              <p className="text-sm text-blue-100">support@securecheck.io</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">💬 Live Chat</h3>
              <p className="text-sm text-blue-100">Available 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📞 Phone</h3>
              <p className="text-sm text-blue-100">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
