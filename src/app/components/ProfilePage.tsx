import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  User, Shield, BookOpen, Award, Bell, Settings, LogOut, ChevronRight, Heart,
  Clock, CheckCircle, Calendar, MapPin, Phone, Mail, Edit, X, Star, Trophy,
  Target, Flame, Zap, Eye, TrendingUp, Download, LogIn, BarChart3, PieChart
} from "lucide-react";
import { useAuth } from "./AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} from "recharts";

const mockUser = {
  name: "李明",
  phone: "138****8888",
  email: "liming@example.com",
  community: "阳光花园社区",
  role: "注册志愿者",
  certLevel: "中级急救员",
  joinDate: "2025-06-15",
  avatar: "李",
  bio: "热心社区急救事业，致力于普及急救知识",
};

const certifications = [
  { name: "CPR急救证书", issuer: "中国红十字会", date: "2025-08-20", expiry: "2027-08-20", status: "有效", level: "高级" },
  { name: "AED操作证书", issuer: "社区卫生服务中心", date: "2025-10-15", expiry: "2027-10-15", status: "有效", level: "中级" },
  { name: "初级急救员证", issuer: "北京市急救中心", date: "2025-06-10", expiry: "2026-06-10", status: "即将到期", level: "初级" },
];

const learningHistory = [
  { title: "心肺复苏（CPR）操作指南", date: "2026-03-28", completed: true, score: 95, duration: "45分钟", category: "心脏急救" },
  { title: "AED使用方法", date: "2026-03-25", completed: true, score: 88, duration: "30分钟", category: "心脏急救" },
  { title: "外伤止血与包扎技巧", date: "2026-03-20", completed: true, score: 92, duration: "35分钟", category: "外伤处理" },
  { title: "烧烫伤紧急处理", date: "2026-03-15", completed: false, score: 0, duration: "进行中", category: "烧烫伤" },
  { title: "脑卒中快速识别与急救", date: "2026-03-10", completed: true, score: 90, duration: "25分钟", category: "脑卒中" },
  { title: "食物中毒应急处理", date: "2026-03-05", completed: true, score: 85, duration: "20分钟", category: "中毒急救" },
];

const rescueRecords = [
  { date: "2026-03-15", type: "心脏骤停", location: "阳光花园小区", result: "成功", role: "主要施救者", detail: "一位68岁老人在晨练时突然倒地，我第一时间进行CPR并使用AED，在120到达前维持了患者生命体征。" },
  { date: "2026-02-28", type: "外伤出血", location: "社区公园", result: "成功", role: "辅助施救者", detail: "一名儿童在玩耍时摔倒导致前额大量出血，协助家长进行止血包扎处理。" },
  { date: "2026-01-10", type: "跌倒骨折", location: "建国路", result: "成功", role: "协调指挥", detail: "一位老人在路面结冰时滑倒，疑似腿部骨折。指挥现场围观群众保护伤者，拨打120并陪同就医。" },
];

const notifications = [
  { id: 1, title: "CPR培训第12期报名已开始", time: "2小时前", read: false, type: "培训" },
  { id: 2, title: "您的初级急救员证将于3个月后到期", time: "1天前", read: false, type: "证书" },
  { id: 3, title: "新增AED设备点位：社区体育公园", time: "3天前", read: true, type: "设备" },
  { id: 4, title: "2月份志愿服务时长已记录", time: "5天前", read: true, type: "服务" },
  { id: 5, title: "恭喜获得「急救先锋」勋章", time: "1周前", read: true, type: "成就" },
  { id: 6, title: "社区急救知识宣传日活动提醒", time: "1周前", read: true, type: "活动" },
];

const achievements = [
  { name: "急救先锋", desc: "完成首次紧急救助", icon: Star, achieved: true, date: "2026-01-10" },
  { name: "生命守护者", desc: "成功救助3次以上", icon: Heart, achieved: true, date: "2026-03-15" },
  { name: "知识达人", desc: "完成5门急救课程", icon: BookOpen, achieved: true, date: "2026-03-10" },
  { name: "培训导师", desc: "参与10次培训教学", icon: Award, achieved: false, progress: "3/10" },
  { name: "社区之星", desc: "志愿时长超过100小时", icon: Trophy, achieved: false, progress: "48/100" },
  { name: "满分学员", desc: "课程考核获得100分", icon: Target, achieved: false, progress: "最高95分" },
];

