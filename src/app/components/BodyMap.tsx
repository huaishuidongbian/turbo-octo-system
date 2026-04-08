import { useState } from "react";
import {
  AlertTriangle, ChevronRight, X, Phone, BookOpen, ArrowRight,
  RotateCcw, ZoomIn, Info
} from "lucide-react";

interface BodyPart {
  id: string;
  name: string;
  injuries: Injury[];
}

interface Injury {
  name: string;
  severity: "轻微" | "中度" | "严重" | "危急";
  symptoms: string[];
  firstAid: string[];
  warning: string;
  callDoctor: boolean;
}

const bodyParts: BodyPart[] = [
  {
    id: "head",
    name: "头部",
    injuries: [
      {
        name: "头部撞击/脑震荡",
        severity: "严重",
        symptoms: ["头痛、头晕", "恶心呕吐", "短暂意识丧失", "记忆模糊", "耳鸣、视物模糊"],
        firstAid: [
          "让伤者平卧，头部稍抬高",
          "保持气道通畅，头偏向一侧防呕吐窒息",
          "用冰袋冷敷受伤部位（隔布）",
          "密切观察意识、瞳孔变化",
          "不要给伤者进食进水",
        ],
        warning: "若出现持续呕吐、瞳孔不等大、抽搐、意识下降，立即拨打120！",
        callDoctor: true,
      },
      {
        name: "头皮裂伤出血",
        severity: "中度",
        symptoms: ["头皮伤口出血量大", "可能伴有头晕"],
        firstAid: [
          "用干净纱布直接压迫伤口止血",
          "保持压力至少15分钟",
          "伤口较大或出血不止需就医缝合",
        ],
        warning: "头皮血管丰富，出血量看起来多但一般可控。伤口深需就医。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "face",
    name: "面部",
    injuries: [
      {
        name: "鼻出血",
        severity: "轻微",
        symptoms: ["鼻腔出血", "可能伴有头晕"],
        firstAid: [
          "身体前倾，头部略低",
          "用拇指和食指捏紧鼻翼两侧",
          "持续压迫10-15分钟",
          "可用冰袋冷敷鼻梁",
          "不要仰头，防止血液倒流",
        ],
        warning: "若出血持续30分钟以上，或频繁大量鼻出血，请立即就医。",
        callDoctor: false,
      },
      {
        name: "眼部异物/伤害",
        severity: "中度",
        symptoms: ["眼痛、流泪", "异物感", "视力模糊", "眼睛发红"],
        firstAid: [
          "不要揉眼睛",
          "用大量清水冲洗眼睛（化学伤至少冲洗15分钟）",
          "如有异物嵌入，不要自行取出",
          "用干净纱布轻轻覆盖受伤眼",
        ],
        warning: "化学品溅入眼睛需持续冲洗并立即就医！尖锐物刺入眼内禁止拔出。",
        callDoctor: true,
      },
    ],
  },
  {
    id: "neck",
    name: "颈部",
    injuries: [
      {
        name: "颈部扭伤/落枕",
        severity: "轻微",
        symptoms: ["颈部僵硬疼痛", "转头活动受限", "肌肉痉挛"],
        firstAid: [
          "停止活动，让颈部保持舒适位置",
          "冷敷24小时内，之后可热敷",
          "轻柔缓慢地活动颈部",
          "可服用非处方消炎止痛药",
        ],
        warning: "如伴有手臂麻木、刺痛或无力，可能涉及神经损伤，请及时就医。",
        callDoctor: false,
      },
      {
        name: "颈椎损伤（疑似）",
        severity: "危急",
        symptoms: ["剧烈颈痛", "四肢麻木无力", "无法活动", "呼吸困难"],
        firstAid: [
          "⚠️ 绝对不要移动伤者头颈部",
          "立即拨打120",
          "双手固定伤者头部两侧，防止转动",
          "保持伤者体温，等待救援",
          "如需翻身，必须整体翻转（原木滚动法）",
        ],
        warning: "颈椎损伤处理不当可能导致瘫痪，切勿随意搬动伤者！",
        callDoctor: true,
      },
    ],
  },
  {
    id: "chest",
    name: "胸部",
    injuries: [
      {
        name: "胸痛/疑似心脏病发作",
        severity: "危急",
        symptoms: ["胸口压迫感或疼痛", "疼痛可能放射至左臂、下颌", "呼吸困难", "冷汗、面色苍白", "恶心"],
        firstAid: [
          "立即拨打120",
          "让患者坐下或半卧位休息",
          "解开紧身衣物",
          "如有硝酸甘油，舌下含服一片",
          "如有阿司匹林且无过敏史，嚼服一片",
          "患者失去意识立即CPR",
        ],
        warning: "心脏病发作是致命急症，每延误1分钟存活率下降7-10%！",
        callDoctor: true,
      },
      {
        name: "肋骨骨折",
        severity: "严重",
        symptoms: ["胸部剧痛，深呼吸加重", "局部压痛、肿胀", "呼吸浅快"],
        firstAid: [
          "让伤者取舒适半坐位",
          "用宽胶带或绷带固定胸部（呼气时缠绕）",
          "用软枕支撑受伤侧",
          "不要用力按压",
        ],
        warning: "多根肋骨骨折可能导致连枷胸和气胸，出现呼吸困难立即拨打120！",
        callDoctor: true,
      },
    ],
  },
  {
    id: "abdomen",
    name: "腹部",
    injuries: [
      {
        name: "腹部钝伤",
        severity: "严重",
        symptoms: ["腹痛", "腹部硬、胀", "恶心呕吐", "面色苍白", "休克征象"],
        firstAid: [
          "让伤者仰卧，膝盖弯曲放松腹肌",
          "不要给伤者进食进水",
          "如有开放性伤口，用湿润纱布覆盖",
          "密切观察生命体征",
          "立即拨打120",
        ],
        warning: "腹部内脏损伤可能不明显但致命，腹痛加重应立即就医！",
        callDoctor: true,
      },
      {
        name: "急性腹痛（食物中毒等）",
        severity: "中度",
        symptoms: ["腹部绞痛", "恶心呕吐", "腹泻", "发热"],
        firstAid: [
          "停止进食，少量多次饮水防脱水",
          "保留可疑食物样本",
          "记录症状和发作时间",
          "可口服口服补液盐",
          "症状严重或持续恶化应就医",
        ],
        warning: "若出现血便、高热、脱水严重（口唇干裂、少尿）请立即就医。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "leftArm",
    name: "左臂",
    injuries: [
      {
        name: "上肢骨折",
        severity: "严重",
        symptoms: ["剧烈疼痛", "肿胀变形", "活动受限", "局部淤血"],
        firstAid: [
          "不要试图将骨折复位",
          "用夹板（或硬纸板、杂志等）固定",
          "固定范围包括骨折上下各一个关节",
          "用三角巾悬吊于胸前",
          "冷敷减轻肿胀",
        ],
        warning: "开放性骨折（骨头外露）请先用无菌纱布覆盖伤口，不要将骨头推回。",
        callDoctor: true,
      },
    ],
  },
  {
    id: "rightArm",
    name: "右臂",
    injuries: [
      {
        name: "手部/手指外伤",
        severity: "中度",
        symptoms: ["伤口出血", "手指活动受限", "肿胀疼痛"],
        firstAid: [
          "清洁伤口，用流动清水冲洗",
          "直接压迫止血",
          "用无菌敷料包扎",
          "手指骨折用小夹板固定于功能位",
          "断指保存：清洁纱布包裹→塑料袋密封→冰水中保存",
        ],
        warning: "断指应在6小时内送医，冬季可延长至12小时。不要将断指直接浸泡在液体中。",
        callDoctor: true,
      },
      {
        name: "扭伤/拉伤",
        severity: "轻微",
        symptoms: ["关节或肌肉疼痛", "肿胀", "活动受限", "淤青"],
        firstAid: [
          "RICE原则：",
          "R - 休息（Rest）：停止活动",
          "I - 冰敷（Ice）：冷敷20分钟",
          "C - 加压（Compression）：弹力绷带包扎",
          "E - 抬高（Elevation）：抬高受伤部位",
        ],
        warning: "48小时内避免热敷和按摩。若疼痛持续加重或关节不稳，请就医排除骨折。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "leftHand",
    name: "左手",
    injuries: [
      {
        name: "烧烫伤",
        severity: "中度",
        symptoms: ["皮肤红肿疼痛", "可能有水泡", "严重者皮肤发白或焦黑"],
        firstAid: [
          "冲 - 流动冷水冲洗15-20分钟",
          "脱 - 小心剪开脱去衣物",
          "泡 - 冷水浸泡缓解疼痛",
          "盖 - 干净纱布或保鲜膜覆盖",
          "送 - 面积大或程度深立即送医",
        ],
        warning: "❌ 不要涂牙膏、酱油等！不要刺破水泡！不要用冰块直接敷！",
        callDoctor: false,
      },
    ],
  },
  {
    id: "rightHand",
    name: "右手",
    injuries: [
      {
        name: "切割伤",
        severity: "轻微",
        symptoms: ["伤口出血", "可能较深", "边缘整齐或不规则"],
        firstAid: [
          "用清水冲洗伤口",
          "用干净纱布直接压迫止血",
          "保持压迫15分钟以上",
          "伤口边缘对合后用创可贴/蝶形胶布固定",
          "伤口较深需就医缝合",
        ],
        warning: "被铁器或污染物刺伤应在24小时内注射破伤风疫苗。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "leftLeg",
    name: "左腿",
    injuries: [
      {
        name: "下肢骨折",
        severity: "严重",
        symptoms: ["剧烈疼痛", "畸形肿胀", "无法站立行走", "腿部缩短或旋转"],
        firstAid: [
          "不要移动伤者和尝试复位",
          "用长夹板固定整条腿（从腋下至足底）",
          "或将受伤腿绑在健腿上固定",
          "监测足部血运（脚趾颜色和温度）",
          "立即拨打120或送医",
        ],
        warning: "大腿骨折可大量内出血（500-2000ml），注意预防休克！",
        callDoctor: true,
      },
    ],
  },
  {
    id: "rightLeg",
    name: "右腿",
    injuries: [
      {
        name: "膝关节损伤",
        severity: "中度",
        symptoms: ["膝关节疼痛肿胀", "活动受限", "可能有弹响或交锁", "关节不稳"],
        firstAid: [
          "停止活动，避免负重",
          "冷敷减轻肿胀",
          "用弹力绷带加压包扎",
          "抬高患肢",
          "可使用拐杖辅助行走",
        ],
        warning: "膝关节严重肿胀或无法伸直/弯曲，可能韧带或半月板损伤，需尽快就医。",
        callDoctor: false,
      },
      {
        name: "小腿抽筋",
        severity: "轻微",
        symptoms: ["小腿肌肉突然剧烈收缩", "疼痛难忍", "肌肉硬结"],
        firstAid: [
          "轻轻拉伸痉挛的肌肉",
          "用手向上扳脚掌，同时伸直膝盖",
          "按摩痉挛肌肉",
          "热敷缓解",
          "补充水分和电解质",
        ],
        warning: "频繁抽筋可能是缺钙或血管问题，建议检查。游泳时抽筋应镇静自救。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "leftFoot",
    name: "左脚",
    injuries: [
      {
        name: "踝关节扭伤",
        severity: "中度",
        symptoms: ["踝关节疼痛肿胀", "淤青", "行走困难"],
        firstAid: [
          "立即停止活动",
          "冰敷：每次20分钟，每2小时一次",
          "弹力绷带从脚趾向上\"8\"字形包扎",
          "抬高患肢高于心脏",
          "48小时内禁止热敷和按摩",
        ],
        warning: "如果完全无法负重行走或肿胀严重，需拍X光排除骨折。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "rightFoot",
    name: "右脚",
    injuries: [
      {
        name: "足部刺伤/异物",
        severity: "轻微",
        symptoms: ["刺痛", "出血", "可能有异物残留"],
        firstAid: [
          "清洁伤口周围皮肤",
          "如异物表浅，用消毒镊子取出",
          "深入的异物不要自行拔除",
          "清洗伤口后用无菌敷料包扎",
          "检查破伤风免疫状态",
        ],
        warning: "被生锈铁钉等刺伤应在24小时内就医注射破伤风。",
        callDoctor: false,
      },
    ],
  },
  {
    id: "back",
    name: "背部/脊柱",
    injuries: [
      {
        name: "腰部扭伤/急性腰痛",
        severity: "中度",
        symptoms: ["腰部剧烈疼痛", "活动受限", "可能伴有腿部放射痛"],
        firstAid: [
          "停止活动，找舒适体位卧床休息",
          "冷敷48小时，之后热敷",
          "可服用非处方止痛药",
          "避免弯腰、扭转动作",
          "疼痛缓解后逐步恢复活动",
        ],
        warning: "如伴有下肢无力、麻木、大小便异常，可能是腰椎间盘突出压迫神经，需紧急就医。",
        callDoctor: false,
      },
      {
        name: "脊柱损伤（疑似）",
        severity: "危急",
        symptoms: ["背部剧痛", "下肢感觉异常或瘫痪", "大小便失禁"],
        firstAid: [
          "⚠️ 绝对不要移动伤者",
          "立即拨打120",
          "保持伤者平卧位不动",
          "在伤者两侧放置支撑物防止翻转",
          "保持体温，安慰伤者",
        ],
        warning: "脊柱损伤搬运不当可能导致永久性瘫痪！等待专业救援！",
        callDoctor: true,
      },
    ],
  },
];

const severityConfig = {
  轻微: { color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  中度: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  严重: { color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  危急: { color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
};

// SVG body part regions – approximate hit areas (viewBox 0 0 200 440)
const bodyRegions: { id: string; d: string; label: string; cx: number; cy: number }[] = [
  { id: "head", label: "头部", cx: 100, cy: 30, d: "M82,8 Q82,0 100,0 Q118,0 118,8 L120,32 Q120,48 100,50 Q80,48 80,32 Z" },
  { id: "face", label: "面部", cx: 100, cy: 38, d: "M86,24 Q86,18 100,18 Q114,18 114,24 L114,40 Q114,48 100,48 Q86,48 86,40 Z" },
  { id: "neck", label: "颈部", cx: 100, cy: 58, d: "M92,50 L108,50 L108,66 L92,66 Z" },
  { id: "chest", label: "胸部", cx: 100, cy: 95, d: "M68,68 L132,68 L130,120 L70,120 Z" },
  { id: "abdomen", label: "腹部", cx: 100, cy: 145, d: "M70,120 L130,120 L128,170 L72,170 Z" },
  { id: "leftArm", label: "左臂", cx: 52, cy: 110, d: "M68,68 L58,68 L40,100 L36,140 L48,142 L56,105 L68,100 Z" },
  { id: "rightArm", label: "右臂", cx: 148, cy: 110, d: "M132,68 L142,68 L160,100 L164,140 L152,142 L144,105 L132,100 Z" },
  { id: "leftHand", label: "左手", cx: 34, cy: 168, d: "M36,140 L28,172 L24,180 L30,182 L38,175 L48,180 L50,170 L48,142 Z" },
  { id: "rightHand", label: "右手", cx: 166, cy: 168, d: "M164,140 L172,172 L176,180 L170,182 L162,175 L152,180 L150,170 L152,142 Z" },
  { id: "back", label: "背/脊柱", cx: 100, cy: 120, d: "M96,68 L104,68 L104,170 L96,170 Z" },
  { id: "leftLeg", label: "左腿", cx: 82, cy: 250, d: "M72,170 L96,170 L92,280 L88,340 L72,340 L76,280 Z" },
  { id: "rightLeg", label: "右腿", cx: 118, cy: 250, d: "M104,170 L128,170 L124,280 L128,340 L112,340 L108,280 Z" },
  { id: "leftFoot", label: "左脚", cx: 76, cy: 370, d: "M72,340 L88,340 L88,370 L92,380 L66,380 L66,370 Z" },
  { id: "rightFoot", label: "右脚", cx: 124, cy: 370, d: "M112,340 L128,340 L128,370 L134,380 L108,380 L112,370 Z" },
];

export default function BodyMap({ onSelectPart }: { onSelectPart?: (partId: string) => void }) {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedInjuryIdx, setSelectedInjuryIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"front" | "back">("front");

  const selectedPart = bodyParts.find((p) => p.id === selectedPartId) || null;
  const selectedInjury = selectedPart ? selectedPart.injuries[selectedInjuryIdx] : null;

  const handlePartClick = (id: string) => {
    setSelectedPartId(id);
    setSelectedInjuryIdx(0);
    onSelectPart?.(id);
  };

  const resetSelection = () => {
    setSelectedPartId(null);
    setSelectedInjuryIdx(0);
  };

  // Filter regions for front/back view
  const visibleRegions = viewMode === "front"
    ? bodyRegions.filter((r) => r.id !== "back")
    : bodyRegions.filter((r) => ["head", "neck", "back", "leftArm", "rightArm", "leftHand", "rightHand", "leftLeg", "rightLeg", "leftFoot", "rightFoot"].includes(r.id));

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg" style={{ fontWeight: 700 }}>紧急措施 · 点击人体部位</h3>
              <p className="text-sm text-gray-500">选择受伤部位，获取对应急救知识</p>
            </div>
          </div>
          {selectedPartId && (
            <button
              onClick={resetSelection}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> 重新选择
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Body SVG */}
        <div className="lg:w-[340px] p-6 flex flex-col items-center border-b lg:border-b-0 lg:border-r bg-gray-50/50">
          {/* View Toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => { setViewMode("front"); resetSelection(); }}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "front" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"}`}
              style={viewMode === "front" ? { fontWeight: 600 } : {}}
            >
              正面
            </button>
            <button
              onClick={() => { setViewMode("back"); resetSelection(); }}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === "back" ? "bg-white shadow text-red-600" : "text-gray-500 hover:text-gray-700"}`}
              style={viewMode === "back" ? { fontWeight: 600 } : {}}
            >
              背面
            </button>
          </div>

          <svg viewBox="0 0 200 400" className="w-[220px] h-[380px] select-none">
            {/* Body silhouette */}
            <g opacity="0.12">
              {/* Head */}
              <ellipse cx="100" cy="26" rx="20" ry="24" fill="#6b7280" />
              {/* Neck */}
              <rect x="92" y="50" width="16" height="16" rx="3" fill="#6b7280" />
              {/* Torso */}
              <path d="M68,66 Q66,64 64,66 L60,68 L132,68 Q136,64 140,68 L140,68 Z" fill="#6b7280" />
              <path d="M60,68 L60,120 L68,170 L132,170 L140,120 L140,68 Z" fill="#6b7280" rx="8" />
              {/* Left arm */}
              <path d="M60,68 L48,72 L36,100 L30,140 L26,170 L20,182 L28,186 L38,175 L42,150 L48,130 L56,105 L60,90 Z" fill="#6b7280" />
              {/* Right arm */}
              <path d="M140,68 L152,72 L164,100 L170,140 L174,170 L180,182 L172,186 L162,175 L158,150 L152,130 L144,105 L140,90 Z" fill="#6b7280" />
              {/* Left leg */}
              <path d="M68,170 L96,172 L90,240 L86,310 L84,340 L82,370 L88,382 L64,382 L64,370 L68,340 L70,310 L74,240 Z" fill="#6b7280" />
              {/* Right leg */}
              <path d="M104,172 L132,170 L126,240 L130,310 L132,340 L134,370 L136,382 L112,382 L112,370 L116,340 L118,310 L110,240 Z" fill="#6b7280" />
            </g>

            {/* Clickable regions */}
            {visibleRegions.map((region) => {
              const isSelected = selectedPartId === region.id;
              const isHovered = hoveredPart === region.id;
              return (
                <g key={region.id}>
                  <path
                    d={region.d}
                    fill={isSelected ? "rgba(239,68,68,0.35)" : isHovered ? "rgba(239,68,68,0.18)" : "transparent"}
                    stroke={isSelected ? "#ef4444" : isHovered ? "#f87171" : "transparent"}
                    strokeWidth={isSelected ? 2 : 1.5}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handlePartClick(region.id)}
                    onMouseEnter={() => setHoveredPart(region.id)}
                    onMouseLeave={() => setHoveredPart(null)}
                  />
                  {/* Label on hover */}
                  {(isHovered || isSelected) && (
                    <g>
                      <circle cx={region.cx} cy={region.cy} r="3" fill="#ef4444" className="animate-pulse" />
                    </g>
                  )}
                </g>
              );
            })}

            {/* Hover tooltip */}
            {hoveredPart && !selectedPartId && (() => {
              const region = bodyRegions.find((r) => r.id === hoveredPart);
              if (!region) return null;
              const tx = region.cx > 100 ? region.cx + 14 : region.cx - 14;
              return (
                <g>
                  <rect
                    x={region.cx > 100 ? tx - 4 : tx - 36}
                    y={region.cy - 11}
                    width="40" height="22" rx="4"
                    fill="#1f2937" opacity="0.9"
                  />
                  <text
                    x={region.cx > 100 ? tx + 16 : tx - 16}
                    y={region.cy + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    {region.label}
                  </text>
                </g>
              );
            })()}
          </svg>

          {!selectedPartId && (
            <div className="text-center mt-2">
              <p className="text-sm text-gray-400 flex items-center gap-1.5 justify-center">
                <ZoomIn className="w-4 h-4" /> 点击人体部位查看急救知识
              </p>
            </div>
          )}
        </div>

        {/* Injury Detail Panel */}
        <div className="flex-1 min-h-[400px]">
          {!selectedPart ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Info className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg mb-1" style={{ fontWeight: 600 }}>← 点击人体部位</p>
              <p className="text-sm">查看对应急救知识</p>
              <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-md">
                {bodyParts.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePartClick(p.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Part Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg" style={{ fontWeight: 700 }}>{selectedPart.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-xl" style={{ fontWeight: 700 }}>{selectedPart.name}伤情</h3>
                  <p className="text-sm text-gray-400">{selectedPart.injuries.length} 种常见伤情</p>
                </div>
              </div>

              {/* Injury tabs */}
              {selectedPart.injuries.length > 1 && (
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  {selectedPart.injuries.map((inj, idx) => {
                    const sev = severityConfig[inj.severity];
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedInjuryIdx(idx)}
                        className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all border ${
                          selectedInjuryIdx === idx
                            ? "bg-red-600 text-white border-red-600 shadow-sm"
                            : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                        }`}
                        style={selectedInjuryIdx === idx ? { fontWeight: 600 } : {}}
                      >
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${selectedInjuryIdx === idx ? "bg-white" : sev.dot}`} />
                        {inj.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {selectedInjury && (
                <div className="space-y-5">
                  {/* Severity + Name */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-sm border ${severityConfig[selectedInjury.severity].color}`} style={{ fontWeight: 600 }}>
                      {selectedInjury.severity}
                    </span>
                    <h4 className="text-lg" style={{ fontWeight: 600 }}>{selectedInjury.name}</h4>
                    {selectedInjury.callDoctor && (
                      <a href="tel:120" className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors" style={{ fontWeight: 600 }}>
                        <Phone className="w-4 h-4" /> 拨打120
                      </a>
                    )}
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h5 className="text-sm text-gray-500 mb-2 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                      <span className="w-1 h-4 bg-blue-500 rounded-full" /> 常见症状
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedInjury.symptoms.map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* First Aid Steps */}
                  <div>
                    <h5 className="text-sm text-gray-500 mb-2 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                      <span className="w-1 h-4 bg-green-500 rounded-full" /> 急救步骤
                    </h5>
                    <div className="bg-green-50 rounded-xl p-4 space-y-2.5">
                      {selectedInjury.firstAid.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs shrink-0" style={{ fontWeight: 700 }}>{i + 1}</span>
                          <span className="text-sm text-green-800 pt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-700" style={{ fontWeight: 600 }}>注意事项</p>
                      <p className="text-sm text-red-600 mt-1">{selectedInjury.warning}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`/knowledge`}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" /> 查看详细知识
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    {selectedInjury.callDoctor && (
                      <a
                        href="tel:120"
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        <Phone className="w-4 h-4" /> 紧急呼叫 120
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
