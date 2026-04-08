import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { Send, User, Bot, Phone, MessageCircle, Clock, Star, ChevronRight, AlertTriangle, ArrowLeft, Mic, Image, Paperclip, ThumbsUp, Calendar, Award, Video } from "lucide-react";

const doctors = [
  { id: 1, name: "陈医生", title: "急诊科主任医师", hospital: "朝阳区社区卫生服务中心", rating: 4.9, consultations: 1280, online: true, avatar: "陈", specialties: ["心脏急救", "创伤处理"], experience: "20年", desc: "擅长心血管急症处理，主持过多次社区急救培训" },
  { id: 2, name: "王医生", title: "全科副主任医师", hospital: "北京朝阳医院", rating: 4.8, consultations: 960, online: true, avatar: "王", specialties: ["内科急症", "中毒处理"], experience: "15年", desc: "内科常见急症的快速诊断和处理，药物中毒的解毒方案" },
  { id: 3, name: "林医生", title: "急诊科主治医师", hospital: "民航总医院", rating: 4.7, consultations: 620, online: false, avatar: "林", specialties: ["外伤急救", "骨折处理"], experience: "10年", desc: "擅长各类外伤的急诊处理和骨折固定" },
  { id: 4, name: "周医生", title: "儿科副主任医师", hospital: "朝阳区社区卫生服务中心", rating: 4.9, consultations: 850, online: true, avatar: "周", specialties: ["儿童急救", "高热惊厥"], experience: "18年", desc: "专注儿童急症处理，儿童异物梗阻和高热处理经验丰富" },
];

const faqs = [
  { q: "发现有人晕倒应该怎么办？", a: "首先确保自身安全，然后轻拍肩膀呼唤检查意识，观察胸廓是否有起伏判断呼吸。如无意识无呼吸，立即拨打120并开始CPR。", category: "急救常识" },
  { q: "被鱼刺卡住喉咙怎么办？", a: "不要用吞饭团等偏方。尝试用力咳嗽排出，如无法排出应就医。如出现呼吸困难，需立即就医或拨打120。", category: "生活急救" },
  { q: "小孩高热惊厥怎么处理？", a: "让孩子侧卧防止呕吐窒息，不要强行按压或掰开嘴巴，不要往嘴里塞东西。记录惊厥持续时间，超过5分钟立即拨打120。", category: "儿童急救" },
  { q: "被蜜蜂蛰了怎么处理？", a: "用镊子或卡片刮除毒刺（不要挤压），冷敷减轻肿胀。如出现全身症状（呼吸困难、头晕等过敏反应），立即拨打120。", category: "生活急救" },
  { q: "老人突然胸痛怎么办？", a: "立即让患者坐下或半卧位休息，解开紧身衣物。如有硝酸甘油可舌下含服。拨打120，不要让患者自行走动。", category: "老年急救" },
  { q: "食物中毒多久会发作？", a: "根据毒素不同，潜伏期从30分钟到数小时不等。细菌性食物中毒通常6-12小时发作，化学性食物中毒可能30分钟内发作。", category: "急救常识" },
];

const quickQuestions = [
  "有人晕倒了怎么办",
  "孩子发高烧怎么处理",
  "被烫伤了怎么急救",
  "有人出血不止",
  "怀疑食物中毒",
  "老人突然胸痛",
];

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  time: string;
}

