import { useState } from "react";
import { useParams, NavLink } from "react-router";
import {
  ArrowLeft, Clock, AlertTriangle, CheckCircle, Share2, Bookmark, ThumbsUp,
  PlayCircle, ChevronRight, Heart, BookOpen, Eye, MessageCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const allArticles: Record<string, {
  id: string; category: string; title: string; summary: string;
  steps: { title: string; detail: string }[];
  time: string; level: string; image: string;
  tips: string[]; warnings: string[]; relatedIds: string[];
  views: number; likes: number;
  videoPlaceholder?: boolean;
}> = {
  "cpr": {
    id: "cpr", category: "心脏急救", title: "心肺复苏（CPR）操作指南",
    summary: "当发现有人心脏骤停时，立即进行心肺复苏可以大大提高生存率。每延迟1分钟，存活率下降7-10%。掌握正确的CPR步骤，是每个人都应该学会的急救技能。",
    steps: [
      { title: "确认环境安全，拨打120", detail: "确保周围环境对你和患者都是安全的。立即拨打120或让旁人拨打，开启免提模式以便接受调度员指导。" },
      { title: "检查意识和呼吸", detail: "轻拍患者双肩，大声呼喊'你还好吗？'。观察胸部是否有正常起伏，判断时间不超过10秒。不要将耳朵凑近口鼻。" },
      { title: "胸外按压定位", detail: "两手交叉重叠，掌根放于胸骨中下1/3处（两乳头连线中点）。手臂伸直，用上半身重量垂直按压。" },
      { title: "按压深度和频率", detail: "按压深度5-6cm（约2英寸），频率100-120次/分。每次按压后让胸廓完全回弹，不要倚靠在患者身上。" },
      { title: "开放气道与人工呼吸", detail: "每30次按压后，仰头抬颏法打开气道，捏住鼻子，口对口吹气2次，每次吹气1秒，观察胸廓起伏。" },
      { title: "持续循环直到急救到达", detail: "以30:2的比例（30次按压+2次人工呼吸）持续进行CPR。如有AED设备到达，立即使用。如果你感到疲劳，与他人交替进行。" },
    ],
    time: "5分钟", level: "必学",
    image: "https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMENQUiUyMHRyYWluaW5nfGVufDF8fHx8MTc3NDkzMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["如果不愿意进行人工呼吸，仅做胸外按压也比什么都不做好得多", "按压位置不要太靠上（颈部）或太靠下（腹部）", "节奏可参考歌曲《Stayin' Alive》的节拍"],
    warnings: ["不要因犹豫而延误按压，错误的CPR也比不做好", "不要停下来检查脉搏，除非有明显生命迹象恢复", "孕妇和婴幼儿的CPR方法有所不同"],
    relatedIds: ["aed", "stroke"],
    views: 12580, likes: 863,
    videoPlaceholder: true,
  },
  "aed": {
    id: "aed", category: "心脏急救", title: "AED（自动体外除颤器）使用指南",
    summary: "AED是一种便携式医疗设备，能够自动分析心律并在需要时进行电击除颤。非医疗人员也可安全使用，设备会通过语音提示指导每一步操作。",
    steps: [
      { title: "打开AED电源", detail: "按下电源按钮或打开盖子（部分设备开盖即自动启动）。仔细听取语音提示。" },
      { title: "暴露患者胸部", detail: "剪开或脱去患者胸部衣物，确保胸部干燥。如胸部有水，用干毛巾擦干；如有胸毛过多，可能需要先剃除贴片区域。" },
      { title: "贴好电极片", detail: "按照电极片上的图示贴好：一片贴在右锁骨下方，另一片贴在左乳头外侧下方（腋中线）。确保贴紧无气泡。" },
      { title: "等待心律分析", detail: "AED会自动分析心律，此时所有人必须离开患者身体。语音会提示'正在分析心律，请不要触碰患者'" },
      { title: "按下放电按钮", detail: "如果AED建议电击，确保所有人远离患者，大声喊'离开！'然后按下闪烁的放电按钮。" },
      { title: "电击后立即继续CPR", detail: "电击完成后立即恢复胸外按压，不要停下来检查脉搏。AED会在2分钟后再次分析心律。" },
    ],
    time: "3分钟", level: "重要",
    image: "https://images.unsplash.com/photo-1617257484989-9f8ab411c362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBRUQlMjBkZWZpYnJpbGxhdG9yJTIwZGV2aWNlfGVufDF8fHx8MTc3NTAwNTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["AED不会对正常心律进行电击，所以不用担心误操作", "儿童（1-8岁）应使用儿童电极片或调低能量档位", "使用AED时不要中断CPR超过10秒"],
    warnings: ["患者胸部有水时必须擦干", "患者有植入式起搏器（胸部有凸起）时，电极片应避开至少2.5cm", "不要在有易燃气体的环境中使用AED"],
    relatedIds: ["cpr", "drowning"],
    views: 8920, likes: 625,
    videoPlaceholder: true,
  },
  "trauma": {
    id: "trauma", category: "外伤处理", title: "外伤止血与包扎技巧",
    summary: "正确的止血包扎可以有效控制出血，防止感染，是最常用的急救技能之一。了解不同类型出血的特征和处理方法至关重要。",
    steps: [
      { title: "评估出血类型", detail: "动脉出血：鲜红色、喷射状；静脉出血：暗红色、持续流出；毛细血管出血：渗出少量。不同出血类型处理紧迫程度不同。" },
      { title: "直接压迫止血", detail: "用干净纱布或布料直接压迫伤口，保持持续压迫至少15分钟。不要反复掀开查看。" },
      { title: "加压包扎", detail: "在压迫止血的基础上，用绷带或布条加压包扎固定。包扎要紧，但不要过紧影响远端血液循环。" },
      { title: "止血带使用（必要时）", detail: "如出血不止，可在伤口上方5-10cm处扎止血带。记录扎止血带时间，每隔45-60分钟放松一次。" },
      { title: "抬高伤肢", detail: "在不影响骨折的情况下，将受伤肢体抬高至高于心脏的位置，有助于减少出血。" },
      { title: "保持并送医", detail: "保持伤口清洁，用无菌敷料覆盖。观察远端肢体颜色和温度，尽快送医处理。" },
    ],
    time: "4分钟", level: "常用",
    image: "https://images.unsplash.com/photo-1758206524196-838bdb43ab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZW1lcmdlbmN5JTIwc3RyZXRjaGVyfGVufDF8fHx8MTc3NTA4ODU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["始终佩戴手套或用塑料袋隔开，避免接触他人血液", "如果有异物嵌入伤口，不要拔出，用敷料固定后送医", "压迫止血时可以叠加更多纱布，不要撤掉已有的"],
    warnings: ["止血带不要扎在关节处", "不要用粗绳或铁丝做止血带", "面部和头部出血量大但通常不使用止血带"],
    relatedIds: ["cpr", "burn"],
    views: 7340, likes: 498,
  },
  "burn": {
    id: "burn", category: "烧烫伤", title: "烧烫伤紧急处理",
    summary: "烧烫伤发生后的正确处理可以减轻疼痛、减少疤痕形成。记住五字诀：冲、脱、泡、盖、送。",
    steps: [
      { title: "冲 - 冷水冲洗", detail: "立即用流动冷水（15-25°C）冲洗伤处15-20分钟。这是最重要的一步，能有效降低组织温度、减轻疼痛。" },
      { title: "脱 - 脱去衣物", detail: "在冷水下小心脱去伤处衣物。如衣物与皮肤粘连，不要强行撕扯，可用剪刀沿周围剪开。" },
      { title: "泡 - 冷水浸泡", detail: "将伤处浸泡在冷水中继续降温。但要注意大面积烧伤不宜长时间浸泡，防止低体温。" },
      { title: "盖 - 覆盖伤口", detail: "用干净纱布或保鲜膜轻轻覆盖伤口，保护创面免受污染。不要在伤口上涂抹任何东西。" },
      { title: "送 - 尽快送医", detail: "大面积烧伤（成人>10%体表面积）、深度��伤、面部/手部/关节/会阴部烧伤，需立即拨打120送医。" },
    ],
    time: "3分钟", level: "常用",
    image: "https://images.unsplash.com/photo-1766973117689-1f4fad3c42b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNhZmV0eSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc1MDg4NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["化学灼伤需持续冲洗至少30分钟", "水泡不要自行挑破，容易感染", "冲洗时水流不要太强，避免加重损伤"],
    warnings: ["绝对不要涂抹牙膏、酱油、蜂蜜、芦荟等偏方", "不要用冰块直接敷在伤口上，会造成冻伤", "不要在伤口上使用棉花，纤维会粘连"],
    relatedIds: ["trauma", "poison"],
    views: 6210, likes: 412,
  },
  "poison": {
    id: "poison", category: "中毒急救", title: "食物中毒应急处理",
    summary: "食物中毒后需要快速判断并采取正确措施，避免毒素进一步吸收，同时保留证据便于医生诊断。",
    steps: [
      { title: "停止食用可疑食物", detail: "立即停止所有人食用可疑食物，并将剩余食物保留作为检验样本。" },
      { title: "判断中毒程度", detail: "观察症状：轻度（恶心、呕吐、腹泻）、中度（剧烈呕吐、脱水）、重度（意识模糊、呼吸困难、休克）。" },
      { title: "催吐处理", detail: "仅在意识清醒、中毒时间在2小时内时可催吐。用手指刺激咽喉部。腐蚀性毒物（强酸强碱）禁止催吐！" },
      { title: "拨打120或就医", detail: "中重度中毒立即拨打120。告知接线员：中毒人数、可疑食物、症状表现、中毒时间。" },
      { title: "记录信息", detail: "记录食用时间、食物种类、症状出现时间和变化过程，这些信息对医生诊断非常重要。" },
      { title: "同食者观察", detail: "所有同食者都需要观察至少24小时，即使暂时没有症状也不能掉以轻心。" },
    ],
    time: "3分钟", level: "重要",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwcGlsbHN8ZW58MXx8fHwxNzc0OTgyNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["腹泻时注意补充水分和电解质，可口服补液盐", "保留呕吐物也有助于化验分析", "如有食品包装袋，一并保留"],
    warnings: ["昏迷患者绝对不能催吐", "不要自行服用止吐药或止泻药", "石油制品中毒禁止催吐"],
    relatedIds: ["burn", "stroke"],
    views: 5120, likes: 328,
  },
  "drowning": {
    id: "drowning", category: "溺水急救", title: "溺水急救处理流程",
    summary: "溺水是常见意外伤害，正确的急救处理可以挽救生命。施救者必须首先确保自身安全。",
    steps: [
      { title: "确保施救者安全", detail: "不要贸然下水！先评估自己是否具备水中救援能力。多数溺水事故的二次伤亡都是因为盲目施救。" },
      { title: "岸上救援为先", detail: "利用竹竿、绳索、救生圈等工具从岸上施救。大声呼救寻求帮助，立即拨打120和119。" },
      { title: "上岸后初步评估", detail: "将溺水者救上岸后，迅速检查意识和呼吸。清除口鼻内可见的泥沙和异物。" },
      { title: "无呼吸立即CPR", detail: "如果溺水者无呼吸，先给予5次人工呼吸（溺水特殊要求），然后按30:2的比例进行CPR。" },
      { title: "有呼吸侧卧位", detail: "如果溺水者有呼吸但无意识，将其置于恢复体位（侧卧），持续观察呼吸。" },
      { title: "保温并等待急救", detail: "脱去湿衣服，用干燥衣物或毛毯保温。即使溺水者看起来已恢复正常，也必须送医检查。" },
    ],
    time: "4分钟", level: "重要",
    image: "https://images.unsplash.com/photo-1774557936610-ea8aa35019bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWFsdGglMjB2b2x1bnRlZXIlMjB0ZWFtfGVufDF8fHx8MTc3NTA4ODU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["溺水者不会像电影中那样挥手呼救，实际溺水往往很安静", "浅水也会溺水，浴缸、水桶对婴幼儿都是危险的", "不需要控水！控水会延误CPR时间"],
    warnings: ["绝对不要做'倒挂控水'，这是错误且危险的做法", "不要试图在深水中做心肺复苏", "即使溺水者苏醒也要送医，可能发生迟发性肺水肿"],
    relatedIds: ["cpr", "aed"],
    views: 6890, likes: 475,
  },
  "stroke": {
    id: "stroke", category: "脑卒中", title: "脑卒中快速识别与急救",
    summary: "脑卒中发病后每分钟约有190万个脑细胞死亡。'时间就是大脑'，快速识别和送医至关重要。牢记FAST识别法。",
    steps: [
      { title: "F-Face 面部观察", detail: "让患者微笑或露出牙齿，观察面部是否对称。一侧嘴角下垂、面部歪斜是脑卒中的典型信号。" },
      { title: "A-Arms 手臂测试", detail: "让患者闭眼双臂平举10秒，观察是否有一侧手臂无法维持或明显下垂。" },
      { title: "S-Speech 语言测试", detail: "让患者说一句完整的话（如'今天天气很好'），观察是否口齿不清、词不达意或无法说话。" },
      { title: "T-Time 立即拨打120", detail: "如出现以上任何一项症状，立即记录发病时间并拨打120。发病时间对溶栓治疗至关重要（黄金4.5小时）。" },
      { title: "等待期间的护理", detail: "让患者侧卧（防止呕吐窒息），解开衣领，保持呼吸通畅。记录症状变化。" },
      { title: "绝对禁止事项", detail: "不要给患者喂水、喂食或服药！不要随意搬动患者头部。不要等待症状自行缓解。" },
    ],
    time: "3分钟", level: "必学",
    image: "https://images.unsplash.com/photo-1680759290608-c6dda7570b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwaGVhbHRoJTIwY2hlY2t1cHxlbnwxfHx8fDE3NzUwODg1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tips: ["高血压、糖尿病、心房颤动人群是高危人群", "脑卒中症状可能短暂出现后消失（TIA），也要立即就医", "记住发病的准确时间，精确到分钟最好"],
    warnings: ["不要给疑似脑卒中患者服用阿司匹林（可能是出血性卒中）", "不要延误——'等等看'会错过最佳治疗时机", "不要自行驾车送医，等待120急救车"],
    relatedIds: ["cpr", "poison"],
    views: 9450, likes: 712,
  },
};

const titleMap: Record<string, string> = {
  cpr: "cpr", aed: "aed", trauma: "trauma", burn: "burn",
  poison: "poison", drowning: "drowning", stroke: "stroke",
};

export default function KnowledgeDetailPage() {
  const { id } = useParams();
  const article = id ? allArticles[id] : null;
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl text-gray-500 mb-4">未找到该急救知识</h2>
        <NavLink to="/knowledge" className="text-red-600 hover:underline flex items-center justify-center gap-1">
          <ArrowLeft className="w-4 h-4" /> 返回知识库
        </NavLink>
      </div>
    );
  }

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const progress = Math.round((completedSteps.size / article.steps.length) * 100);
  const relatedArticles = article.relatedIds.map((rid) => allArticles[rid]).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <NavLink to="/" className="hover:text-red-600">首页</NavLink>
        <ChevronRight className="w-3 h-3" />
        <NavLink to="/knowledge" className="hover:text-red-600">急救知识库</NavLink>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">{article.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">{article.title}</span>
      </nav>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
        <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Title & Meta */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className={`text-sm px-3 py-1 rounded-full ${
            article.level === "必学" ? "bg-red-100 text-red-600" : article.level === "重要" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
          }`} style={{ fontWeight: 600 }}>{article.level}</span>
          <span className="text-sm text-gray-400">{article.category}</span>
        </div>
        <h1 className="text-2xl md:text-3xl mb-4" style={{ fontWeight: 700 }}>{article.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{article.summary}</p>
        <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />阅读约 {article.time}</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{article.views.toLocaleString()} 次浏览</span>
          <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{article.likes} 人觉得有用</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${
              liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? "fill-red-600" : ""}`} />
            {liked ? "已点赞" : "有用"}
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${
              bookmarked ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-yellow-500" : ""}`} />
            {bookmarked ? "已收藏" : "收藏"}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />分享
          </button>
        </div>
      </div>

      {/* Video Placeholder */}
      {article.videoPlaceholder && (
        <div className="bg-gray-900 rounded-2xl h-56 md:h-72 mb-8 flex items-center justify-center cursor-pointer group relative overflow-hidden">
          <ImageWithFallback src={article.image} alt="video" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative text-center">
            <PlayCircle className="w-16 h-16 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white" style={{ fontWeight: 600 }}>观看操作视频演示</p>
            <p className="text-gray-400 text-sm mt-1">视频时长约 {article.time}</p>
          </div>
        </div>
      )}

      {/* Learning Progress */}
      <div className="bg-white border rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl flex items-center gap-2" style={{ fontWeight: 700 }}>
            <AlertTriangle className="w-5 h-5 text-red-500" /> 操作步骤
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">学习进度</div>
            <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm text-green-600" style={{ fontWeight: 600 }}>{progress}%</span>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {article.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStepIdx(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeStepIdx === i
                  ? "bg-red-600 text-white"
                  : completedSteps.has(i)
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-50 text-gray-600 border hover:bg-gray-100"
              }`}
            >
              {completedSteps.has(i) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs" style={{ fontWeight: 600 }}>{i + 1}</span>
              )}
              步骤 {i + 1}
            </button>
          ))}
        </div>

        {/* Active Step Detail */}
        <div className="bg-red-50/50 rounded-xl p-6 mb-4">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-lg shrink-0" style={{ fontWeight: 700 }}>{activeStepIdx + 1}</span>
            <div className="flex-1">
              <h3 className="text-lg text-red-800 mb-2" style={{ fontWeight: 600 }}>
                {article.steps[activeStepIdx].title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{article.steps[activeStepIdx].detail}</p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActiveStepIdx(Math.max(0, activeStepIdx - 1))}
              disabled={activeStepIdx === 0}
              className="px-4 py-2 rounded-lg border text-gray-500 hover:bg-white disabled:opacity-30 transition-colors"
            >
              上一步
            </button>
            <button
              onClick={() => {
                toggleStep(activeStepIdx);
                if (activeStepIdx < article.steps.length - 1) setActiveStepIdx(activeStepIdx + 1);
              }}
              className={`px-5 py-2 rounded-lg transition-colors ${
                completedSteps.has(activeStepIdx)
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {completedSteps.has(activeStepIdx) ? "✓ 已掌握" : "标记为已掌握"}
            </button>
            <button
              onClick={() => setActiveStepIdx(Math.min(article.steps.length - 1, activeStepIdx + 1))}
              disabled={activeStepIdx === article.steps.length - 1}
              className="px-4 py-2 rounded-lg border text-gray-500 hover:bg-white disabled:opacity-30 transition-colors"
            >
              下一步
            </button>
          </div>
        </div>

        {/* All Steps Overview */}
        <div className="space-y-2">
          {article.steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStepIdx(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeStepIdx === i ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 ${
                completedSteps.has(i) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`} style={{ fontWeight: 600 }}>
                {completedSteps.has(i) ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </span>
              <span className={completedSteps.has(i) ? "text-green-700" : "text-gray-700"}>{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips & Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="flex items-center gap-2 text-blue-700 mb-4" style={{ fontWeight: 600 }}>
            <MessageCircle className="w-5 h-5" /> 实用技巧
          </h3>
          <ul className="space-y-3">
            {article.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                <span className="text-blue-400 mt-0.5">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="flex items-center gap-2 text-red-700 mb-4" style={{ fontWeight: 600 }}>
            <AlertTriangle className="w-5 h-5" /> 注意事项
          </h3>
          <ul className="space-y-3">
            {article.warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                <span className="text-red-400 mt-0.5">⚠️</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl mb-4" style={{ fontWeight: 700 }}>相关知识</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((ra) => (
              <NavLink
                key={ra.id}
                to={`/knowledge/${ra.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border p-4 hover:shadow-md transition-shadow group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <ImageWithFallback src={ra.image} alt={ra.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    ra.level === "必学" ? "bg-red-100 text-red-600" : ra.level === "重要" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                  }`}>{ra.level}</span>
                  <h3 className="mt-1 truncate">{ra.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{ra.summary}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center pb-8">
        <NavLink to="/knowledge" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回知识库
        </NavLink>
      </div>
    </div>
  );
}