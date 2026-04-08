import { NavLink } from "react-router";
import { Phone, MapPin, BookOpen, Users, Clock, Shield, Heart, AlertTriangle, ChevronRight, Zap, MessageCircle, Calendar, Award, TrendingUp, ArrowRight, Bot, CheckCircle, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "./AuthContext";
import { useState } from "react";

const quickActions = [
  { icon: Phone, label: "一键呼救", desc: "拨打120急救电话", color: "bg-red-500", link: "tel:120" },
  { icon: MapPin, label: "附近医院", desc: "查找最近医疗机构", color: "bg-blue-500", link: "/services" },
  { icon: BookOpen, label: "急救指南", desc: "学习急救知识", color: "bg-green-500", link: "/knowledge" },
  { icon: Users, label: "志愿者", desc: "寻找附近志愿者", color: "bg-purple-500", link: "/community" },
  { icon: Zap, label: "找AED", desc: "定位附近AED设备", color: "bg-yellow-500", link: "/services" },
  { icon: Bot, label: "AI咨询", desc: "智能急救助手", color: "bg-indigo-500", link: "/consultation" },
];

const emergencyGuides = [
  { id: "cpr", title: "心肺复苏（CPR）", desc: "心脏骤停时的黄金抢救方法", tag: "必学", image: "https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMENQUiUyMHRyYWluaW5nfGVufDF8fHx8MTc3NDkzMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "aed", title: "AED使用方法", desc: "自动体外除颤器操作步骤", tag: "重要", image: "https://images.unsplash.com/photo-1617257484989-9f8ab411c362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBRUQlMjBkZWZpYnJpbGxhdG9yJTIwZGV2aWNlfGVufDF8fHx8MTc3NTAwNTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "stroke", title: "脑卒中识别", desc: "FAST法快速识别脑卒中", tag: "必学", image: "https://images.unsplash.com/photo-1680759290608-c6dda7570b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwaGVhbHRoJTIwY2hlY2t1cHxlbnwxfHx8fDE3NzUwODg1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "burn", title: "烧烫伤处理", desc: "冲脱泡盖送五字诀", tag: "常用", image: "https://images.unsplash.com/photo-1766973117689-1f4fad3c42b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNhZmV0eSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc1MDg4NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const stats = [
  { icon: Clock, value: "3分钟", label: "平均响应时间" },
  { icon: Shield, value: "1,200+", label: "注册志愿者" },
  { icon: Heart, value: "350+", label: "成功救助案例" },
  { icon: AlertTriangle, value: "50+", label: "AED设备点位" },
];

const notices = [
  { date: "2026-03-28", title: "社区急救培训班第12期报名开始", tag: "培训" },
  { date: "2026-03-25", title: "新增3处AED设备点位，覆盖率再提升", tag: "设备" },
  { date: "2026-03-20", title: "社区志愿者急救技能考核通知", tag: "考核" },
  { date: "2026-03-15", title: "春季常见急症预防指南发布", tag: "指南" },
  { date: "2026-03-10", title: "朝阳区急救志愿者表彰大会圆满举办", tag: "活动" },
];

const nearbyResources = [
  { type: "医院", name: "朝阳区社区卫生服务中心", distance: "0.3km", status: "24h急诊", color: "bg-red-500" },
  { type: "AED", name: "社区服务中心大厅", distance: "0.1km", status: "设备正常", color: "bg-yellow-500" },
  { type: "药房", name: "国大药房（朝阳店）", distance: "0.3km", status: "24h营业", color: "bg-green-500" },
  { type: "志愿者", name: "张医生 · 急救培训师", distance: "0.2km", status: "在线可呼叫", color: "bg-purple-500" },
];

const upcomingEvents = [
  { date: "04/05", title: "社区CPR急救培训（第12期）", time: "09:00-12:00", spots: "剩余8个名额" },
  { date: "04/10", title: "AED操作实战演练", time: "14:00-16:00", spots: "剩余2个名额" },
  { date: "04/15", title: "儿童急救专题培训", time: "09:00-11:30", spots: "剩余15个名额" },
];

const healthTips = [
  { title: "春季花粉过敏高发", content: "出门佩戴口罩，随身携带抗过敏药物。严重过敏反应（呼吸困难）请立即拨打120。", type: "提醒" },
  { title: "老年人跌倒预防", content: "保持室内照明良好，浴室安装扶手，穿防滑鞋。跌倒后不要急于起身，先评估伤情。", type: "关怀" },
];

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const [enrolledEvents, setEnrolledEvents] = useState<Set<string>>(new Set());
  const [enrollModalEvent, setEnrollModalEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [noticeExpanded, setNoticeExpanded] = useState<string | null>(null);

  const handleEnrollEvent = (event: typeof upcomingEvents[0]) => {
    setEnrolledEvents(prev => new Set(prev).add(event.title));
    setEnrollModalEvent(null);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1697952431905-9c8d169d9d2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZW1lcmdlbmN5JTIwYW1idWxhbmNlfGVufDF8fHx8MTc3NDg4NzgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="emergency"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-6 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              平台运行正常 · 志愿者在线 238 人
            </div>
            <h1 className="text-3xl md:text-5xl mb-4" style={{ fontWeight: 700 }}>
              {isLoggedIn && user ? `${user.name}，欢迎回来` : "守护生命，从社区开始"}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl leading-relaxed">
              {isLoggedIn && user ? (
                <>欢迎回到社区医疗急救平台，{user.community}的守护者<br />继续学习急救知识，为生命护航</>
              ) : (
                <>专业急救知识 · 快速响应服务 · 社区互助网络<br />为每一位社区居民的生命安全保驾护航</>
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:120" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl hover:bg-red-50 transition-colors text-lg" style={{ fontWeight: 600 }}>
                <Phone className="w-6 h-6" /> 紧急呼救 120
              </a>
              <NavLink to="/knowledge" className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-xl border border-red-400 hover:bg-red-400 transition-colors text-lg">
                <BookOpen className="w-6 h-6" /> 学习急救知识
              </NavLink>
              <NavLink to="/consultation" className="inline-flex items-center gap-2 bg-white/15 text-white px-8 py-4 rounded-xl border border-white/20 hover:bg-white/25 transition-colors text-lg">
                <Bot className="w-6 h-6" /> AI急救助手
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const isExternal = action.link.startsWith("tel:");
            const Component = isExternal ? "a" : NavLink;
            const props = isExternal ? { href: action.link } : { to: action.link };
            return (
              <Component
                key={action.label}
                {...(props as any)}
                className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex flex-col items-center text-center gap-3"
                aria-label={action.label + " - " + action.desc}
              >
                <div className={`${action.color} p-3.5 rounded-full text-white`}>
                  <action.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-lg" style={{ fontWeight: 600 }}>{action.label}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{action.desc}</div>
                </div>
              </Component>
            );
          })}
        </div>
      </section>

      {/* Health Tips Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTips.map((tip) => (
            <div key={tip.title} className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{tip.type}</span>
                  <h3 className="text-orange-800">{tip.title}</h3>
                </div>
                <p className="text-sm text-orange-700 leading-relaxed">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border p-6 text-center hover:shadow-md transition-shadow">
              <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl text-red-600" style={{ fontWeight: 700 }}>{stat.value}</div>
              <div className="text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Guides */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl" style={{ fontWeight: 700 }}>急救知识精选</h2>
              <p className="text-gray-500 mt-1">掌握关键急救技能，守护家人安全</p>
            </div>
            <NavLink to="/knowledge" className="text-red-600 flex items-center gap-1 hover:underline px-4 py-2 bg-red-50 rounded-lg">
              查看全部 <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyGuides.map((guide) => (
              <NavLink to={`/knowledge/${guide.id}`} key={guide.id} className="group rounded-xl overflow-hidden border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-44 overflow-hidden relative">
                  <ImageWithFallback src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full text-white ${
                    guide.tag === "必学" ? "bg-red-500" : guide.tag === "重要" ? "bg-orange-500" : "bg-blue-500"
                  }`} style={{ fontWeight: 600 }}>{guide.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="group-hover:text-red-600 transition-colors">{guide.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{guide.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-red-500 mt-2">
                    开始学习 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Resources & Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Resources */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl" style={{ fontWeight: 700 }}>附近急救资源</h2>
                <p className="text-gray-500 text-sm mt-1">基于您的位置自动推荐</p>
              </div>
              <NavLink to="/services" className="text-red-600 text-sm flex items-center gap-1 hover:underline">
                查看地图 <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
            <div className="space-y-3">
              {nearbyResources.map((res, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`${res.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm shrink-0`} style={{ fontWeight: 700 }}>
                    {res.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate">{res.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{res.distance}</span>
                      <span className="text-green-600">{res.status}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl" style={{ fontWeight: 700 }}>近期培训活动</h2>
                <p className="text-gray-500 text-sm mt-1">提升急救技能，免费报名参加</p>
              </div>
              <NavLink to="/community" className="text-red-600 text-sm flex items-center gap-1 hover:underline">
                全部活动 <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-red-50 rounded-xl p-3 text-center shrink-0 min-w-[60px]">
                    <div className="text-lg text-red-600" style={{ fontWeight: 700 }}>{event.date.split("/")[1]}</div>
                    <div className="text-xs text-red-400">{event.date.split("/")[0]}月</div>
                  </div>
                  <div className="flex-1">
                    <h4>{event.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                    </div>
                    <span className="inline-block text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full mt-2">{event.spots}</span>
                  </div>
                  {enrolledEvents.has(event.title) ? (
                    <span className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm shrink-0 self-center" style={{ fontWeight: 600 }}>
                      <CheckCircle className="w-4 h-4" /> 已报名
                    </span>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); setEnrollModalEvent(event); }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shrink-0 self-center"
                    >
                      报名
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Enrollment Modal */}
      {enrollModalEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEnrollModalEvent(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ fontWeight: 700 }}>确认报名</h2>
              <button onClick={() => setEnrollModalEvent(null)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="text-lg mb-2">{enrollModalEvent.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" />2026-{enrollModalEvent.date.replace("/", "-")} {enrollModalEvent.time}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" />社区服务中心3楼培训室</div>
                <div className="text-xs text-orange-600">{enrollModalEvent.spots}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEnrollModalEvent(null)} className="flex-1 py-3 border rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">取消</button>
              <button onClick={() => handleEnrollEvent(enrollModalEvent)} className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>确认报名</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl text-white mb-2" style={{ fontWeight: 700 }}>AI急救助手 · 24小时在线</h2>
              <p className="text-blue-100 text-lg">遇到紧急情况不知道怎么办？AI助手为您提供即时急救指导，支持症状描述、智能问答。</p>
            </div>
            <NavLink
              to="/consultation"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shrink-0 text-lg flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <MessageCircle className="w-5 h-5" /> 立即咨询
            </NavLink>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl" style={{ fontWeight: 700 }}>社区公告</h2>
            <p className="text-gray-500 text-sm mt-1">了解社区最新急救动态</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border divide-y">
          {notices.map((notice) => (
            <div key={notice.date + notice.title} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 whitespace-nowrap">{notice.date}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{notice.tag}</span>
                <span className="text-gray-700">{notice.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-red-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl mb-3" style={{ fontWeight: 700 }}>加入社区急救志愿者</h2>
          <p className="text-gray-600 mb-6 text-lg">学习急救技能，守护社区安全。已有 1,200+ 名志愿者加入，成功救助 350+ 次。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/community" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition-colors text-lg" style={{ fontWeight: 600 }}>
              <Users className="w-5 h-5" /> 成为志愿者
            </NavLink>
            <NavLink to="/knowledge" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-lg">
              <BookOpen className="w-5 h-5" /> 开始学习
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}