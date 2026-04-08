import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Heart, Phone, Lock, Eye, EyeOff, User, Shield, MessageCircle,
  ChevronRight, ArrowLeft, CheckCircle, AlertCircle, Smartphone, Mail, KeyRound
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "./AuthContext";

type LoginMode = "password" | "sms" | "qrcode";
type PageView = "login" | "register" | "forgot";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const [pageView, setPageView] = useState<PageView>("login");
  const [loginMode, setLoginMode] = useState<LoginMode>("password");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Registration fields
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regSmsCode, setRegSmsCode] = useState("");
  const [regCommunity, setRegCommunity] = useState("");

  // Forgot password
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotSmsCode, setForgotSmsCode] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState(1);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate("/profile");
  }, [isLoggedIn, navigate]);

  const sendSmsCode = () => {
    const target = pageView === "login" ? phone : pageView === "register" ? regPhone : forgotPhone;
    if (!target || !/^1\d{10}$/.test(target)) {
      setErrors((prev) => ({ ...prev, phone: "请输入正确的11位手机号" }));
      return;
    }
    setErrors((prev) => ({ ...prev, phone: "" }));
    setCountdown(60);
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!phone) newErrors.phone = "请输入手机号";
    else if (!/^1\d{10}$/.test(phone)) newErrors.phone = "请输入正确的11位手机号";

    if (loginMode === "password") {
      if (!password) newErrors.password = "请输入密码";
      else if (password.length < 6) newErrors.password = "密码至少6位";
    } else if (loginMode === "sms") {
      if (!smsCode) newErrors.smsCode = "请输入验证码";
      else if (smsCode.length !== 6) newErrors.smsCode = "验证码为6位数字";
    }

    if (!agreedTerms) newErrors.terms = "请阅读并同意用户协议";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: Record<string, string> = {};
    if (!regName) newErrors.regName = "请输入姓名";
    if (!regPhone) newErrors.regPhone = "请输入手机号";
    else if (!/^1\d{10}$/.test(regPhone)) newErrors.regPhone = "请输入正确的手机号";
    if (!regSmsCode) newErrors.regSmsCode = "请输入验证码";
    if (!regPassword) newErrors.regPassword = "请设置密码";
    else if (regPassword.length < 6) newErrors.regPassword = "密码至少6位";
    if (regPassword !== regConfirmPassword) newErrors.regConfirmPassword = "两次密码输入不一致";
    if (!regCommunity) newErrors.regCommunity = "请选择所属社区";
    if (!agreedTerms) newErrors.terms = "请阅读并同意用户协议";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateLogin()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      login(undefined, phone, undefined);
      setIsSubmitting(false);
      setLoginSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    }, 1500);
  };

  const handleRegister = () => {
    if (!validateRegister()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      login(regName, regPhone, regCommunity);
      setIsSubmitting(false);
      setLoginSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    }, 1500);
  };

  const handleForgotSubmit = () => {
    if (forgotStep === 1) {
      const newErrors: Record<string, string> = {};
      if (!forgotPhone || !/^1\d{10}$/.test(forgotPhone)) newErrors.forgotPhone = "请输入正确的手机号";
      if (!forgotSmsCode) newErrors.forgotSmsCode = "请输入验证码";
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) setForgotStep(2);
    } else {
      const newErrors: Record<string, string> = {};
      if (!forgotNewPassword || forgotNewPassword.length < 6) newErrors.forgotNewPassword = "密码至少6位";
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setPageView("login");
          setForgotStep(1);
        }, 1500);
      }
    }
  };

  // Success overlay
  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl text-white mb-2" style={{ fontWeight: 700 }}>
            {pageView === "register" ? "注册成功" : "登录成功"}
          </h2>
          <p className="text-red-100">正在跳转到个人中心...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Decorative Panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-15">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758653500534-a47f6cd8abb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsJTIwaGFsbHdheXxlbnwxfHx8fDE3NzUwODk2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="medical background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent" />

        <div className="relative z-10">
          <NavLink to="/" className="flex items-center gap-3 text-white">
            <Heart className="w-9 h-9 fill-white" />
            <span className="text-2xl" style={{ fontWeight: 700 }}>社区医疗急救</span>
          </NavLink>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl text-white mb-6 leading-tight" style={{ fontWeight: 700 }}>
            守护生命<br />从社区开始
          </h1>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-md">
            加入社区医疗急救平台，学习专业急救知识，成为生命守护者。您的每一次学习，都可能在关键时刻挽救一条生命。
          </p>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: Shield, text: "专业急救知识，随时随地学习" },
              { icon: Phone, text: "一键呼救，3分钟平均响应" },
              { icon: User, text: "1,200+ 志愿者在线守护" },
              { icon: MessageCircle, text: "AI助手 + 专业医生在线咨询" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-red-200 text-sm">
          © 2026 社区医疗急救平台 · 守护生命每一秒
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden bg-red-600 text-white p-4 flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-white" />
            <span className="text-lg" style={{ fontWeight: 700 }}>社区医疗急救</span>
          </NavLink>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Back to home */}
            <NavLink to="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-red-600 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> 返回首页
            </NavLink>

            {/* === LOGIN VIEW === */}
            {pageView === "login" && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>欢迎回来</h2>
                  <p className="text-gray-500">登录您的社区医疗急救账号</p>
                </div>

                {/* Login Mode Tabs */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                  {([
                    { id: "password" as LoginMode, label: "密码登录", icon: Lock },
                    { id: "sms" as LoginMode, label: "验证码登录", icon: Smartphone },
                  ]).map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => { setLoginMode(mode.id); setErrors({}); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                        loginMode === mode.id
                          ? "bg-white text-red-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      style={loginMode === mode.id ? { fontWeight: 600 } : {}}
                    >
                      <mode.icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Phone Input */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>手机号</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        maxLength={11}
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, phone: "" })); }}
                        placeholder="请输入手机号"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200 focus:border-red-300"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  {loginMode === "password" && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>密码</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                          placeholder="请输入密码"
                          className={`w-full pl-12 pr-12 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.password ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200 focus:border-red-300"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPassword ? "隐藏密码" : "显示密码"}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.password}</p>}
                    </div>
                  )}

                  {/* SMS Code */}
                  {loginMode === "sms" && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>验证码</label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            maxLength={6}
                            value={smsCode}
                            onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, smsCode: "" })); }}
                            placeholder="请输入6位验证码"
                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                              errors.smsCode ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200 focus:border-red-300"
                            }`}
                          />
                        </div>
                        <button
                          onClick={sendSmsCode}
                          disabled={countdown > 0}
                          className="px-5 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontWeight: 600 }}
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </button>
                      </div>
                      {errors.smsCode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.smsCode}</p>}
                    </div>
                  )}
                </div>

                {/* Remember & Forgot */}
                {loginMode === "password" && (
                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                      <span className="text-sm text-gray-600">记住登录</span>
                    </label>
                    <button onClick={() => { setPageView("forgot"); setErrors({}); }} className="text-sm text-red-600 hover:underline">
                      忘记密码？
                    </button>
                  </div>
                )}

                {/* Terms */}
                <label className="flex items-start gap-2 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => { setAgreedTerms(e.target.checked); setErrors((p) => ({ ...p, terms: "" })); }}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-500">
                    我已阅读并同意
                    <button className="text-red-600 hover:underline mx-0.5">《用户服务协议》</button>
                    和
                    <button className="text-red-600 hover:underline mx-0.5">《隐私保护政策》</button>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-sm -mt-4 mb-4 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.terms}</p>}

                {/* Submit */}
                <button
                  onClick={handleLogin}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      登录中...
                    </span>
                  ) : (
                    "登 录"
                  )}
                </button>

                {/* Register link */}
                <div className="text-center mt-6">
                  <span className="text-gray-500">还没有账号？</span>
                  <button onClick={() => { setPageView("register"); setErrors({}); setAgreedTerms(false); }} className="text-red-600 hover:underline ml-1" style={{ fontWeight: 600 }}>
                    立即注册
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-gray-400">其他登录方式</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-6">
                  {[
                    { name: "微信", color: "bg-green-500", letter: "微" },
                    { name: "支付宝", color: "bg-blue-500", letter: "支" },
                    { name: "社区卡", color: "bg-orange-500", letter: "社" },
                  ].map((s) => (
                    <button
                      key={s.name}
                      className="flex flex-col items-center gap-2 group"
                      aria-label={`使用${s.name}登录`}
                    >
                      <div className={`w-12 h-12 ${s.color} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md`} style={{ fontWeight: 700 }}>
                        {s.letter}
                      </div>
                      <span className="text-xs text-gray-500">{s.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* === REGISTER VIEW === */}
            {pageView === "register" && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>创建账号</h2>
                  <p className="text-gray-500">加入社区医疗急救平台，守护家人安全</p>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>姓名</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => { setRegName(e.target.value); setErrors((p) => ({ ...p, regName: "" })); }}
                        placeholder="请输入真实姓名"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                      />
                    </div>
                    {errors.regName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>手机号</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        maxLength={11}
                        value={regPhone}
                        onChange={(e) => { setRegPhone(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, regPhone: "" })); }}
                        placeholder="请输入手机号"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regPhone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                      />
                    </div>
                    {errors.regPhone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regPhone}</p>}
                  </div>

                  {/* SMS Code */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>验证码</label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          maxLength={6}
                          value={regSmsCode}
                          onChange={(e) => { setRegSmsCode(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, regSmsCode: "" })); }}
                          placeholder="请输入6位验证码"
                          className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regSmsCode ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                        />
                      </div>
                      <button
                        onClick={sendSmsCode}
                        disabled={countdown > 0}
                        className="px-5 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap disabled:opacity-50"
                        style={{ fontWeight: 600 }}
                      >
                        {countdown > 0 ? `${countdown}s` : "获取验证码"}
                      </button>
                    </div>
                    {errors.regSmsCode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regSmsCode}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>设置密码</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => { setRegPassword(e.target.value); setErrors((p) => ({ ...p, regPassword: "" })); }}
                        placeholder="请设置密码（至少6位）"
                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regPassword ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.regPassword && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regPassword}</p>}
                    {/* Password Strength */}
                    {regPassword && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full ${
                                regPassword.length >= level * 4
                                  ? level === 1 ? "bg-red-400" : level === 2 ? "bg-yellow-400" : "bg-green-400"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs ${
                          regPassword.length >= 12 ? "text-green-600" : regPassword.length >= 8 ? "text-yellow-600" : "text-red-500"
                        }`}>
                          {regPassword.length >= 12 ? "强" : regPassword.length >= 8 ? "中" : "弱"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>确认密码</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => { setRegConfirmPassword(e.target.value); setErrors((p) => ({ ...p, regConfirmPassword: "" })); }}
                        placeholder="请再次输入密码"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regConfirmPassword ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                      />
                      {regConfirmPassword && regConfirmPassword === regPassword && (
                        <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.regConfirmPassword && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regConfirmPassword}</p>}
                  </div>

                  {/* Community */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>所属社区</label>
                    <select
                      value={regCommunity}
                      onChange={(e) => { setRegCommunity(e.target.value); setErrors((p) => ({ ...p, regCommunity: "" })); }}
                      className={`w-full px-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.regCommunity ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                    >
                      <option value="">请选择所属社区</option>
                      <option value="阳光花园社区">阳光花园社区</option>
                      <option value="东三环社区">东三环社区</option>
                      <option value="建国路社区">建国路社区</option>
                      <option value="光华路社区">光华路社区</option>
                      <option value="国贸社区">国贸社区</option>
                      <option value="朝阳公园社区">朝阳公园社区</option>
                    </select>
                    {errors.regCommunity && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.regCommunity}</p>}
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => { setAgreedTerms(e.target.checked); setErrors((p) => ({ ...p, terms: "" })); }}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-500">
                    我已阅读并同意
                    <button className="text-red-600 hover:underline mx-0.5">《用户服务协议》</button>和
                    <button className="text-red-600 hover:underline mx-0.5">《隐私保护政策》</button>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-sm -mt-4 mb-4 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.terms}</p>}

                <button
                  onClick={handleRegister}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      注册中...
                    </span>
                  ) : (
                    "注 册"
                  )}
                </button>

                <div className="text-center mt-6">
                  <span className="text-gray-500">已有账号？</span>
                  <button onClick={() => { setPageView("login"); setErrors({}); setAgreedTerms(false); }} className="text-red-600 hover:underline ml-1" style={{ fontWeight: 600 }}>
                    返回登录
                  </button>
                </div>
              </>
            )}

            {/* === FORGOT PASSWORD VIEW === */}
            {pageView === "forgot" && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>找回密码</h2>
                  <p className="text-gray-500">
                    {forgotStep === 1 ? "请验证您的手机号" : "请设置新的密码"}
                  </p>
                  {/* Steps */}
                  <div className="flex items-center gap-3 mt-6">
                    <div className={`flex items-center gap-2 ${forgotStep >= 1 ? "text-red-600" : "text-gray-400"}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${forgotStep >= 1 ? "bg-red-600 text-white" : "bg-gray-200"}`} style={{ fontWeight: 600 }}>1</span>
                      <span className="text-sm" style={{ fontWeight: 500 }}>验证手机</span>
                    </div>
                    <div className={`flex-1 h-px ${forgotStep >= 2 ? "bg-red-600" : "bg-gray-200"}`} />
                    <div className={`flex items-center gap-2 ${forgotStep >= 2 ? "text-red-600" : "text-gray-400"}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${forgotStep >= 2 ? "bg-red-600 text-white" : "bg-gray-200"}`} style={{ fontWeight: 600 }}>2</span>
                      <span className="text-sm" style={{ fontWeight: 500 }}>重置密码</span>
                    </div>
                  </div>
                </div>

                {forgotStep === 1 && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>手机号</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          maxLength={11}
                          value={forgotPhone}
                          onChange={(e) => { setForgotPhone(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, forgotPhone: "" })); }}
                          placeholder="请输入注册时的手机号"
                          className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.forgotPhone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                        />
                      </div>
                      {errors.forgotPhone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.forgotPhone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>验证码</label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            maxLength={6}
                            value={forgotSmsCode}
                            onChange={(e) => { setForgotSmsCode(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, forgotSmsCode: "" })); }}
                            placeholder="请输入6位验证码"
                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.forgotSmsCode ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                          />
                        </div>
                        <button
                          onClick={sendSmsCode}
                          disabled={countdown > 0}
                          className="px-5 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap disabled:opacity-50"
                          style={{ fontWeight: 600 }}
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </button>
                      </div>
                      {errors.forgotSmsCode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.forgotSmsCode}</p>}
                    </div>
                  </div>
                )}

                {forgotStep === 2 && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1.5" style={{ fontWeight: 500 }}>新密码</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={forgotNewPassword}
                          onChange={(e) => { setForgotNewPassword(e.target.value); setErrors((p) => ({ ...p, forgotNewPassword: "" })); }}
                          placeholder="请输入新密码（至少6位）"
                          className={`w-full pl-12 pr-12 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 ${errors.forgotNewPassword ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"}`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.forgotNewPassword && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.forgotNewPassword}</p>}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleForgotSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      处理中...
                    </span>
                  ) : forgotStep === 1 ? (
                    "下一步"
                  ) : (
                    "重置密码"
                  )}
                </button>

                <div className="text-center mt-6">
                  <button
                    onClick={() => { setPageView("login"); setErrors({}); setForgotStep(1); }}
                    className="text-red-600 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" /> 返回登录
                  </button>
                </div>
              </>
            )}

            {/* Emergency reminder */}
            <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500 shrink-0" />
              <div className="text-sm">
                <span className="text-red-700" style={{ fontWeight: 600 }}>紧急情况无需登录</span>
                <span className="text-red-500"> — 直接拨打 </span>
                <a href="tel:120" className="text-red-600 hover:underline" style={{ fontWeight: 700 }}>120</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}