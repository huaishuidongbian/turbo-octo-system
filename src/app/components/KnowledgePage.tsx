import { useState } from "react";
import { NavLink } from "react-router";
import { Search, BookOpen, Heart, Bone, Flame, Bug, Droplets, Brain, ChevronDown, ChevronUp, ChevronRight, PlayCircle, Clock, AlertTriangle, Award, TrendingUp, Eye, PersonStanding, List } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BodyMap from "./BodyMap";

const categories = [
  { id: "all", label: "全部", icon: BookOpen },
  { id: "cardiac", label: "心脏急救", icon: Heart },
  { id: "trauma", label: "外伤处理", icon: Bone },
  { id: "burn", label: "烧烫伤", icon: Flame },
  { id: "poison", label: "中毒急救", icon: Bug },
  { id: "drowning", label: "溺水急救", icon: Droplets },
  { id: "stroke", label: "脑卒中", icon: Brain },
];

const articles = [
  {
    id: "cpr", category: "cardiac", title: "心肺复苏（CPR）操作指南",
    summary: "当发现有人心脏骤停时，立即进行心肺复苏可以大大提高生存率。掌握正确的CPR步骤至关重要。",
    steps: ["确认环境安全，拨打120", "检查意识和呼吸（不超过10秒）", "胸外按压：两手交叉，掌根放于胸骨中下1/3处", "按压深度5-6cm，频率100-120次/分", "每30次按压后给予2次人工呼吸", "持续进行直到急救人员到达"],
    time: "5分钟", level: "必学", views: 12580,
    image: "https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMENQUiUyMHRyYWluaW5nfGVufDF8fHx8MTc3NDkzMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "aed", category: "cardiac", title: "AED（自动体外除颤器）使用指南",
    summary: "AED是一种便携式医疗设备，能够自动分析心律并在需要时进行电击除颤。非医疗人员也可使用。",
    steps: ["打开AED电源", "按照语音提示将电极片贴在患者裸露胸部", "右锁骨下方和左乳头外侧下方", "AED自动分析心律，所有人离开患者", "如提示需要电击，按下放电按钮", "电击后立即继续CPR"],
    time: "3分钟", level: "重要", views: 8920,
    image: "https://images.unsplash.com/photo-1617257484989-9f8ab411c362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBRUQlMjBkZWZpYnJpbGxhdG9yJTIwZGV2aWNlfGVufDF8fHx8MTc3NTAwNTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "trauma", category: "trauma", title: "外伤止血与包扎技巧",
    summary: "正确的止血包扎可以有效控制出血，防止感染，是最常用的急救技能之一。",
    steps: ["用干净纱布或布料直接压迫伤口", "保持持续压迫至少15分钟", "如出血不止，可在伤口上方扎止血带", "记录扎止血带时间（不超过1小时）", "用无菌敷料包扎固定", "尽快送医处理"],
    time: "4分钟", level: "常用", views: 7340,
    image: "https://images.unsplash.com/photo-1758206524196-838bdb43ab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZW1lcmdlbmN5JTIwc3RyZXRjaGVyfGVufDF8fHx8MTc3NTA4ODU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "burn", category: "burn", title: "烧烫伤紧急处理",
    summary: "烧烫伤发生后的正确处理可以减轻疼痛、减少疤痕形成。记住五字诀：冲、脱、泡、盖、送。",
    steps: ["立即用流动冷水冲洗伤处15-20分钟", "小心脱去伤处衣物（粘连部分不要硬扯）", "用干净纱布轻轻覆盖伤口", "不要涂抹牙膏、酱油等偏方", "大面积烧伤立即拨打120", "保持伤者温暖，防止休克"],
    time: "3分钟", level: "常用", views: 6210,
    image: "https://images.unsplash.com/photo-1766973117689-1f4fad3c42b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNhZmV0eSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc1MDg4NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "poison", category: "poison", title: "食物中毒应急处理",
    summary: "食物中毒后需要快速判断并采取正确措施，避免毒素进一步吸收。",
    steps: ["立即停止食用可疑食物", "保留剩余食物作为样本", "催吐（仅在意识清醒时）", "拨打120或送医", "记录食用时间和症状", "同食者也需观察"],
    time: "3分钟", level: "重要", views: 5120,
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwcGlsbHN8ZW58MXx8fHwxNzc0OTgyNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "drowning", category: "drowning", title: "溺水急救处理流程",
    summary: "溺水是常见意外伤害，正确的急救处理可以挽救生命。注意施救者自身安全。",
    steps: ["确保自身安全，不要贸然下水", "利用竹竿、绳索等工具救助", "将溺水者救上岸后清除口鼻异物", "检查呼吸和脉搏", "无呼吸时立即进行CPR", "拨打120等待急救人员"],
    time: "4分钟", level: "重要", views: 6890,
    image: "https://images.unsplash.com/photo-1774557936610-ea8aa35019bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWFsdGglMjB2b2x1bnRlZXIlMjB0ZWFtfGVufDF8fHx8MTc3NTA4ODU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "stroke", category: "stroke", title: "脑卒中快速识别与急救",
    summary: "脑卒中发病后每分钟约有190万个脑细胞死亡，快速识别和送医至关重要。",
    steps: ["F-Face：让患者微笑，观察面部是否对称", "A-Arms：双臂平举，观察是否有一侧下垂", "S-Speech：让患者说一句话，是否口齿不清", "T-Time：记录发病时间，立即拨打120", "让患者侧卧，防止呕吐窒息", "不要给患者喂水或服药"],
    time: "3分钟", level: "必学", views: 9450,
    image: "https://images.unsplash.com/photo-1680759290608-c6dda7570b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwaGVhbHRoJTIwY2hlY2t1cHxlbnwxfHx8fDE3NzUwODg1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "views">("default");
  const [viewMode, setViewMode] = useState<"articles" | "bodymap">("articles");

  const filtered = articles
    .filter((a) => {
      const matchCat = activeCategory === "all" || a.category === activeCategory;
      const matchSearch = a.title.includes(searchQuery) || a.summary.includes(searchQuery);
      return matchCat && matchSearch;
    })
    .sort((a, b) => sortBy === "views" ? b.views - a.views : 0);

  const mustLearnCount = articles.filter((a) => a.level === "必学").length;
  const totalViews = articles.reduce((s, a) => s + a.views, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <NavLink to="/" className="hover:text-red-600">首页</NavLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700">急救知识库</span>
          </nav>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>急救知识库</h1>
          <p className="text-gray-500">掌握急救技能，关键时刻挽救生命</p>
        </div>
        <div className="flex gap-4 text-sm">
          {[
            { icon: BookOpen, value: `${articles.length}`, label: "篇知识" },
            { icon: Award, value: `${mustLearnCount}`, label: "篇必���" },
            { icon: Eye, value: `${(totalViews / 1000).toFixed(1)}k`, label: "总浏览" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2">
              <s.icon className="w-4 h-4 text-red-500" />
              <span className="text-red-600" style={{ fontWeight: 700 }}>{s.value}</span>
              <span className="text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        <button
          onClick={() => setViewMode("articles")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
            viewMode === "articles" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"
          }`}
          style={viewMode === "articles" ? { fontWeight: 600 } : {}}
        >
          <List className="w-4 h-4" /> 图文知识
        </button>
        <button
          onClick={() => setViewMode("bodymap")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
            viewMode === "bodymap" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"
          }`}
          style={viewMode === "bodymap" ? { fontWeight: 600 } : {}}
        >
          <PersonStanding className="w-4 h-4" /> 人体急救图
        </button>
      </div>

      {viewMode === "bodymap" ? (
        <BodyMap />
      ) : (
      <>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索急救知识...（如：心肺复苏、AED、烫伤）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("default")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${sortBy === "default" ? "bg-red-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}
          >
            默认排序
          </button>
          <button
            onClick={() => setSortBy("views")}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-colors ${sortBy === "views" ? "bg-red-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}
          >
            <TrendingUp className="w-4 h-4" /> 热门优先
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const count = cat.id === "all" ? articles.length : articles.filter((a) => a.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full transition-colors ${
                activeCategory === cat.id ? "bg-red-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
              <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id ? "bg-white/20" : "bg-gray-100"
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {filtered.map((article) => {
          const isExpanded = expandedId === article.id;
          return (
            <div key={article.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                {article.image && (
                  <NavLink to={`/knowledge/${article.id}`} className="md:w-60 h-44 md:h-auto shrink-0 overflow-hidden">
                    <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </NavLink>
                )}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                          article.level === "必学" ? "bg-red-100 text-red-600" : article.level === "重要" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                        }`} style={{ fontWeight: 600 }}>{article.level}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{article.time}阅读</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Eye className="w-3 h-3" />{article.views.toLocaleString()}</span>
                      </div>
                      <NavLink to={`/knowledge/${article.id}`} className="hover:text-red-600 transition-colors">
                        <h3 className="text-lg">{article.title}</h3>
                      </NavLink>
                      <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{article.summary}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <NavLink
                          to={`/knowledge/${article.id}`}
                          className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
                        >
                          查看详情 <ChevronRight className="w-4 h-4" />
                        </NavLink>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : article.id)}
                          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? "收起步骤" : "快速查看步骤"}
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t px-5 py-5 bg-red-50/30">
                  <h4 className="flex items-center gap-2 mb-3 text-red-600">
                    <AlertTriangle className="w-4 h-4" /> 操作步骤速览
                  </h4>
                  <ol className="space-y-2">
                    {article.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs shrink-0" style={{ fontWeight: 600 }}>{i + 1}</span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <NavLink
                    to={`/knowledge/${article.id}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm text-red-600 hover:underline"
                  >
                    查看完整详情和视频 <ChevronRight className="w-4 h-4" />
                  </NavLink>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg mb-2">未找到相关急救知识</p>
            <p className="text-sm">试试其他关键词或切换分类</p>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
}