import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { Heart, Phone, Home, BookOpen, MapPin, Users, MessageCircle, User, Menu, X, AlertTriangle, LogIn, LogOut, Bell, ChevronDown, Settings, Award, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AccessibilityProvider } from "./AccessibilityContext";
import AccessibilityToolbar from "./AccessibilityToolbar";
import { useAuth } from "./AuthContext";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/knowledge", label: "急救知识", icon: BookOpen },
  { path: "/services", label: "急救服务", icon: MapPin },
  { path: "/community", label: "社区资源", icon: Users },
  { path: "/consultation", label: "在线咨询", icon: MessageCircle },
  { path: "/profile", label: "个人中心", icon: User },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Top Bar */}
        <div className="bg-red-600 text-white py-2 text-center">
          <Phone className="inline w-4 h-4 mr-1" />
          急救热线：<span className="tracking-wider" style={{ fontWeight: 700 }}>120</span> ｜ 社区急救中心：<span className="tracking-wider" style={{ fontWeight: 700 }}>010-8888-6666</span>
        </div>

        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-2 text-red-600">
              <Heart className="w-7 h-7 fill-red-600" />
              <span className="text-xl" style={{ fontWeight: 700 }}>社区医疗急救</span>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-colors ${
                      isActive ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-2 ml-2 pl-3 pr-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    onClick={() => setUserDropdown(!userDropdown)}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm" style={{ fontWeight: 700 }}>
                      {user.avatar}
                    </div>
                    <span style={{ fontWeight: 600 }}>{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userDropdown ? "rotate-180" : ""}`} />
                    {user.unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontWeight: 700 }}>{user.unreadNotifications}</span>
                    )}
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center" style={{ fontWeight: 700 }}>
                            {user.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{user.name}</div>
                            <div className="text-xs text-gray-500">{user.community}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-red-200/60 text-red-700 px-2 py-0.5 rounded-full">{user.role}</span>
                          <span className="text-xs bg-yellow-200/60 text-yellow-700 px-2 py-0.5 rounded-full">{user.certLevel}</span>
                        </div>
                      </div>
                      <div className="py-1">
                        <NavLink to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
                          <User className="w-4 h-4 text-gray-400" /> 个人中心
                        </NavLink>
                        <NavLink to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Award className="w-4 h-4 text-gray-400" /> 我的证书
                        </NavLink>
                        <NavLink to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors relative">
                          <Bell className="w-4 h-4 text-gray-400" /> 消息通知
                          {user.unreadNotifications > 0 && (
                            <span className="ml-auto text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">{user.unreadNotifications}条新消息</span>
                          )}
                        </NavLink>
                        <NavLink to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" /> 系统设置
                        </NavLink>
                      </div>
                      <div className="border-t">
                        <button
                          onClick={() => { logout(); setUserDropdown(false); navigate("/"); }}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" /> 退出登录
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center gap-1.5 ml-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  登录
                </NavLink>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="md:hidden bg-white border-t px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-lg ${
                      isActive ? "bg-red-50 text-red-600" : "text-gray-600"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
              {user ? (
                <div className="space-y-1">
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-red-600 text-white"
                  >
                    <User className="w-5 h-5" />
                    个人中心
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-red-600 text-white"
                  >
                    <LogOut className="w-5 h-5" />
                    登出
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-red-600 text-white mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  登录 / 注册
                </NavLink>
              )}
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Accessibility Toolbar (Left Side) */}
        <AccessibilityToolbar />

        {/* SOS Floating Button (Right Side) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {sosOpen && (
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-6 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-red-600 flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-6 h-6" /> 紧急呼救
                </h3>
                <button
                  onClick={() => setSosOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="关闭紧急呼救面板"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-500 mb-4">如遇紧急情况，请选择以下方式获取帮助</p>
              <div className="space-y-3">
                <a
                  href="tel:120"
                  className="flex items-center gap-4 w-full px-5 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  aria-label="拨打120急救电话"
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-lg" style={{ fontWeight: 700 }}>拨打 120</div>
                    <div className="text-red-200">全国急救热线</div>
                  </div>
                </a>
                <a
                  href="tel:01088886666"
                  className="flex items-center gap-4 w-full px-5 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                  aria-label="拨打社区急救中心电话"
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-lg" style={{ fontWeight: 700 }}>社区急救中心</div>
                    <div className="text-orange-200">010-8888-6666</div>
                  </div>
                </a>
                <a
                  href="tel:110"
                  className="flex items-center gap-4 w-full px-5 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  aria-label="拨打110报警电话"
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-lg" style={{ fontWeight: 700 }}>拨打 110</div>
                    <div className="text-blue-200">报警电话</div>
                  </div>
                </a>
                <a
                  href="tel:119"
                  className="flex items-center gap-4 w-full px-5 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                  aria-label="拨打119火警电话"
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-lg" style={{ fontWeight: 700 }}>拨打 119</div>
                    <div className="text-yellow-100">火警电话</div>
                  </div>
                </a>
              </div>
            </div>
          )}
          <button
            onClick={() => setSosOpen(!sosOpen)}
            className={`w-20 h-20 rounded-full shadow-xl flex items-center justify-center transition-all ${
              sosOpen
                ? "bg-gray-600 hover:bg-gray-700 scale-90"
                : "bg-red-600 hover:bg-red-700 animate-pulse hover:animate-none scale-100"
            }`}
            aria-label="紧急呼救"
          >
            {sosOpen ? (
              <X className="w-8 h-8 text-white" />
            ) : (
              <span className="text-white text-lg" style={{ fontWeight: 800, letterSpacing: "0.08em" }}>SOS</span>
            )}
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white mb-3">关于我们</h4>
              <p className="leading-relaxed">社区医疗急救平台致力于为社区居民提供专业、及时的急救知识和服务，打造安全健康的社区环境。</p>
            </div>
            <div>
              <h4 className="text-white mb-3">快速链接</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink to={item.path} className="hover:text-white transition-colors">{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">联系方式</h4>
              <ul className="space-y-2">
                <li>急救热线：120</li>
                <li>社区电话：010-8888-6666</li>
                <li>地址：北京市朝阳区社区卫生服务中心</li>
                <li>邮箱：help@community-aid.cn</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center text-gray-500">
            © 2026 社区医疗急救平台 · 守护生命每一秒
          </div>
        </footer>
      </div>
    </AccessibilityProvider>
  );
}