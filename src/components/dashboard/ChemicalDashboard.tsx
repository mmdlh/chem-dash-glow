import { Link } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, Atom, BatteryCharging, Beaker, Box, CheckCircle2,
  Cpu, Droplets, Factory, FlaskConical, Gauge, Leaf, Settings, ShieldCheck,
  Thermometer, Wrench, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend,
  Line, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import plantBackground from "@/assets/chemical-plant-bg.jpg";

type PageKey = "overview" | "production" | "safety" | "energy" | "quality" | "maintenance";
type Tone = "cyan" | "green" | "amber" | "violet";

const navItems: { key: PageKey; label: string; to: "/" | "/production" | "/safety" | "/energy" | "/quality" | "/maintenance"; icon: LucideIcon }[] = [
  { key: "overview", label: "智慧总览", to: "/", icon: Atom },
  { key: "production", label: "生产监控", to: "/production", icon: Factory },
  { key: "safety", label: "安全环保", to: "/safety", icon: ShieldCheck },
  { key: "energy", label: "能源管理", to: "/energy", icon: Zap },
  { key: "quality", label: "质量分析", to: "/quality", icon: FlaskConical },
  { key: "maintenance", label: "设备运维", to: "/maintenance", icon: Wrench },
];

const trend = [
  { t: "08:00", output: 72, load: 68, target: 78 }, { t: "10:00", output: 78, load: 74, target: 78 },
  { t: "12:00", output: 83, load: 79, target: 78 }, { t: "14:00", output: 86, load: 82, target: 78 },
  { t: "16:00", output: 81, load: 76, target: 78 }, { t: "18:00", output: 89, load: 84, target: 78 },
  { t: "20:00", output: 93, load: 88, target: 78 },
];
const months = [
  { n: "4月", a: 82, b: 70 }, { n: "5月", a: 88, b: 76 }, { n: "6月", a: 84, b: 82 },
  { n: "7月", a: 94, b: 85 }, { n: "8月", a: 91, b: 88 }, { n: "9月", a: 97, b: 90 },
];
const radar = [
  { s: "稳定性", v: 92 }, { s: "安全性", v: 86 }, { s: "经济性", v: 78 },
  { s: "环保性", v: 89 }, { s: "先进性", v: 84 }, { s: "可控性", v: 94 },
];
const pie = [
  { name: "乙烯", value: 38 }, { name: "芳烃", value: 26 }, { name: "聚烯烃", value: 22 }, { name: "精细化工", value: 14 },
];
const COLORS = ["var(--chart-cyan)", "var(--chart-green)", "var(--chart-amber)", "var(--chart-violet)"];

const pageMeta: Record<PageKey, { eyebrow: string; title: string; subtitle: string }> = {
  overview: { eyebrow: "SMART CHEMICAL COMMAND", title: "全域生产态势", subtitle: "多装置协同 · 实时计算 · 风险联防" },
  production: { eyebrow: "PRODUCTION DIGITAL TWIN", title: "生产运行监控", subtitle: "从原料进厂到产品出库的全流程感知" },
  safety: { eyebrow: "HSE INTELLIGENCE", title: "安全环保驾驶舱", subtitle: "风险分级管控与排放实时监测" },
  energy: { eyebrow: "ENERGY OPTIMIZATION", title: "能源精益管理", subtitle: "水、电、汽、气全介质能效优化" },
  quality: { eyebrow: "QUALITY INSIGHT", title: "质量智能分析", subtitle: "批次追溯与关键质量指标洞察" },
  maintenance: { eyebrow: "PREDICTIVE MAINTENANCE", title: "设备预测性运维", subtitle: "设备健康评估与智能检修决策" },
};

