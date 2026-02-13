import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Shield,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Settings,
  BarChart3,
  Bell,
  User,
  HelpCircle,
} from "lucide-react";
import { useAuthStore } from "../store/authStore.ts";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      current: true,
    },
    { name: "Analytics", icon: BarChart3, href: "/analytics", current: false },
    { name: "Documentation", icon: BookOpen, href: "/docs", current: false },
    { name: "Settings", icon: Settings, href: "/settings", current: false },
    {
      name: "Help & Support",
      icon: HelpCircle,
      href: "/support",
      current: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SecureCheck
              </span>
              <span className="hidden sm:block text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ENTERPRISE
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.full_name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.full_name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 fixed h-full transition-all duration-300`}
        >
          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.current
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Card in Sidebar */}
          {sidebarOpen && (
            <div className="absolute bottom-8 left-4 right-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.full_name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">Pro Plan</p>
                  </div>
                </div>
                <Link
                  to="/settings"
                  className="block w-full text-center py-2 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Manage Account
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
