import { useState } from "react";
import { NavLink } from "react-router";
import { Users, Award, Calendar, MapPin, Clock, UserCheck, GraduationCap, Shield, ChevronRight, X, Phone, Star, Heart, Search, Filter, MessageCircle, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const tabs = [
  { id: "volunteers", label: "志愿者团队", icon: Users },
  { id: "training", label: "培训课程", icon: GraduationCap },
  { id: "events", label: "社区活动", icon: Calendar },
  { id: "forum", label: "社区讨论", icon: MessageCircle },
];

const volunteers = [
  { id: 1, name: "张医生", role: "急救培训师", cert: "AHA认证导师", area: "阳光花园社区", available: true, rescues: 28, hours: 320, skills: ["CPR", "AED", "创伤处理"], rating: 4.9, image: "https://images.unsplash.com/photo-1680759290608-c6dda7570b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwaGVhbHRoJTIwY2hlY2t1cHxlbnwxfHx8fDE3NzUwODg1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, name: "李护士", role: "社区护士", cert: "CPR高级证书", area: "东三环社区", available: true, rescues: 15, hours: 186, skills: ["CPR", "输液", "护理"], rating: 4.8 },
  { id: 3, name: "王志愿者", role: "急救志愿者", cert: "红十字急救员", area: "建国路社区", available: false, rescues: 8, hours: 95, skills: ["CPR", "包扎"], rating: 4.6 },
  { id: 4, name: "赵教练", role: "急救培训师", cert: "急救医学硕士", area: "光华路社区", available: true, rescues: 42, hours: 520, skills: ["CPR", "AED", "创伤处理", "溺水急救"], rating: 5.0 },
  { id: 5, name: "刘女士", role: "急救志愿者", cert: "初级急救证书", area: "国贸社区", available: true, rescues: 5, hours: 60, skills: ["CPR"], rating: 4.5 },
  { id: 6, name: "孙先生", role: "急救志愿者", cert: "红十字急救员", area: "朝阳公园社区", available: true, rescues: 12, hours: 140, skills: ["CPR", "AED"], rating: 4.7 },
];

const trainings = [
  { id: 1, title: "社区CPR急救培训（第12期）", date: "2026-04-05", time: "09:00-12:00", location: "社区服务中心3楼培训室", spots: 30, enrolled: 22, level: "入门", fee: "免费", instructor: "赵教练", desc: "面向社区居民的基础CPR培训，包含理论讲解和实操练习。完成培训可获得社区急救证书。" },
  { id: 2, title: "AED操作实战演练", date: "2026-04-10", time: "14:00-16:00", location: "社区体育公园", spots: 20, enrolled: 18, level: "进阶", fee: "免费", instructor: "张医生", desc: "在真实环境中进行AED操作演练，结合CPR进行完整的心脏骤停急救流程训练。" },
  { id: 3, title: "儿童急救专题培训", date: "2026-04-15", time: "09:00-11:30", location: "社区服务中心3楼培训室", spots: 25, enrolled: 10, level: "入门", fee: "免费", instructor: "李护士", desc: "针对婴幼儿和儿童的常见急救情况，包括异物梗阻、高热惊厥、跌落伤等处理方法。" },
  { id: 4, title: "创伤急救与包扎技术", date: "2026-04-20", time: "14:00-17:00", location: "朝阳区卫生服务中心", spots: 20, enrolled: 12, level: "进阶", fee: "免费", instructor: "赵教练", desc: "学习各类创伤的现场处理技术，包括止血、包扎、固定、搬运等。" },
];

const events = [
  { id: 1, title: "社区急救知识宣传日", date: "2026-04-08", location: "阳光花园小区广场", desc: "普及急救知识，现场演示CPR和AED使用方法，免费领取急救手册和急救包", participants: 200, status: "报名中" },
  { id: 2, title: "春季健康义诊活动", date: "2026-04-12", location: "社区服务中心一楼大厅", desc: "免费量血压、血糖检测，医生咨询，中医推拿体验", participants: 150, status: "报名中" },
  { id: 3, title: "急救技能大赛（社区赛）", date: "2026-04-25", location: "社区体育公园", desc: "志愿者急救技能竞赛，优秀选手代表社区参加区级比赛，设置一二三等奖", participants: 50, status: "即将开始" },
  { id: 4, title: "老年人防跌倒安全讲座", date: "2026-05-03", location: "社区服务中心2楼会议室", desc: "针对老年人群体的防跌倒安全知识，家庭环境改造建议", participants: 80, status: "即将开放" },
];

const forumPosts = [
  { id: 1, author: "张医生", time: "2小时前", title: "分享：一次社区心脏骤停救助的经验", content: "上周在小区遇到一位老人突然倒地，分享一下当时的急救经过和经验教训...", likes: 45, comments: 12, tag: "经验分享" },
  { id: 2, author: "李护士", time: "5小时前", title: "夏天到了，儿童溺水预防要注意什么？", content: "每年夏季都是儿童溺水高发期，作为社区护士想提醒各位家长...", likes: 38, comments: 8, tag: "知识科普" },
  { id: 3, author: "刘女士", time: "1天前", title: "第11期CPR培训结业感想", content: "经过三个小时的培训，终于学会了CPR！感谢赵教练的耐心指导...", likes: 62, comments: 15, tag: "培训感想" },
  { id: 4, author: "孙先生", time: "2天前", title: "建议：国贸地铁站附近应增设AED", content: "国贸站人流量非常大，但目前只有A出口有一台AED，建议增设...", likes: 89, comments: 23, tag: "建议反馈" },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [enrollModalId, setEnrollModalId] = useState<number | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState<Set<number>>(new Set());
  const [volunteerSearch, setVolunteerSearch] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState<number | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const filteredVolunteers = volunteers.filter((v) =>
    v.name.includes(volunteerSearch) || v.area.includes(volunteerSearch) || v.skills.some((s) => s.includes(volunteerSearch))
  );

  const enrollTraining = trainings.find((t) => t.id === enrollModalId);

  const handleEnroll = () => {
    if (enrollModalId) {
      setEnrollSuccess((prev) => new Set(prev).add(enrollModalId));
      setEnrollModalId(null);
    }
  };

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <NavLink to="/" className="hover:text-red-600">首页</NavLink>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">社区资源</span>
      </nav>

      <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>社区资源</h1>
      <p className="text-gray-500 mb-8">汇聚社区力量，共建急救安全网</p>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, value: "1,200+", label: "注册志愿者", color: "text-red-600" },
          { icon: Award, value: "860", label: "持证急救员", color: "text-orange-600" },
          { icon: GraduationCap, value: "48期", label: "已开展培训", color: "text-blue-600" },
          { icon: Shield, value: "98%", label: "社区覆盖率", color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border p-5 text-center hover:shadow-md transition-shadow">
            <s.icon className={`w-7 h-7 ${s.color} mx-auto mb-2`} />
            <div className={`text-2xl ${s.color}`} style={{ fontWeight: 700 }}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
              activeTab === tab.id ? "bg-red-600 text-white shadow-md" : "bg-white border text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Volunteers */}
      {activeTab === "volunteers" && (
        <>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text" placeholder="搜索志愿者姓名、社区或技能..."
              value={volunteerSearch} onChange={(e) => setVolunteerSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVolunteers.map((v) => (
              <div key={v.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl shrink-0" style={{ fontWeight: 600 }}>
                    {v.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg">{v.name}</h3>
                      <span className={`w-2.5 h-2.5 rounded-full ${v.available ? "bg-green-400" : "bg-gray-300"}`} />
                      <span className="text-sm text-gray-400">{v.available ? "在线" : "离线"}</span>
                      <span className="flex items-center gap-0.5 text-sm text-yellow-500"><Star className="w-3.5 h-3.5 fill-yellow-400" />{v.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{v.role} · {v.cert}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {v.skills.map((s) => (
                        <span key={s} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{v.area}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" />救助 {v.rescues} 次</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{v.hours}h 志愿时长</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVolunteer(selectedVolunteer === v.id ? null : v.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                  >
                    联系
                  </button>
                </div>
                {selectedVolunteer === v.id && (
                  <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-4 -mx-1">
                    <p className="text-sm text-gray-600 mb-3">联系 {v.name}：</p>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <Phone className="w-4 h-4" /> 电话联系
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" /> 发送消息
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="bg-red-50 rounded-xl border-2 border-dashed border-red-200 p-8 flex flex-col items-center justify-center text-center">
              <UserCheck className="w-12 h-12 text-red-400 mb-3" />
              <h3 className="text-red-600 text-lg">成为急救志愿者</h3>
              <p className="text-sm text-red-400 mt-1 mb-4">加入我们，守护社区居民的生命安全</p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>立即报名</button>
            </div>
          </div>
        </>
      )}

      {/* Training */}
      {activeTab === "training" && (
        <div className="space-y-4">
          {trainings.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-lg">{t.title}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${t.level === "入门" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`} style={{ fontWeight: 600 }}>{t.level}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t.fee}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{t.desc}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{t.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{t.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{t.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />讲师：{t.instructor}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex-1 max-w-60 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(t.enrolled / t.spots) * 100}%` }} />
                      </div>
                      <span className="text-gray-400 text-sm">{t.enrolled}/{t.spots}人 · 剩余{t.spots - t.enrolled}名额</span>
                    </div>
                  </div>
                </div>
                {enrollSuccess.has(t.id) ? (
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                    <CheckCircle className="w-5 h-5" /> 已报名
                  </div>
                ) : (
                  <button
                    onClick={() => t.enrolled < t.spots && setEnrollModalId(t.id)}
                    className={`px-6 py-3 rounded-xl shrink-0 transition-colors ${
                      t.enrolled >= t.spots ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {t.enrolled >= t.spots ? "已满" : "立即报名"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events */}
      {activeTab === "events" && (
        <div className="space-y-4">
          {events.map((e) => (
            <div key={e.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center shrink-0 min-w-[70px]">
                  <div className="text-2xl text-red-600" style={{ fontWeight: 700 }}>{e.date.split("-")[2]}</div>
                  <div className="text-sm text-red-400">{e.date.split("-")[1]}月</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg">{e.title}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                      e.status === "报名中" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    }`} style={{ fontWeight: 600 }}>{e.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{e.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />预计{e.participants}人</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{e.desc}</p>
                </div>
                <button className={`px-5 py-2.5 rounded-xl text-sm shrink-0 transition-colors ${
                  e.status === "报名中" ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {e.status === "报名中" ? "立即报名" : e.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Forum */}
      {activeTab === "forum" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 text-sm">社区居民互助交流平台</p>
            <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>
              发布话题
            </button>
          </div>
          {forumPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600" style={{ fontWeight: 600 }}>{post.author[0]}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontWeight: 600 }}>{post.author}</span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                  </div>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">{post.tag}</span>
              </div>
              <h3 className="text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2" onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
                {post.content}
              </p>
              {expandedPost === post.id && (
                <p className="text-sm text-gray-500 mt-2">{post.content}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-400 mt-3 pt-3 border-t">
                <span className="flex items-center gap-1" onClick={() => handleLike(post.id)}>
                  <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""}`} />{likedPosts.has(post.id) ? post.likes + 1 : post.likes} 赞
                </span>
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.comments} 评论</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enrollment Modal */}
      {enrollModalId && enrollTraining && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEnrollModalId(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ fontWeight: 700 }}>确认报名</h2>
              <button onClick={() => setEnrollModalId(null)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="text-lg mb-2">{enrollTraining.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" />{enrollTraining.date} {enrollTraining.time}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" />{enrollTraining.location}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" />讲师：{enrollTraining.instructor}</div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-gray-400" />级别：{enrollTraining.level} · {enrollTraining.fee}</div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">报名人姓名</label>
              <input type="text" defaultValue="李明" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">联系电话</label>
              <input type="tel" defaultValue="138****8888" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEnrollModalId(null)} className="flex-1 py-3 border rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">取消</button>
              <button onClick={handleEnroll} className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>确认报名</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}