function Metric({ icon: Icon, label, value, unit, delta, tone = "cyan" }: { icon: LucideIcon; label: string; value: string; unit: string; delta: string; tone?: Tone }) {
  return <div className={`glass metric-card tone-${tone}`}>
    <div className="metric-head"><span className="metric-icon"><Icon size={18} /></span><span>{label}</span><span className="live-dot" /></div>
    <div className="metric-value">{value}<small>{unit}</small></div>
    <div className="metric-delta">{delta}</div>
  </div>;
}
function Panel({ title, tag, className = "", children }: { title: string; tag?: string; className?: string; children: React.ReactNode }) {
  return <section className={`glass panel ${className}`}><header className="panel-head"><div><span className="panel-mark" />{title}</div>{tag && <span className="panel-tag">{tag}</span>}</header><div className="panel-body">{children}</div></section>;
}
function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="chart-tip"><b>{label}</b>{payload.map((p, i) => <span key={`${p.name}-${i}`} style={{ color: p.color }}>{p.name}: {p.value}</span>)}</div>;
}
const axis = { fill: "var(--muted-foreground)", fontSize: 11 };
function TrendChart({ composed = false }: { composed?: boolean }) {
  const shared = <><CartesianGrid stroke="var(--grid-line)" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="t" tick={axis} axisLine={false} tickLine={false}/><YAxis tick={axis} axisLine={false} tickLine={false}/><Tooltip content={<ChartTip />}/><Legend verticalAlign="top" align="right" height={28} iconType="circle" wrapperStyle={{ top: 4, fontSize: 11 }}/></>;
  if (composed) return <ResponsiveContainer width="100%" height="100%"><ComposedChart data={trend} margin={{ top: 34, right: 12, left: -22, bottom: 0 }}>{shared}<Bar isAnimationActive={false} dataKey="output" name="产量" fill="var(--chart-green)" radius={[3,3,0,0]} barSize={18}/><Line isAnimationActive={false} dataKey="load" name="负荷" stroke="var(--chart-cyan)" strokeWidth={3} dot={false}/></ComposedChart></ResponsiveContainer>;
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{ top: 34, right: 12, left: -22, bottom: 0 }}><defs><linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-cyan)" stopOpacity={0.55}/><stop offset="100%" stopColor="var(--chart-cyan)" stopOpacity={0}/></linearGradient></defs>{shared}<Area isAnimationActive={false} type="monotone" dataKey="output" name="实时产能" stroke="var(--chart-cyan)" strokeWidth={3} fill="url(#areaCyan)"/><Line isAnimationActive={false} type="monotone" dataKey="target" name="目标线" stroke="var(--chart-amber)" strokeDasharray="5 5" dot={false}/></AreaChart></ResponsiveContainer>;
}
function Bars() { return <ResponsiveContainer width="100%" height="100%"><BarChart data={months} margin={{ top: 34, right: 8, left: -24 }}><CartesianGrid stroke="var(--grid-line)" vertical={false}/><XAxis dataKey="n" tick={axis} axisLine={false}/><YAxis tick={axis} axisLine={false}/><Tooltip content={<ChartTip />}/><Legend verticalAlign="top" align="right" wrapperStyle={{ top: 4, fontSize: 11 }}/><Bar dataKey="a" name="计划" fill="var(--chart-blue)" radius={[4,4,0,0]}/><Bar dataKey="b" name="实际" fill="var(--chart-green)" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer> }
function RadarView() { return <ResponsiveContainer width="100%" height="100%"><RadarChart data={radar} margin={{ top: 18, right: 35, bottom: 10, left: 35 }}><PolarGrid stroke="var(--grid-line)"/><PolarAngleAxis dataKey="s" tick={{...axis, fontSize: 10}}/><Radar dataKey="v" stroke="var(--chart-cyan)" fill="var(--chart-cyan)" fillOpacity={0.32}/></RadarChart></ResponsiveContainer> }
function Donut({ center = "96.8%" }: { center?: string }) { return <div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pie} innerRadius="58%" outerRadius="78%" paddingAngle={4} dataKey="value" stroke="none">{pie.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip content={<ChartTip />}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{center}</strong><span>综合指数</span></div></div> }
function StatusList({ kind = "device" }: { kind?: "device" | "alarm" | "quality" }) {
  const data = kind === "alarm" ? [["罐区 VOC 浓度偏高","处理中","warn"],["裂解炉温差波动","已确认","ok"],["循环水压差预警","待核查","warn"],["1#泵振动恢复","已关闭","ok"]] : kind === "quality" ? [["Q240922-17","优等品","ok"],["Q240922-16","优等品","ok"],["Q240922-15","复检中","warn"],["Q240922-14","合格品","ok"]] : [["乙烯裂解装置","运行","ok"],["芳烃联合装置","运行","ok"],["聚合反应单元","关注","warn"],["公用工程系统","运行","ok"]];
  return <div className="status-list">{data.map((d,i)=><div className="status-row" key={i}><span className={`status-dot ${d[2]}`}/><b>{d[0]}</b><span className={`status-pill ${d[2]}`}>{d[1]}</span></div>)}</div>
}
function DataTable({ type = "process" }: { type?: "process" | "energy" | "quality" | "work" }) {
  const rows = type === "energy" ? [["乙烯装置","蒸汽","42.8 t/h","-3.2%","正常"],["芳烃装置","电力","18.6 MW","+1.4%","关注"],["聚合装置","氮气","9.2 km³/h","-5.8%","优秀"],["公用工程","循环水","2,840 t/h","+0.6%","正常"]] : type === "quality" ? [["聚乙烯 PE-110","熔融指数","0.92","0.8–1.1","合格"],["乙二醇 EG-01","纯度","99.93%","≥99.9%","优"],["苯乙烯 SM-A","色度","4 Hazen","≤10","优"],["聚丙烯 PP-08","灰分","0.018%","≤0.03%","合格"]] : type === "work" ? [["WO-240917","循环泵 P-302","轴承温升","二级","进行中"],["WO-240914","压缩机 C-101","振动校准","一级","待验收"],["WO-240908","反应釜 R-207","密封检查","三级","已完成"],["WO-240905","换热器 E-116","效率下降","二级","已排程"]] : [["A-101","乙烯裂解炉","92.6%","815℃","稳定"],["B-204","芳烃精馏塔","87.3%","3.2MPa","稳定"],["C-302","聚合反应釜","78.9%","126℃","关注"],["D-108","加氢反应器","84.5%","8.6MPa","稳定"]];
  return <div className="table-scroll"><table><thead><tr>{["单元 / 批次","监测对象","当前值","目标 / 级别","状态"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{j===4?<span className={v.includes("关注")||v.includes("进行")?"text-amber":"text-green"}>{v}</span>:v}</td>)}</tr>)}</tbody></table></div>
}
function Header({ page }: { page: PageKey }) {
  return <header className="topbar"><nav className="nav-side nav-left">{navItems.slice(0,3).map(item=><NavItem key={item.key} item={item} page={page}/>)}</nav><div className="brand"><Atom size={25}/><div><strong>智化云擎</strong><span>CHEMICAL INTELLIGENCE</span></div></div><nav className="nav-side nav-right">{navItems.slice(3).map(item=><NavItem key={item.key} item={item} page={page}/>)}</nav></header>
}
function NavItem({ item, page }: { item: typeof navItems[number]; page: PageKey }) { const Icon=item.icon; return <Link to={item.to} className={`nav-item ${page===item.key?"active":""}`}><Icon size={18}/><span>{item.label}</span></Link> }
function PageHeading({ page }: { page: PageKey }) { const m=pageMeta[page]; return <div className="page-heading"><div><span className="eyebrow">{m.eyebrow}</span><h1>{m.title}</h1><p>{m.subtitle}</p></div><div className="system-state"><span className="live-dot"/><div><b>系统运行正常</b><small>数据刷新 3 秒前</small></div></div></div> }

