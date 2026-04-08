import { useState } from "react";
import { NavLink } from "react-router";
import { MapPin, Phone, Clock, Navigation, Zap, Hospital, Pill, ChevronRight, Star, Filter, Search, AlertCircle, Route, Info } from "lucide-react";

const tabs = [
  { id: "hospital", label: "医疗机构", icon: Hospital, count: 4 },
  { id: "aed", label: "AED设备", icon: Zap, count: 5 },
  { id: "pharmacy", label: "24h药房", icon: Pill, count: 3 },
];

const hospitals = [
  { id: 1, name: "朝阳区社区卫生服务中心", type: "社区医院", distance: "0.3km", time: "步行5分钟", phone: "010-8888-1001", address: "朝阳区建国路88号", rating: 4.8, hours: "24小时", hasER: true, departments: ["急诊科", "内科", "外科", "儿科"], beds: 50 },
  { id: 2, name: "北京朝阳医院", type: "三甲医院", distance: "1.2km", time: "驾车5分钟", phone: "010-8888-2002", address: "朝阳区工人体育场南路8号", rating: 4.9, hours: "24小时", hasER: true, departments: ["急诊科", "心内科", "神经外科", "骨科", "ICU"], beds: 1200 },
  { id: 3, name: "民航总医院", type: "三级医院", distance: "2.1km", time: "驾车8分钟", phone: "010-8888-3003", address: "朝阳区高井甲1号", rating: 4.6, hours: "24小时", hasER: true, departments: ["急诊科", "内科", "外科"], beds: 600 },
  { id: 4, name: "社区诊所（东区）", type: "社区诊所", distance: "0.5km", time: "步行8分钟", phone: "010-8888-4004", address: "朝阳区东三环中路12号", rating: 4.5, hours: "8:00-20:00", hasER: false, departments: ["全科", "中医科"], beds: 10 },
];

const aedLocations = [
  { id: 1, name: "社区服务中心大厅", location: "一楼入口左侧", distance: "0.1km", status: "正常", lastCheck: "2026-03-25", brand: "迈瑞", model: "BeneHeart C2" },
  { id: 2, name: "阳光花园小区物业", location: "物业办公室门口", distance: "0.2km", status: "正常", lastCheck: "2026-03-20", brand: "菲利普", model: "HeartStart FRx" },
  { id: 3, name: "社区体育公园", location: "篮球场旁急救箱", distance: "0.4km", status: "正常", lastCheck: "2026-03-22", brand: "迈瑞", model: "BeneHeart C2" },
  { id: 4, name: "朝阳商业广场", location: "B1层服务台", distance: "0.6km", status: "维护中", lastCheck: "2026-03-10", brand: "日本光电", model: "AED-3100" },
  { id: 5, name: "地铁国贸站", location: "A出口闸机旁", distance: "0.8km", status: "正常", lastCheck: "2026-03-28", brand: "菲利普", model: "HeartStart FRx" },
];