// Recharts data
const scoreBarData = learningHistory.filter(l => l.completed).map(l => ({
  name: l.title.length > 6 ? l.title.slice(0, 6) + "..." : l.title,
  fullName: l.title,
  score: l.score,
}));

const scoreTrendData = learningHistory.filter(l => l.completed).reverse().map((l, i) => ({
  name: l.date.slice(5),
  score: l.score,
  avg: 88,
}));

const radarData = [
  { skill: "心肺复苏", value: 95, fullMark: 100 },
  { skill: "AED操作", value: 88, fullMark: 100 },
  { skill: "止血包扎", value: 92, fullMark: 100 },
  { skill: "脑卒中识别", value: 90, fullMark: 100 },
  { skill: "中毒处理", value: 85, fullMark: 100 },
  { skill: "烧烫伤处理", value: 60, fullMark: 100 },
];

const scoreDistribution = [
  { range: "90-100", count: 3, color: "bg-green-500" },
  { range: "80-89", count: 2, color: "bg-blue-500" },
  { range: "70-79", count: 0, color: "bg-yellow-500" },
  { range: "60-69", count: 0, color: "bg-orange-500" },
  { range: "<60", count: 0, color: "bg-red-500" },
];

const barColors = ["#ef4444", "#f97316", "#3b82f6", "#8b5cf6", "#10b981"];

type Tab = "info" | "certs" | "learning" | "rescue" | "notifications" | "achievements" | "settings";