function Overview() { return <><div className="metrics-grid"><Metric icon={Gauge} label="综合生产负荷" value="88.6" unit="%" delta="↑ 3.8% 较昨日"/><Metric icon={Box} label="今日总产量" value="12,846" unit="t" delta="达成率 96.2%" tone="green"/><Metric icon={Zap} label="综合能耗" value="0.684" unit="tce/t" delta="↓ 4.1% 同比" tone="amber"/><Metric icon={ShieldCheck} label="安全运行" value="286" unit="天" delta="连续无重大事故" tone="violet"/></div><div className="overview-grid"><Panel title="全厂产能实时趋势" tag="LIVE" className="span-2 chart-tall"><TrendChart/></Panel><Panel title="产品结构占比"><Donut center="12.8 kt"/></Panel><Panel title="装置综合能力"><RadarView/></Panel><Panel title="月度计划达成" className="span-2"><Bars/></Panel><Panel title="实时生产状态"><StatusList/></Panel><Panel title="重点装置运行参数" className="span-3"><DataTable/></Panel></div></> }
function Production() { return <><div className="metrics-grid compact"><Metric icon={Factory} label="运行装置" value="18" unit="/20" delta="2 套计划检修"/><Metric icon={Activity} label="瞬时产量" value="642" unit="t/h" delta="↑ 5.2%" tone="green"/><Metric icon={Thermometer} label="平均负荷" value="86.4" unit="%" delta="最优区间" tone="amber"/><Metric icon={CheckCircle2} label="计划达成" value="96.2" unit="%" delta="超时序 1.8%" tone="violet"/></div><div className="production-grid"><Panel title="工艺流程数字孪生" className="span-2 process-panel"><ProcessFlow/></Panel><Panel title="装置运行状态"><StatusList/></Panel><Panel title="班次产量与负荷" className="span-2 chart-tall"><TrendChart composed/></Panel><Panel title="关键工艺能力"><RadarView/></Panel><Panel title="六个月产能对比"><Bars/></Panel><Panel title="实时参数清单" className="span-2"><DataTable/></Panel></div></> }
function ProcessFlow(){ return <div className="process-flow">{[[Droplets,"原料罐区","98.2%"],[Thermometer,"预热裂解","815℃"],[Atom,"反应分离","3.2MPa"],[Box,"精制成品","642t/h"]].map(([I,n,v],i)=>{const Icon=I as LucideIcon; return <div className="flow-wrap" key={n as string}><div className="flow-node"><Icon size={24}/><b>{n as string}</b><strong>{v as string}</strong></div>{i<3&&<div className="flow-line"><i/></div>}</div>})}</div> }
function Safety() { return <><div className="safety-hero"><div className="score-ring"><strong>92</strong><span>安全态势</span><small>优秀</small></div><div className="safety-metrics"><Metric icon={ShieldCheck} label="重大风险" value="0" unit="项" delta="风险受控" tone="green"/><Metric icon={AlertTriangle} label="今日告警" value="7" unit="条" delta="5 条已闭环" tone="amber"/><Metric icon={Leaf} label="环保达标" value="99.8" unit="%" delta="排放稳定"/><Metric icon={Activity} label="隐患闭环" value="96.5" unit="%" delta="本月 +2.1%" tone="violet"/></div></div><div className="safety-grid"><Panel title="风险维度评估"><RadarView/></Panel><Panel title="告警趋势与级别" className="span-2 chart-tall"><TrendChart composed/></Panel><Panel title="实时告警处置"><StatusList kind="alarm"/></Panel><Panel title="排放监测"><EmissionBars/></Panel><Panel title="风险区域分布"><Donut center="低风险"/></Panel></div></> }
function EmissionBars(){return <div className="emissions">{[["VOC","18.2","50"],["COD","26.8","60"],["SO₂","9.6","35"],["NOₓ","31.4","80"]].map((d,i)=><div key={d[0]}><span>{d[0]}</span><div><i style={{width:`${Number(d[1])/Number(d[2])*100}%`}}/></div><b>{d[1]}<small> / {d[2]}</small></b></div>)}</div>}
function Energy() { return <><div className="energy-strip"><Metric icon={Zap} label="今日综合能耗" value="8,792" unit="tce" delta="预算内 3.6%"/><Metric icon={BatteryCharging} label="能源成本" value="426.8" unit="万元" delta="↓ 2.7%" tone="green"/><Metric icon={Leaf} label="碳排放强度" value="0.82" unit="t/t" delta="优于基准" tone="amber"/></div><div className="energy-grid"><Panel title="能源介质流向" className="energy-flow"><EnergyFlow/></Panel><Panel title="单位能耗走势" className="span-2 chart-tall"><TrendChart/></Panel><Panel title="能源结构"><Donut center="8.79 ktce"/></Panel><Panel title="成本与预算"><Bars/></Panel><Panel title="节能项目进度"><ProjectProgress/></Panel><Panel title="重点单元用能排行" className="span-3"><DataTable type="energy"/></Panel></div></> }
function EnergyFlow(){return <div className="energy-map"><div className="energy-core"><Zap/><b>能源中心</b><strong>8,792</strong></div>{[["电力","34%"],["蒸汽","29%"],["燃气","23%"],["循环水","14%"]].map((x,i)=><div className={`energy-node en-${i}`} key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div>}
function ProjectProgress(){return <div className="progress-list">{[["裂解炉燃烧优化",86],["蒸汽梯级利用",72],["循环水泵群控",64],["余热回收改造",48]].map(([n,v])=><div key={n as string}><span><b>{n}</b><em>{v}%</em></span><div><i style={{width:`${v}%`}}/></div></div>)}</div>}
function Quality() { return <><div className="quality-top"><Panel title="今日批次质量" className="quality-score"><div className="big-quality"><strong>99.37%</strong><span>一次合格率</span><small>128 批次 / 127 合格</small></div></Panel><div className="metrics-2x2"><Metric icon={Beaker} label="检测样品" value="386" unit="个" delta="已完成 92%"/><Metric icon={CheckCircle2} label="优等品率" value="91.8" unit="%" delta="↑ 1.6%" tone="green"/><Metric icon={AlertTriangle} label="待复检" value="3" unit="批" delta="均已锁定" tone="amber"/><Metric icon={FlaskConical} label="实验室负载" value="76" unit="%" delta="运行平稳" tone="violet"/></div></div><div className="quality-grid"><Panel title="质量指标能力"><RadarView/></Panel><Panel title="合格率趋势" className="span-2 chart-tall"><TrendChart/></Panel><Panel title="最近批次状态"><StatusList kind="quality"/></Panel><Panel title="缺陷类型分布"><Donut center="3 批"/></Panel><Panel title="产品质量检验明细" className="span-3"><DataTable type="quality"/></Panel></div></> }
function Maintenance() { return <><div className="maintenance-layout"><aside className="health-rail glass"><span>全厂设备健康度</span><strong>91.6</strong><small>较上月 +2.4</small>{[["A 级健康",482,"green"],["B 级关注",36,"cyan"],["C 级预警",8,"amber"],["D 级风险",1,"violet"]].map(x=><div className={`health-item tone-${x[2]}`} key={x[0] as string}><b>{x[1]}</b><span>{x[0]}</span></div>)}</aside><main className="maintenance-main"><div className="metrics-grid compact"><Metric icon={Cpu} label="在线设备" value="527" unit="台" delta="在线率 99.4%"/><Metric icon={Activity} label="预测预警" value="8" unit="项" delta="3 项高优先" tone="amber"/><Metric icon={Wrench} label="今日工单" value="24" unit="张" delta="完成 17 张" tone="green"/></div><div className="maintenance-grid"><Panel title="设备健康趋势" className="span-2 chart-tall"><TrendChart/></Panel><Panel title="故障类型分布"><Donut center="23 起"/></Panel><Panel title="维护计划达成"><Bars/></Panel><Panel title="工单执行清单" className="span-2"><DataTable type="work"/></Panel></div></main></div></> }

export function ChemicalDashboard({ page }: { page: PageKey }) {
  return <div className="app-shell"><img src={plantBackground} alt="夜间智慧化工园区" className="app-background" width={1920} height={1080}/><div className="atmosphere"/><Header page={page}/><main className="dashboard"><PageHeading page={page}/>{page==="overview"?<Overview/>:page==="production"?<Production/>:page==="safety"?<Safety/>:page==="energy"?<Energy/>:page==="quality"?<Quality/>:<Maintenance/>}</main><footer><span>CHEM-OS 4.8</span><span>数据接入 1,286 点位 · 实时率 99.98%</span><span>© 2026 智化云擎</span></footer></div>
}