const pharmacies = [
  { id: 1, name: "国大药房（朝阳店）", distance: "0.3km", phone: "010-6666-1001", address: "朝阳区建国路66号", hours: "24小时", hasDrugDelivery: true, emergencyDrugs: ["肾上腺素笔", "硝酸甘油", "速效救心丸"] },
  { id: 2, name: "同仁堂（东三环店）", distance: "0.7km", phone: "010-6666-2002", address: "朝阳区东三环中路8号", hours: "24小时", hasDrugDelivery: false, emergencyDrugs: ["速效救心丸", "阿司匹林", "止血贴"] },
  { id: 3, name: "益丰大药房", distance: "1.0km", phone: "010-6666-3003", address: "朝阳区光华路10号", hours: "24小时", hasDrugDelivery: true, emergencyDrugs: ["创可贴", "碘伏", "纱布绷带"] },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("hospital");
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterER, setFilterER] = useState(false);

  const filteredHospitals = hospitals.filter((h) => {
    const matchSearch = h.name.includes(searchQuery) || h.address.includes(searchQuery);
    const matchER = !filterER || h.hasER;
    return matchSearch && matchER;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <NavLink to="/" className="hover:text-red-600">首页</NavLink>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700">急救服务</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>急救服务</h1>
          <p className="text-gray-500">快速定位附近医疗资源，争分夺秒</p>
        </div>
        {/* Emergency Quick Dial */}
        <div className="flex gap-2">
          <a href="tel:120" className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <div style={{ fontWeight: 600 }}>拨打 120</div>
              <div className="text-xs text-red-200">急救热线</div>
            </div>
          </a>
          <a href="tel:01088886666" className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <div style={{ fontWeight: 600 }}>社区急救</div>
              <div className="text-xs text-orange-200">010-8888-6666</div>
            </div>
          </a>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl h-64 mb-8 flex items-center justify-center border border-blue-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"none\" stroke=\"%233b82f6\" stroke-width=\"0.5\"/%3E%3Cpath d=\"M0 50h100M50 0v100\" stroke=\"%233b82f6\" stroke-width=\"0.3\"/%3E%3C/svg%3E')" }} />
        {/* Simulated pins */}
        <div className="absolute top-1/4 left-1/3">
          <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md animate-bounce" />
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-white shadow-md" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md" />
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md" />
        </div>
        <div className="text-center text-blue-400 relative z-10">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
          <p style={{ fontWeight: 600 }}>地图加载区域</p>
          <p className="text-sm">显示附近医疗机构、AED设备和药房位置</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full inline-block" /> 医院</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 rounded-full inline-block" /> AED</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> 药房</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> 我的位置</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
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
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100"}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Hospital List */}
      {activeTab === "hospital" && (
        <>
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索医院名称或地址..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
            <button
              onClick={() => setFilterER(!filterER)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${filterER ? "bg-red-600 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}
            >
              <Filter className="w-4 h-4" />
              仅显示有急诊的医院
            </button>
          </div>

          <div className="space-y-4">
            {filteredHospitals.map((h) => {
              const isExpanded = expandedHospital === h.id;
              return (
                <div key={h.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg">{h.name}</h3>
                          {h.hasER && <span className="text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>急诊</span>}
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{h.type}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{h.address}</span>
                          <span className="flex items-center gap-1"><Navigation className="w-4 h-4" />{h.distance} · {h.time}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{h.hours}</span>
                          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{h.rating}</span>
                        </div>
                        <button
                          onClick={() => setExpandedHospital(isExpanded ? null : h.id)}
                          className="text-sm text-blue-500 hover:text-blue-700 mt-2 flex items-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          {isExpanded ? "收起详情" : "查看详情"}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <a href={`tel:${h.phone.replace(/-/g, "")}`} className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                          <Phone className="w-5 h-5" /> 拨打电话
                        </a>
                        <button className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                          <Route className="w-5 h-5" /> 导航前往
                        </button>
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="border-t px-5 py-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400 mb-1">联系电话</div>
                          <div className="text-gray-700">{h.phone}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-1">床位数</div>
                          <div className="text-gray-700">{h.beds} 张</div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-1">科室</div>
                          <div className="flex flex-wrap gap-1">
                            {h.departments.map((d) => (
                              <span key={d} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* AED List */}
      {activeTab === "aed" && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-start gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800" style={{ fontWeight: 600 }}>AED设备使用提示</p>
              <p className="text-sm text-yellow-700 mt-1">AED可由非专业人员操作，设备会语音提示操作步骤。发现心脏骤停患者请立即取用最近的AED。</p>
              <NavLink to="/knowledge/aed" className="inline-flex items-center gap-1 text-sm text-yellow-700 hover:underline mt-2" style={{ fontWeight: 600 }}>
                学习AED使用方法 <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
          {aedLocations.map((aed) => (
            <div key={aed.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h3>{aed.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${aed.status === "正常" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`} style={{ fontWeight: 600 }}>{aed.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{aed.location}</span>
                    <span className="flex items-center gap-1"><Navigation className="w-4 h-4" />{aed.distance}</span>
                    <span>品牌：{aed.brand} {aed.model}</span>
                    <span>最近检查：{aed.lastCheck}</span>
                  </div>
                </div>
                <button
                  disabled={aed.status !== "正常"}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors shrink-0 ${
                    aed.status === "正常" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Route className="w-5 h-5" /> 导航前往
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pharmacy List */}
      {activeTab === "pharmacy" && (
        <div className="space-y-4">
          {pharmacies.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Pill className="w-5 h-5 text-green-500" />
                    <h3>{p.name}</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>{p.hours}</span>
                    {p.hasDrugDelivery && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">支持送药</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{p.address}</span>
                    <span className="flex items-center gap-1"><Navigation className="w-4 h-4" />{p.distance}</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-gray-400 mb-1">常备急救药品：</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.emergencyDrugs.map((d) => (
                        <span key={d} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href={`tel:${p.phone.replace(/-/g, "")}`} className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    <Phone className="w-5 h-5" /> 拨打电话
                  </a>
                  <button className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                    <Route className="w-5 h-5" /> 导航
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