export default function ConsultationPage() {
  const [activeView, setActiveView] = useState<"main" | "chat" | "doctor">("main");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", content: "您好！我是社区急救AI助手。请描述您遇到的紧急情况，我会为您提供初步的急救指导。\n\n⚠️ 如遇危及生命的紧急情况，请立即拨打120！\n\n您可以问我：\n• 有人晕倒了怎么办\n• 烧烫伤如何处理\n• 如何进行心肺复苏\n• 孩子高热惊厥怎么办", time: getNow() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [faqCategory, setFaqCategory] = useState("全部");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: msg, time: getNow() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: getAutoReply(msg),
        time: getNow(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const faqCategories = ["全部", ...new Set(faqs.map((f) => f.category))];
  const filteredFaqs = faqCategory === "全部" ? faqs : faqs.filter((f) => f.category === faqCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {activeView === "main" && (
        <>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <NavLink to="/" className="hover:text-red-600">首页</NavLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700">在线咨询</span>
          </nav>

          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>在线咨询</h1>
          <p className="text-gray-500 mb-8">专业医生在线解答，AI助手即时指导</p>

          {/* Emergency Banner */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <AlertTriangle className="w-7 h-7 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-red-700" style={{ fontWeight: 600 }}>紧急情况请直接拨打120</p>
              <p className="text-red-500 text-sm mt-0.5">在线咨询仅提供非紧急健康指导，不替代专业急救服务</p>
            </div>
            <a href="tel:120" className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shrink-0 flex items-center gap-2" style={{ fontWeight: 600 }}>
              <Phone className="w-5 h-5" /> 拨打 120
            </a>
          </div>

          {/* AI Chat Entry */}
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-10 cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-colors"
            onClick={() => setActiveView("chat")}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <Bot className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white text-xl mb-1">AI急救助手</h3>
                <p className="text-blue-100">24小时在线，即时提供急救指导建议。支持症状描述、急救步骤查询、药物咨询等。</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {quickQuestions.slice(0, 3).map((q) => (
                    <span key={q} className="text-xs bg-white/15 px-3 py-1 rounded-full">{q}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white text-blue-600 px-6 py-3 rounded-xl shrink-0 flex items-center gap-2" style={{ fontWeight: 600 }}>
                开始对话 <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Online Doctors */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl" style={{ fontWeight: 700 }}>在线医生</h2>
              <p className="text-sm text-gray-500 mt-0.5">{doctors.filter((d) => d.online).length} 位医生在线</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl shrink-0" style={{ fontWeight: 600 }}>{doc.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg">{doc.name}</h3>
                      <span className={`w-2.5 h-2.5 rounded-full ${doc.online ? "bg-green-400" : "bg-gray-300"}`} />
                      <span className="text-sm text-gray-400">{doc.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">{doc.hospital} · {doc.experience}经验</div>
                    <p className="text-sm text-gray-400 mt-1">{doc.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {doc.specialties.map((s) => (
                        <span key={s} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{doc.rating}</span>
                      <span>咨询 {doc.consultations} 次</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <button
                    onClick={() => { setSelectedDoctor(doc); setActiveView("doctor"); }}
                    className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      doc.online ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!doc.online}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {doc.online ? "图文咨询" : "暂不在线"}
                  </button>
                  {doc.online && (
                    <button className="py-3 px-5 rounded-xl border text-blue-500 hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <Video className="w-5 h-5" /> 视频咨询
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl" style={{ fontWeight: 700 }}>常见急救问答</h2>
          </div>
          <div className="flex gap-2 mb-4">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  faqCategory === cat ? "bg-red-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border group">
                <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-red-400" />
                    {faq.q}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{faq.category}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 border-t pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </>
      )}

      {/* AI Chat View */}
      {activeView === "chat" && (
        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b">
            <button onClick={() => setActiveView("main")} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3>AI急救助手</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> 在线
              </p>
            </div>
            <a href="tel:120" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center gap-1">
              <Phone className="w-4 h-4" /> 120
            </a>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 bg-gray-50 rounded-xl p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.role === "user" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                      msg.role === "user" ? "bg-blue-500 text-white rounded-br-sm" : "bg-white border text-gray-700 rounded-bl-sm shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${msg.role === "user" ? "text-right" : ""}`}>{msg.time}</div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-4 py-2 bg-white border rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="描述您遇到的情况..."
              className="flex-1 px-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="px-5 py-3.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Doctor Chat View */}
      {activeView === "doctor" && selectedDoctor && (
        <DoctorChat doctor={selectedDoctor} onBack={() => setActiveView("main")} />
      )}
    </div>
  );
}

function DoctorChat({ doctor, onBack }: { doctor: typeof doctors[0]; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", content: `您好！我是${doctor.name}，${doctor.title}。请描述您的症状或问题，我会为您提供专业建议。\n\n我的专长领域：${doctor.specialties.join("、")}\n\n⚠️ 在线咨询仅供参考，紧急情况请拨打120。`, time: getNow() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const msg = input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: msg, time: getNow() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "bot",
        content: getDoctorReply(msg, doctor.name),
        time: getNow(),
      }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b">
        <button onClick={onBack} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600" style={{ fontWeight: 600 }}>
          {doctor.avatar}
        </div>
        <div className="flex-1">
          <h3>{doctor.name}</h3>
          <p className="text-xs text-gray-500">{doctor.title} · {doctor.hospital}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 bg-gray-50 rounded-xl p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`} style={{ fontWeight: 600 }}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : doctor.avatar}
              </div>
              <div>
                <div className={`rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                  msg.role === "user" ? "bg-blue-500 text-white rounded-br-sm" : "bg-white border text-gray-700 rounded-bl-sm shadow-sm"
                }`}>
                  {msg.content}
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${msg.role === "user" ? "text-right" : ""}`}>{msg.time}</div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600" style={{ fontWeight: 600 }}>{doctor.avatar}</div>
              <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder={`向${doctor.name}描述您的情况...`}
          className="flex-1 px-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-5 py-3.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function getNow(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function getAutoReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("晕倒") || lower.includes("昏迷") || lower.includes("意识"))
    return "请按照以下步骤操作：\n\n1️⃣ 确保环境安全\n2️⃣ 轻拍双肩，大声呼唤检查意识\n3️⃣ 观察胸部起伏判断呼吸\n4️⃣ 如无意识无呼吸，立即拨打120并开始CPR\n5️⃣ 以100-120次/分的频率进行胸外按压\n\n⚠️ 如情况紧急，请立即拨打120！\n\n💡 详细的CPR操作步骤可以查看知识库的\"心肺复苏操作指南\"。";
  if (lower.includes("出血") || lower.includes("流血") || lower.includes("伤口"))
    return "外伤出血处理：\n\n1️⃣ 用干净纱布或衣物直接压迫伤口\n2️⃣ 保持压迫至少15分钟\n3️⃣ 抬高受伤部位（高于心脏）\n4️⃣ 如大量出血不止，可在伤口近心端扎止血带\n5️⃣ 记录扎止血带时间\n\n⚠️ 严重出血请立即拨打120！\n\n注意：始终佩戴手套或用塑料袋隔开，避免接触他人血液。";
  if (lower.includes("烫伤") || lower.includes("烧伤") || lower.includes("烫"))
    return "烧烫伤急救五字法：\n\n1️⃣ 冲 - 流动冷水冲洗15-20分钟\n2️⃣ 脱 - 小心脱去衣物\n3️⃣ 泡 - 冷水浸泡\n4️⃣ 盖 - 干净纱布覆盖\n5️⃣ 送 - 严重时立即送医\n\n❌ 绝对不要涂抹牙膏、酱油、蜂蜜等！\n❌ 不要用冰块直接敷\n❌ 不要挑破水泡";
  if (lower.includes("噎") || lower.includes("卡") || lower.includes("窒息"))
    return "气道异物梗阻急救（海姆立克法）：\n\n👤 成人/儿童：\n1️⃣ 站在患者身后，双臂环绕其腰部\n2️⃣ 一手握拳，拳眼对准肚脐上方两横指处\n3️⃣ 另一手握住拳头，快速向上向内冲击\n4️⃣ 重复直到异物排出\n\n👶 婴儿（<1岁）：\n背部拍击5次 + 胸部冲击5次，交替进行\n\n⚠️ 如患者失去意识，立即拨打120并开始CPR";
  if (lower.includes("发烧") || lower.includes("高烧") || lower.includes("高热"))
    return "发热/高热处理：\n\n🌡️ 首先测量体温，判断发热程度：\n• 37.3-38°C：低热\n• 38-39°C：中度发热\n• 39-41°C：高热\n\n🏠 居家处理：\n1️⃣ 多喝温水，补充水分\n2️⃣ 物理降温：温水擦浴\n3️⃣ 体温>38.5°C可服用退烧药（布洛芬或对乙酰氨基酚）\n\n⚠️ 以下情况请立即就医：\n• 体温超过40°C\n• 持续高热超过3天\n• 伴有意识改变、剧烈头痛\n• 儿童出现惊厥";
  if (lower.includes("胸痛") || lower.includes("心脏") || lower.includes("心痛"))
    return "胸痛紧急处理：\n\n⚠️ 胸痛可能是心脏病发作信号，请高度重视！\n\n1️⃣ 立即让患者坐下或半卧位休息\n2️⃣ 解开紧身衣物，保持通风\n3️⃣ 如有硝酸甘油，舌下含服一片\n4️⃣ 拨打120，告知\"疑似心脏病发作\"\n5️⃣ 如有阿司匹林且无禁忌，嚼服一片\n\n❌ 不要让患者自行走动\n❌ 不要等待症状缓解\n\n如果患者失去意识和呼吸，立即进行CPR！";
  return "感谢您的咨询。根据您描述的情况，建议您：\n\n1️⃣ 保持冷静，评估伤情严重程度\n2️⃣ 如有生命危险，立即拨打120\n3️⃣ 在等待救援期间，参考本平台的急救知识进行初步处理\n4️⃣ 建议尽快前往最近的医疗机构就诊\n\n如需更详细的指导，请描述具体症状和情况。\n\n💡 您也可以点击下方的快捷问题获取常见急救指导。";
}

function getDoctorReply(input: string, doctorName: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("头痛") || lower.includes("头疼"))
    return `根据您描述的头痛症状，我需要了解几个方面：\n\n1. 头痛持续多长时间了？\n2. 是突然发生还是逐渐加重？\n3. 疼痛部位在哪里？（前额、两侧、后脑勺）\n4. 有没有伴随其他症状？（恶心、呕吐、视物模糊）\n\n如果是突发性剧烈头痛（雷击样），请立即就医排除脑出血。\n\n请您详细描述一下，我好给您更准确的建议。— ${doctorName}`;
  if (lower.includes("胃") || lower.includes("腹痛") || lower.includes("肚子"))
    return `腹部疼痛需要注意以下几点：\n\n1. 疼痛位置很重要：上腹部可能是胃部问题，右下腹要排除阑尾炎\n2. 注意疼痛性质：绞痛、胀痛、刺痛各有不同原因\n3. 是否有发热、腹泻等伴随症状\n\n建议：近期饮食清淡，避免辛辣刺激食物。如疼痛持续加重或伴有发热，建议尽快到医院就诊。\n\n—${doctorName}`;
  if (lower.includes("感冒") || lower.includes("咳嗽") || lower.includes("发烧"))
    return `感冒/发热处理建议：\n\n🌡 先测量体温，37.3-38.5°C可先观察\n💊 可服用对乙酰氨基酚退热（按说明书用量）\n💧 多喝温水，注意休息\n🍎 饮食清淡，补充维C\n\n⚠️ 以下情况请就医：\n• 体温持续>39°C\n• 症状超过一周不好转\n• 伴有呼吸困难、胸闷\n\n还有什么需要了解的吗？— ${doctorName}`;
  return `感谢您的描述。根据您的情况，我的建议是：\n\n1. 注意观察症状变化，记录发作时间和频率\n2. 保持充分休息，避免过度劳累\n3. 如果症状持续或加重，建议到就近医疗机构进行详细检查\n\n您可以继续描述更多细节，我会给出更针对性的建议。如有紧急情况，请拨打120。\n\n— ${doctorName}`;
}