export default function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [editMode, setEditMode] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<Set<number>>(new Set(notifications.filter((n) => n.read).map((n) => n.id)));
  const [learningView, setLearningView] = useState<"records" | "analysis">("records");
  const [editSuccess, setEditSuccess] = useState(false);
  const [notificationDetail, setNotificationDetail] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "info", label: "基本信息", icon: User },
    { id: "certs", label: "资质证书", icon: Award },
    { id: "learning", label: "学习记录", icon: BookOpen },
    { id: "rescue", label: "救助记录", icon: Shield },
    { id: "achievements", label: "成就勋章", icon: Trophy },
    { id: "notifications", label: "消息通知", icon: Bell },
    { id: "settings", label: "系统设置", icon: Settings },
  ];

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;
  const completedCourses = learningHistory.filter((l) => l.completed).length;
  const avgScore = Math.round(learningHistory.filter((l) => l.completed).reduce((s, l) => s + l.score, 0) / completedCourses);
  const maxScore = Math.max(...learningHistory.filter(l => l.completed).map(l => l.score));
  const minScore = Math.min(...learningHistory.filter(l => l.completed).map(l => l.score));

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  const handleSaveProfile = () => {
    setEditSuccess(true);
    setTimeout(() => {
      setEditMode(false);
      setEditSuccess(false);
    }, 1200);
  };

  // Grade rating
  const getGradeRating = (score: number) => {
    if (score >= 95) return { label: "优秀+", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (score >= 90) return { label: "优秀", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (score >= 80) return { label: "良好", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
    if (score >= 70) return { label: "中等", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    return { label: "需提高", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };

  const rating = getGradeRating(avgScore);

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <NavLink to="/" className="hover:text-red-600">首页</NavLink>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">个人中心</span>
        </nav>

        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-red-300" />
          </div>
          <h2 className="text-2xl mb-3" style={{ fontWeight: 700 }}>请先登录</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            登录后即可查看个人信息、学习记录、资质证书、成就勋章等内容，享受完整的社区急救服务体验。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavLink
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-lg"
              style={{ fontWeight: 600 }}
            >
              <LogIn className="w-5 h-5" /> 登录账号
            </NavLink>
            <NavLink
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              style={{ fontWeight: 600 }}
            >
              注册新账号
            </NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {[
              { icon: BookOpen, title: "学习记录", desc: "追踪急救课程学习进度" },
              { icon: Award, title: "资质证书", desc: "管理急救相关证书" },
              { icon: Heart, title: "救助记录", desc: "记录每次生命守护" },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-gray-50 rounded-xl">
                <item.icon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayUser = user ? {
    ...mockUser,
    name: user.name,
    phone: user.phone,
    community: user.community,
    avatar: user.avatar,
    role: user.role,
    certLevel: user.certLevel,
  } : mockUser;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <NavLink to="/" className="hover:text-red-600">首页</NavLink>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">个人中心</span>
      </nav>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-sm" style={{ fontWeight: 700 }}>
            {displayUser.avatar}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{displayUser.name}</h1>
            <p className="text-red-100 text-sm mb-2">{displayUser.bio}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-red-100">
              <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full"><Shield className="w-3.5 h-3.5" />{displayUser.role}</span>
              <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full"><Award className="w-3.5 h-3.5" />{displayUser.certLevel}</span>
              <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full"><MapPin className="w-3.5 h-3.5" />{displayUser.community}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" /> 编辑资料
            </button>
          </div>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-white/20">
          {[
            { label: "救助次数", value: "3次" },
            { label: "学习课程", value: `${completedCourses}门` },
            { label: "平均成绩", value: `${avgScore}分` },
            { label: "志愿时长", value: "48h" },
            { label: "持有证书", value: "3本" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl" style={{ fontWeight: 700 }}>{s.value}</div>
              <div className="text-xs text-red-200 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors relative ${
              activeTab === tab.id ? "bg-red-600 text-white shadow-md" : "bg-white border text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.id === "notifications" && unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" style={{ fontWeight: 700 }}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "info" && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>基本信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: User, label: "姓名", value: displayUser.name },
              { icon: Phone, label: "手机号", value: displayUser.phone },
              { icon: Mail, label: "邮箱", value: displayUser.email },
              { icon: MapPin, label: "所属社区", value: displayUser.community },
              { icon: Shield, label: "角色", value: displayUser.role },
              { icon: Award, label: "急救等级", value: displayUser.certLevel },
              { icon: Calendar, label: "注册日期", value: displayUser.joinDate },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                  <div className="text-gray-700 mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "certs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">持有 {certifications.length} 本急救相关证书</p>
            <button className="text-sm text-red-600 hover:underline">申请新证书</button>
          </div>
          {certifications.map((cert) => (
            <div key={cert.name} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-yellow-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg">{cert.name}</h3>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{cert.level}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{cert.issuer}</div>
                    <div className="text-sm text-gray-400 mt-0.5">颁发日期：{cert.date} · 有效期至：{cert.expiry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm px-4 py-1.5 rounded-full ${
                    cert.status === "有效" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  }`} style={{ fontWeight: 600 }}>{cert.status}</span>
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" /> 下载
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "learning" && (
        <div>
          {/* Sub-tabs: Records / Analysis */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
            <button
              onClick={() => setLearningView("records")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
                learningView === "records" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"
              }`}
              style={learningView === "records" ? { fontWeight: 600 } : {}}
            >
              <BookOpen className="w-4 h-4" /> 学习记录
            </button>
            <button
              onClick={() => setLearningView("analysis")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
                learningView === "analysis" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"
              }`}
              style={learningView === "analysis" ? { fontWeight: 600 } : {}}
            >
              <BarChart3 className="w-4 h-4" /> 成绩分析
            </button>
          </div>

          {learningView === "records" ? (
            <>
              {/* Learning Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: BookOpen, label: "已完成课程", value: `${completedCourses}门`, color: "text-blue-600" },
                  { icon: Target, label: "平均成绩", value: `${avgScore}分`, color: "text-green-600" },
                  { icon: Clock, label: "总学习时长", value: "2.9h", color: "text-purple-600" },
                  { icon: TrendingUp, label: "学习排名", value: "前10%", color: "text-orange-600" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl border p-4 text-center">
                    <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-1`} />
                    <div className={`text-xl ${s.color}`} style={{ fontWeight: 700 }}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border divide-y">
                {learningHistory.map((item) => (
                  <div key={item.title} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {item.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Clock className="w-6 h-6 text-orange-400" />}
                      <div>
                        <NavLink to={`/knowledge/${item.title.includes("CPR") ? "cpr" : item.title.includes("AED") ? "aed" : "trauma"}`} className="text-gray-700 hover:text-red-600 transition-colors">
                          {item.title}
                        </NavLink>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                          <span>{item.date}</span>
                          <span>{item.duration}</span>
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded">{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.completed && (
                        <span className="text-sm text-blue-600" style={{ fontWeight: 600 }}>{item.score}分</span>
                      )}
                      <span className={`text-xs px-3 py-1 rounded-full ${item.completed ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`} style={{ fontWeight: 600 }}>
                        {item.completed ? "已完成" : "进行中"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Analysis View with Recharts */
            <div className="space-y-6">
              {/* Comprehensive Rating Card */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center">
                    <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <div>
                        <div className="text-4xl" style={{ fontWeight: 800 }}>{avgScore}</div>
                        <div className="text-xs text-blue-100">综合评分</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <h3 className="text-xl text-white" style={{ fontWeight: 700 }}>综合评级：{rating.label}</h3>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">前 10% 学员</span>
                    </div>
                    <p className="text-blue-100 mb-4">您已完成 {completedCourses} 门课程，平均分 {avgScore} 分，最高分 {maxScore} 分。继续保持！</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl" style={{ fontWeight: 700 }}>{maxScore}</div>
                        <div className="text-xs text-blue-200">最高分</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl" style={{ fontWeight: 700 }}>{minScore}</div>
                        <div className="text-xs text-blue-200">最低分</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl" style={{ fontWeight: 700 }}>{maxScore - minScore}</div>
                        <div className="text-xs text-blue-200">分差</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Course Scores */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="flex items-center gap-2 mb-4" style={{ fontWeight: 700 }}>
                    <BarChart3 className="w-5 h-5 text-blue-500" /> 各课程成绩
                  </h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={scoreBarData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value: number) => [`${value} 分`, "成绩"]}
                        contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40}>
                        {scoreBarData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart - Score Trend */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="flex items-center gap-2 mb-4" style={{ fontWeight: 700 }}>
                    <TrendingUp className="w-5 h-5 text-green-500" /> 成绩趋势
                  </h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={scoreTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                      <Line type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: "#ef4444" }} name="我的成绩" />
                      <Line type="monotone" dataKey="avg" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="平均线" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Radar Chart - Skill Dimensions */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="flex items-center gap-2 mb-4" style={{ fontWeight: 700 }}>
                    <PieChart className="w-5 h-5 text-purple-500" /> 技能维度
                  </h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="技能评分" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Score Distribution */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="flex items-center gap-2 mb-4" style={{ fontWeight: 700 }}>
                    <Target className="w-5 h-5 text-orange-500" /> 成绩分布
                  </h3>
                  <div className="space-y-4">
                    {scoreDistribution.map((item) => {
                      const totalCompleted = learningHistory.filter(l => l.completed).length;
                      const pct = totalCompleted > 0 ? Math.round((item.count / totalCompleted) * 100) : 0;
                      return (
                        <div key={item.range} className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 w-16 text-right">{item.range}</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                              style={{ width: `${Math.max(pct, item.count > 0 ? 10 : 0)}%` }}
                            >
                              {item.count > 0 && <span className="text-xs text-white" style={{ fontWeight: 700 }}>{item.count}</span>}
                            </div>
                          </div>
                          <span className="text-sm text-gray-400 w-10">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed per-course scores */}
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-3">各课程详细成绩</p>
                    <div className="space-y-2">
                      {learningHistory.filter(l => l.completed).map((item) => {
                        const r = getGradeRating(item.score);
                        return (
                          <div key={item.title} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 truncate flex-1">{item.title}</span>
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.score}%` }} />
                            </div>
                            <span className={`text-sm ${r.color}`} style={{ fontWeight: 600 }}>{item.score}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "rescue" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-2">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-red-700" style={{ fontWeight: 600 }}>您已参与 3 次紧急救助，全部成功</p>
                <p className="text-sm text-red-500 mt-0.5">感谢您的无私奉献，您的行动挽救了宝贵的生命</p>
              </div>
            </div>
          </div>
          {rescueRecords.map((record, i) => (
            <div key={i} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg">{record.type}</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>{record.result}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{record.role}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{record.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{record.location}</span>
                  </div>
                  <button
                    onClick={() => setExpandedRecord(expandedRecord === i ? null : i)}
                    className="text-sm text-blue-500 hover:underline mt-2"
                  >
                    {expandedRecord === i ? "收起详情" : "查看详情"}
                  </button>
                  {expandedRecord === i && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                      {record.detail}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "achievements" && (
        <div>
          <p className="text-gray-500 text-sm mb-6">已获得 {achievements.filter((a) => a.achieved).length}/{achievements.length} 个成就勋章</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((a) => (
              <div key={a.name} className={`rounded-xl border p-5 text-center transition-shadow ${a.achieved ? "bg-white hover:shadow-md" : "bg-gray-50 opacity-70"}`}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  a.achieved ? "bg-yellow-50 text-yellow-500" : "bg-gray-100 text-gray-300"
                }`}>
                  <a.icon className="w-8 h-8" />
                </div>
                <h3 className={a.achieved ? "text-gray-800" : "text-gray-400"}>{a.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
                {a.achieved ? (
                  <span className="inline-block text-xs bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full mt-3" style={{ fontWeight: 600 }}>
                    {a.date} 获得
                  </span>
                ) : (
                  <span className="inline-block text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full mt-3">
                    进度：{a.progress}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">{unreadCount} 条未读消息</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-sm text-red-600 hover:underline">全部标为已读</button>
            )}
          </div>
          <div className="bg-white rounded-xl border divide-y">
            {notifications.map((n) => {
              const isRead = readIds.has(n.id);
              return (
                <div
                  key={n.id}
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${!isRead ? "bg-red-50/50 hover:bg-red-50" : "hover:bg-gray-50"}`}
                  onClick={() => {
                    setReadIds((prev) => new Set(prev).add(n.id));
                    setNotificationDetail(notificationDetail === n.id ? null : n.id);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {!isRead && <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />}
                    {isRead && <span className="w-2.5 h-2.5 shrink-0" />}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{n.type}</span>
                        <span className="text-gray-700 truncate">{n.title}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
                      {notificationDetail === n.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                          <p>这是关于「{n.title}」的详细信息。</p>
                          <p className="mt-1 text-gray-400">发送时间：{n.time}</p>
                          <div className="flex gap-2 mt-3">
                            <button className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                              查看详情
                            </button>
                            <button className="px-4 py-1.5 border rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">
                              标记已读
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${notificationDetail === n.id ? "rotate-90" : ""}`} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>账号设置</h2>
            <div className="space-y-3">
              {[
                { label: "修改手机号", desc: "当前：138****8888" },
                { label: "修改密码", desc: "上次修改：2026-01-15" },
                { label: "修改邮箱", desc: "当前：liming@example.com" },
                { label: "实名认证", desc: "已认证" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                  <div>
                    <div className="text-gray-700">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>通知设置</h2>
            <div className="space-y-4">
              {[
                { label: "急救求助通知", desc: "附近有人发起急救求助时通知您", default: true },
                { label: "培训活动提醒", desc: "新的培训课程和社区活动通知", default: true },
                { label: "证书到期提醒", desc: "证书即将到期时提前通知", default: true },
                { label: "社区公告", desc: "社区新闻和公告推送", default: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-700">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl mb-5" style={{ fontWeight: 700 }}>隐私与安全</h2>
            <div className="space-y-3">
              {[
                { label: "位置信息", desc: "允许使用您的位置信息以提供附近急救资源" },
                { label: "志愿者公开信息", desc: "在志愿者列表中显示您的姓名和技能" },
                { label: "学习记录公开", desc: "其他用户可以查看您的学习进度" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="text-gray-700">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> 退出登录
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditMode(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl" style={{ fontWeight: 700 }}>编辑资料</h2>
              <button onClick={() => setEditMode(false)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            {editSuccess ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl text-green-600" style={{ fontWeight: 700 }}>保存成功！</h3>
                <p className="text-gray-500 mt-2">您的资料已更新</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">头像</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl" style={{ fontWeight: 600 }}>{displayUser.avatar}</div>
                    <button className="text-sm text-blue-500 hover:underline">更换头像</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">姓名</label>
                  <input type="text" defaultValue={displayUser.name} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">个人简介</label>
                  <textarea defaultValue={mockUser.bio} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 resize-none" rows={3} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">邮箱</label>
                  <input type="email" defaultValue={mockUser.email} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">所属社区</label>
                  <select defaultValue={mockUser.community} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 bg-white">
                    <option>阳光花园社区</option>
                    <option>东三环社区</option>
                    <option>建国路社区</option>
                    <option>光华路社区</option>
                    <option>国贸社区</option>
                  </select>
                </div>
              </div>
            )}
            {!editSuccess && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditMode(false)} className="flex-1 py-3 border rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">取消</button>
                <button onClick={handleSaveProfile} className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>保存修改</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
