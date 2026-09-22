import { useEffect, useRef, useState } from "react";
import "../App.css";
import "../bc-brand.css";

/* ---------------- 多语言 ---------------- */

type Lang = "cn" | "en";
type L = { cn: string; en: string };

const COPY: Record<string, L> = {
  cta: { cn: "商务合作", en: "Work With Us" },
  heroKicker: {
    cn: "艺人商务综合机构 · 成立于 2020",
    en: "FULL-SERVICE ARTIST COMMERCE AGENCY · EST. 2020",
  },
  heroLead: {
    cn: "嵊耀皓博 BrillianceCast Media 成立于 2020 年，是一家专注于艺人商务的综合型服务机构。我们以国际视野结合本土深耕经验，致力于为全球品牌提供精准、高效、风险可控的明星代言人提案——将品牌战略需求与艺人资源进行深度匹配与系统整合，提供端到端的整合服务，确保每一次合作都清晰、有序，并最终转化为品牌资产。",
    en: "Founded in 2020, BrillianceCast Media is a full-service agency specializing in artist commerce. Combining a global perspective with deep local execution, we deliver precise, efficient and risk-managed celebrity endorsement solutions for brands worldwide — matching brand strategy with the right artist resources, end to end, and turning every collaboration into lasting brand equity.",
  },
  heroCta1: { cn: "查看商务案例", en: "View Cases" },
  heroCta2: { cn: "业务板块", en: "Our Business" },

  aboutHead: { cn: "我们是谁", en: "ABOUT" },
  aboutText: {
    cn: "嵊耀皓博 BrillianceCast Media 是一家专注于艺人商务与品牌整合营销的专业服务机构，前身为 BNMY STUDIO，业务覆盖艺人活动策划、时尚造型、广告创意与制作、演出经纪、活动及影视 Casting、品牌推广及公关策划。我们以品牌商业目标为核心，提供从代言人策略匹配、商务谈判，到全周期落地执行的完整解决方案。无论是品牌整合传播、剧集内容共创，还是大型活动管理，我们通过精准的资源协调与扎实的执行网络，确保每一次品牌曝光都清晰、可控、有效。",
    en: "BrillianceCast Media is a professional agency focused on artist commerce and integrated brand marketing. Evolved from BNMY STUDIO, our practice spans artist event planning, fashion styling, advertising creative & production, performance management, casting for events and film/TV, brand promotion and public relations strategy. With brand objectives at the core, we provide complete solutions — from ambassador strategy and business negotiation to full-cycle execution. Whether integrated brand campaigns, drama content co-creation or large-scale event management, our precise resource coordination and proven execution network keep every brand exposure clear, controlled and effective.",
  },
  mission: {
    cn: "创意驱动品牌价值，专业塑造行业影响力。",
    en: "Creativity drives brand value. Professionalism shapes industry influence.",
  },

  businessHead: { cn: "业务板块", en: "WHAT WE DO" },
  divALabel: { cn: "板块 A", en: "DIVISION A" },
  divATitle: { cn: "艺人商务与整合营销", en: "Artist Commerce & Integrated Marketing" },
  divADesc: {
    cn: "围绕品牌商业目标，提供从艺人策略匹配、商务合作统筹到全周期整合营销的服务。通过精准的资源筛选与系统化的执行管理，确保每一次合作清晰、可控、有效。",
    en: "Aligned with brand business goals: from artist strategy matching and partnership coordination to full-cycle integrated marketing. Precise resource screening and systematic execution management keep every collaboration clear, controlled and effective.",
  },
  divBLabel: { cn: "板块 B", en: "DIVISION B" },
  divBTitle: { cn: "时尚造型与视觉制作", en: "Fashion Styling & Visual Production" },
  divBDesc: {
    cn: "前身为 BNMY STUDIO，由两位业内资深人士创立，为艺人、品牌与媒体提供专业的造型统筹与视觉内容制作，覆盖 TVC、剧集、综艺、杂志、活动与机场等全场景。",
    en: "Evolved from BNMY STUDIO, founded by two seasoned industry professionals, providing styling coordination and visual content production for artists, brands and media — across TVC, drama series, variety shows, magazines, events and airport styling.",
  },
  serviceHead: { cn: "服务体系", en: "SERVICE SYSTEM" },

  casesHead: { cn: "商务案例", en: "COMMERCIAL CASES" },
  casesRight: { cn: "艺人合作 · 活动 · 内容制作", en: "Endorsements · Events · Content" },
  moreTitle: { cn: "更多艺人代言合作（部分）", en: "MORE ARTIST ENDORSEMENTS (SELECTED)" },
  socialTitle: { cn: "社媒运营与粉丝营销（节选）", en: "SOCIAL & FAN MARKETING (SELECTED)" },
  moreNote: {
    cn: "以上案例仅为部分节选。如品牌有明确合作方向或项目需求，可提供更具针对性的案例与执行说明。",
    en: "The above is a selection only. For specific collaboration directions or project needs, tailored cases and execution details are available on request.",
  },
  statsHead: { cn: "数据亮点", en: "PROVEN RESULTS" },

  stylingHead: { cn: "时尚造型与视觉制作", en: "STYLING" },
  stylingRight: { cn: "前身为 BNMY STUDIO", en: "FORMERLY BNMY STUDIO" },

  brandsHead: { cn: "长期服务的品牌集团与合作对象", en: "PARTNERS" },
  brandsNote: {
    cn: "在不同项目阶段，与多家国际及本土头部美妆、个护及消费品牌保持持续合作。",
    en: "We maintain ongoing partnerships with leading international and local beauty, personal-care and consumer brands across project phases.",
  },

  artistsHead: { cn: "艺人资源节选", en: "ARTIST NETWORK" },
  artistsRight: { cn: "持续更新中", en: "Continuously updated" },

  pipeTitle: { cn: "环大陆剧集商务全案及商务执行（筹备中）", en: "Pan-regional drama business development & execution (in preparation)" },
  pipeBody: {
    cn: "：吾岸、双程、咎由自取、我磕了我对家和我的 CP、日落大道 等全新热门 IP。",
    en: ": 吾岸, 双程, 咎由自取, 我磕了我对家和我的 CP, 日落大道, and other new hit IPs.",
  },
  pipeMore: {
    cn: "内娱剧集 / 艺人商务代言及商务执行，持续更新中。如需更具体案例，可进一步沟通。",
    en: "Mainland drama and artist endorsement partnerships — continuously updated. Further details available on request.",
  },

  contactHead: { cn: "联系我们", en: "CONTACT" },
  contactLead: {
    cn: "我们希望以稳定、专业的整合能力，与合作伙伴建立长期、可持续的合作关系。",
    en: "We aim to build long-term, sustainable partnerships through reliable, professional and fully integrated capabilities.",
  },
  contactMailNote: { cn: "商务洽谈及合作请注明来意", en: "For business inquiries, please state your purpose" },
  contactAddr: {
    cn: "地址：北京市东城区和平里东街 22 号 1-A10",
    en: "Address: 1-A10, No. 22 Hepingli East Street, Dongcheng District, Beijing",
  },
  contactHours: {
    cn: "工作时间：周一至周六 10:00 — 20:00",
    en: "Working Hours: Mon – Sat, 10:00 – 20:00 (GMT+8)",
  },
  contactSite: { cn: "官网：brilliancecast.vercel.app", en: "Website: brilliancecast.vercel.app" },
  qrRed: { cn: "小红书 App 扫码关注：BrillianceCast Media 北京", en: "Scan with RED App: BrillianceCast Media Beijing" },
  qrWeibo: { cn: "微博扫码关注：@BrillianceCast_Media", en: "Scan via Weibo: @BrillianceCast_Media" },
};

/* ---------------- 数据 ---------------- */

const DIV_A_ITEMS: (L & { act: string })[] = [
  { cn: "艺人 / 剧集商务", en: "Artist & Drama Partnerships", act: "cases:endorse" },
  { cn: "内容共创与整合营销", en: "Content Co-creation & Integrated Marketing", act: "cases:social" },
  { cn: "媒介传播与平台协同", en: "Media Distribution & Platform Synergy", act: "service:3" },
  { cn: "大型活动策划与执行", en: "Event Planning & Execution", act: "cases:event" },
];

const DIV_B_ITEMS: (L & { act: string })[] = [
  { cn: "TVC 广告造型", en: "TVC & Commercial Styling", act: "styling:0" },
  { cn: "电视剧造型及统筹", en: "TV Drama Styling & Coordination", act: "styling:1" },
  { cn: "综艺造型", en: "Variety Show Styling", act: "styling:2" },
  { cn: "杂志造型及统筹", en: "Magazine Editorial Styling", act: "styling:3" },
  { cn: "艺人造型", en: "Celebrity Styling", act: "styling:4" },
  { cn: "活动 · 机场及品牌露出合作", en: "Event, Airport & PR Seeding", act: "styling:5" },
];

const SERVICES = [
  {
    part: "PART 01",
    title: { cn: "艺人商务与整合营销", en: "Artist Commerce & Integrated Marketing" },
    desc: {
      cn: "围绕品牌商业目标，提供从艺人策略匹配、商务合作统筹到全周期整合营销服务。通过精准的资源筛选与系统化的执行管理，确保每一次代言合作都清晰、可控、有效。",
      en: "Aligned with brand business goals, we provide full-cycle integrated marketing — from artist strategy matching and partnership coordination to campaign execution. Precise resource screening and systematic management keep every endorsement clear, controlled and effective.",
    },
    steps: [
      { cn: "艺人策略匹配", en: "Artist Strategy Matching" },
      { cn: "商务统筹与签约", en: "Business Coordination & Signing" },
      { cn: "整合营销传播", en: "Integrated Marketing Communications" },
      { cn: "内容共创与制作", en: "Content Co-creation & Production" },
    ],
  },
  {
    part: "PART 02",
    title: { cn: "内容共创与视觉执行", en: "Content Co-creation & Visual Execution" },
    desc: {
      cn: "围绕品牌与艺人的合作项目，提供从内容策划、创意制作到媒介分发、粉丝运营的全链路传播支持。通过精准的内容设计与高效的平台协同，确保每一次代言合作在传播中实现最大化的声量与效果。",
      en: "For brand–artist collaborations, we support the full communication chain: content planning, creative production, media distribution and fan operations. Precise content design and efficient platform coordination maximize reach and impact for every campaign.",
    },
    steps: [
      { cn: "艺人妆造定制", en: "Artist Styling & Makeup" },
      { cn: "创意方向与视觉指导", en: "Creative Direction & Visual Guidance" },
      { cn: "摄影与视觉内容制作", en: "Photography & Visual Production" },
      { cn: "社媒运营与粉丝营销", en: "Social Media & Fan Marketing" },
    ],
  },
  {
    part: "PART 03",
    title: { cn: "媒介传播与平台协同", en: "Media Distribution & Platform Synergy" },
    desc: {
      cn: "依托长期合作的多类型媒体资源，根据项目目标与内容属性制定灵活的媒介传播组合策略，提升内容触达效率——把内容送到对的渠道。",
      en: "Built on long-standing media partnerships across channels, we tailor a flexible media mix to each project's goals and content — delivering content to the right channels.",
    },
    steps: [
      { cn: "社交媒体与 UGC 平台", en: "Social & UGC Platforms" },
      { cn: "电商与交易转化平台", en: "E-commerce & Conversion Platforms" },
      { cn: "流媒体出版与视频平台", en: "Streaming & Video Platforms" },
      { cn: "广播电视媒体与垂直媒体", en: "Broadcast TV & Vertical Media" },
      { cn: "X（Twitter）", en: "X (Twitter)" },
    ],
  },
];

const CASE_FILTERS = [
  { key: "all", label: { cn: "全部", en: "All" } },
  { key: "endorse", label: { cn: "艺人代言合作", en: "Endorsements" } },
  { key: "event", label: { cn: "活动与执行", en: "Events & Execution" } },
  { key: "social", label: { cn: "社媒运营与粉丝营销", en: "Social & Fan Marketing" } },
] as const;

type CaseFilterKey = (typeof CASE_FILTERS)[number]["key"];

const CASE_GROUPS: { brand: string; title: L; tag: L; cat: CaseFilterKey; imgs: string[]; covers?: string[] }[] = [
  {
    brand: "花西子 × 政瞳", cat: "endorse",
    title: { cn: "气色双生大使", en: "Dual Ambassadors" },
    tag: { cn: "官宣 · 线下活动 · 品牌战报", en: "Announcement · Event · Report" },
    imgs: ["/images/cases/florasis-1.png", "/images/cases/florasis-2.jpg", "/images/cases/florasis-3.jpg", "/images/cases/florasis-4.jpg", "/images/cases/florasis-5.jpg", "/images/cases/florasis-6.jpg"],
  },
  {
    brand: "安敏优 × 政瞳", cat: "endorse",
    title: { cn: "品牌心动大使", en: "Brand Ambassador" },
    tag: { cn: "官宣物料 · 品牌战报", en: "Announcement · Report" },
    imgs: ["/images/cases/armiyo-1.png", "/images/cases/armiyo-2.png", "/images/cases/armiyo-3.png", "/images/cases/armiyo-4.png", "/images/cases/armiyo-5.png"],
  },
  {
    brand: "水之蔻 × 政瞳", cat: "endorse",
    title: { cn: "品牌大使", en: "Brand Ambassador" },
    tag: { cn: "官宣 · 屈臣氏线下快闪店 · 战报", en: "Announcement · Watsons Pop-up · Report" },
    imgs: ["/images/cases/watercome-1.png", "/images/cases/watercome-2.png", "/images/cases/watercome-3.png", "/images/cases/watercome-4.png", "/images/cases/watercome-5.png", "/images/cases/watercome-6.png"],
  },
  {
    brand: "Sisley × 孙政", cat: "endorse",
    title: { cn: "品牌护肤大使", en: "Skincare Ambassador" },
    tag: { cn: "官宣物料 · 品牌战报", en: "Announcement · Report" },
    imgs: ["/images/cases/sisley-1.jpg", "/images/cases/sisley-2.jpg", "/images/cases/sisley-3.jpg", "/images/cases/sisley-4.jpg", "/images/cases/sisley-5.jpg"],
  },
  {
    brand: "毛戈平 × 邓佳鑫", cat: "endorse",
    title: { cn: "礼遇心动大使", en: "Brand Ambassador" },
    tag: { cn: "官宣物料 · 品牌战报", en: "Announcement · Report" },
    imgs: ["/images/cases/maogeping-1.jpg", "/images/cases/maogeping-2.jpg", "/images/cases/maogeping-3.jpg", "/images/cases/maogeping-4.png", "/images/cases/maogeping-5.png", "/images/cases/maogeping-7.jpg"],
  },
  {
    brand: "SMFK × A2O MAY", cat: "endorse",
    title: { cn: "品牌代言人", en: "Brand Ambassador" },
    tag: { cn: "官宣大片", en: "Announcement Campaign" },
    imgs: ["/images/cases/smfk-1.jpg", "/images/cases/smfk-2.jpg", "/images/cases/smfk-3.jpg", "/images/cases/smfk-4.jpg", "/images/cases/smfk-5.jpg", "/images/cases/smfk-6.jpg"],
  },
  {
    brand: "SMFK × 黄朔 / A2O MAY", cat: "event",
    title: { cn: "线下活动", en: "Offline Event" },
    tag: { cn: "品牌活动 · 艺人合作与内容共创执行", en: "Brand Event · Artist Collaboration" },
    covers: ["/images/cases/smfk-event-7.jpg", "/images/cases/smfk-event-5.jpg"],
    imgs: ["/images/cases/smfk-event-1.jpg", "/images/cases/smfk-event-2.jpg", "/images/cases/smfk-event-3.jpg", "/images/cases/smfk-event-4.png", "/images/cases/smfk-event-5.jpg", "/images/cases/smfk-event-6.jpg", "/images/cases/smfk-event-7.jpg", "/images/cases/smfk-event-8.jpg"],
  },
  {
    brand: "北京国际电影节 × 邓佳鑫", cat: "event",
    title: { cn: "水上红毯 · 颁奖嘉宾", en: "Red Carpet · Award Presenter" },
    tag: { cn: "第十六届", en: "16th BJIFF" },
    imgs: ["/images/cases/bjiff-1.jpg", "/images/cases/bjiff-2.png", "/images/cases/bjiff-3.png", "/images/cases/bjiff-4.png", "/images/cases/bjiff-5.png"],
  },
  {
    brand: "Gentle Monster", cat: "event",
    title: { cn: "艺人统筹与线下项目执行", en: "Artist Coordination & Offline Execution" },
    tag: { cn: "空间体验项目", en: "Spatial Experience Project" },
    imgs: ["/images/cases/gentlemonster-1.jpg", "/images/cases/gentlemonster-2.jpg", "/images/cases/gentlemonster-3.jpg", "/images/cases/gentlemonster-4.jpg", "/images/cases/gentlemonster-5.jpg", "/images/cases/gentlemonster-6.jpg", "/images/cases/gentlemonster-7.jpg"],
  },
];

const MORE_ENDORSEMENTS: { img: string; brand: string; role: L; artists: L }[] = [
  { img: "/images/more/watercome.jpg", brand: "水之蔻 Watercome", role: { cn: "品牌大使", en: "Brand Ambassador" }, artists: { cn: "孙政 × 吕思瞳", en: "Sun Zheng × Lyu Sitong" } },
  { img: "/images/more/louboutin.jpg", brand: "Christian Louboutin 路铂廷美妆", role: { cn: "品牌挚友", en: "Brand Friend" }, artists: { cn: "孙政", en: "Sun Zheng" } },
  { img: "/images/more/amorepacific.jpg", brand: "爱茉莉太平洋", role: { cn: "京选大使", en: "JD Selection Ambassador" }, artists: { cn: "吕思瞳", en: "Lyu Sitong" } },
  { img: "/images/more/lan.jpg", brand: "LAN 兰", role: { cn: "面膜新生大使", en: "Mask Ambassador" }, artists: { cn: "吕思瞳", en: "Lyu Sitong" } },
  { img: "/images/more/afu.jpg", brand: "AFU 阿芙", role: { cn: "品牌面膜大使", en: "Mask Ambassador" }, artists: { cn: "法宣阁 × 贺嘉述", en: "Fa Xuange × He Jiashu" } },
  { img: "/images/more/funnyelves.jpg", brand: "FunnyElves 方里", role: { cn: "品牌挚友", en: "Brand Friend" }, artists: { cn: "法宣阁 × 贺嘉述", en: "Fa Xuange × He Jiashu" } },
  { img: "/images/more/florasis-yunqi.jpg", brand: "花西子 Florasis", role: { cn: "京选挚友", en: "JD Selection Friend" }, artists: { cn: "云旗", en: "Yunqi" } },
  { img: "/images/more/voolga.jpg", brand: "敷尔佳 Voolga", role: { cn: "品牌活力大使", en: "Vitality Ambassador" }, artists: { cn: "邓佳鑫", en: "Deng Jiaxin" } },
  { img: "/images/more/dermalogica.jpg", brand: "Dermalogica 德美乐嘉", role: { cn: "品牌挚友", en: "Brand Friend" }, artists: { cn: "陈建宇", en: "Chen Jianyu" } },
  { img: "/images/more/nivea.jpg", brand: "NIVEA 妮维雅", role: { cn: "品牌挚友", en: "Brand Friend" }, artists: { cn: "陈建宇", en: "Chen Jianyu" } },
  { img: "/images/more/armiyo-duo.png", brand: "安敏优 Armiyo", role: { cn: "品牌心动大使", en: "Brand Ambassador" }, artists: { cn: "孙政 × 吕思瞳", en: "Sun Zheng × Lyu Sitong" } },
  { img: "/images/more/dryu.jpg", brand: "玉泽 Dr.Yu", role: { cn: "青春大使", en: "Youth Ambassador" }, artists: { cn: "童禹坤", en: "Tong Yukun" } },
];

const SOCIAL_CASES: { imgs: string[]; brand: string; artists: L; note: L }[] = [
  {
    imgs: ["/images/social/qinjunjie-live.png", "/images/social/qinjunjie-comments.png"],
    brand: "秦俊杰 微博直播",
    artists: { cn: "社媒话题策划", en: "Social Topic Planning" },
    note: { cn: "微博文娱高位热搜在榜 4h+ · 直播互动量提升 132%", en: "Trending on Weibo 4h+ · Live engagement +132%" },
  },
  {
    imgs: ["/images/social/lingshi-zhoujielun.png"],
    brand: "零食很忙 × 周杰伦",
    artists: { cn: "品牌代言人", en: "Brand Ambassador" },
    note: { cn: "#周杰伦代言零食很忙# 话题阅读量 8700w+ · 讨论量 17w+", en: "Topic views 87M+ · 170K+ discussions" },
  },
  {
    imgs: ["/images/social/swisse-zhouye.png"],
    brand: "Swisse 斯维诗 × 周也",
    artists: { cn: "线下活动", en: "Offline Event" },
    note: { cn: "斯维诗 × 迪丽热巴、周也、蔡文静、陈昊宇等", en: "Swisse × Dilraba, Zhou Ye, Cai Wenjing, Chen Haoyu, etc." },
  },
  {
    imgs: ["/images/social/schwarzkopf-liyitong.png"],
    brand: "施华蔻 × 李一桐",
    artists: { cn: "美发代言人", en: "Haircare Ambassador" },
    note: { cn: "总体播放量提升 205% · 互动量提升 239%", en: "Total views +205% · Engagement +239%" },
  },
  {
    imgs: ["/images/social/swisse-dilireba.png"],
    brand: "Swisse 斯维诗 × 迪丽热巴",
    artists: { cn: "品牌营销物料", en: "Campaign Assets" },
    note: { cn: "社媒传播与粉丝营销", en: "Social & fan marketing" },
  },
];

const BRAND_GROUPS = [
  {
    cat: { cn: "彩妆", en: "Makeup" },
    brands: ["毛戈平", "完美日记", "彩棠", "曼秀雷敦", "花西子", "卡姿兰", "上美集团", "方里", "橘朵", "玛丽黛佳", "酵色", "PL 恋火", "柏瑞美", "RED CHAMBER", "BABI", "修可夫"],
  },
  {
    cat: { cn: "功效护肤", en: "Skincare" },
    brands: ["贝泰妮集团", "相宜本草", "可复美", "敷尔佳", "玉泽", "谷雨", "HBN", "溪木源", "林清轩", "雏菊的天空", "兰 LAN", "C 咖", "逐本"],
  },
  {
    cat: { cn: "个护", en: "Personal Care" },
    brands: ["Olaplex", "水之蔻", "半亩花田", "野兽派", "诗裴丝 Spēs", "KONO", "沙宣", "倍至", "参半", "云南白药", "舒客", "BOP", "飞利浦", "德佑", "洁柔", "清风"],
  },
  {
    cat: { cn: "服饰鞋履", en: "Fashion & Footwear" },
    brands: ["Champion", "Reebok", "Vans", "Columbia", "Under Armour", "Kappa", "Hunter", "Nautica", "SPYDER", "Ted Baker", "Forever 21", "Phenix", "Chuu", "海澜之家", "李宁", "安踏", "波司登", "We Flower"],
  },
];

const STYLING_GROUPS = [
  {
    cat: { cn: "TVC 广告造型", en: "TVC & Commercial Styling" },
    note: { cn: "完美日记「家是最美中国色」等", en: "Perfect Diary “Home Is the Most Beautiful Chinese Color”, etc." },
    imgs: ["/images/styling/tvc-perfectdiary-1.png", "/images/styling/tvc-perfectdiary-2.png", "/images/styling/tvc-3.png", "/images/styling/tvc-4.png", "/images/styling/tvc-5.png"],
  },
  {
    cat: { cn: "电视剧造型及统筹", en: "TV Drama Styling & Coordination" },
    note: { cn: "剧集项目整体造型统筹", en: "Full styling coordination for drama series" },
    imgs: ["/images/styling/tv-drama-1.png", "/images/styling/tv-drama-2.png", "/images/styling/tv-drama-3.png", "/images/styling/tv-drama-4.png"],
  },
  {
    cat: { cn: "综艺造型", en: "Variety Show Styling" },
    note: { cn: "综艺节目与舞台造型", en: "Styling for variety shows and stages" },
    imgs: ["/images/styling/variety-1.png", "/images/styling/variety-2.png", "/images/styling/variety-3.png", "/images/styling/variety-4.png"],
  },
  {
    cat: { cn: "杂志造型及统筹", en: "Magazine Editorial Styling" },
    note: { cn: "时尚刊物大片造型", en: "Editorial styling for fashion publications" },
    imgs: ["/images/styling/magazine-1.png", "/images/styling/magazine-2.png", "/images/styling/magazine-3.png", "/images/styling/magazine-4.png", "/images/styling/magazine-5.png"],
  },
  {
    cat: { cn: "艺人造型", en: "Celebrity Styling" },
    note: { cn: "艺人活动整体造型", en: "Full looks for artist appearances" },
    imgs: ["/images/styling/celebrity-1.jpg", "/images/styling/celebrity-2.jpg", "/images/styling/celebrity-3.jpg", "/images/styling/celebrity-4.jpg", "/images/styling/celebrity-5.jpg"],
  },
  {
    cat: { cn: "活动 · 机场及品牌露出合作", en: "Event, Airport & PR Seeding" },
    note: { cn: "艺人活动 · 机场造型 · PR 露出合作", en: "Artist event & airport styling · PR collaborations" },
    imgs: ["/images/styling/airport-1.jpg", "/images/styling/airport-2.jpg", "/images/styling/airport-3.jpg", "/images/styling/airport-4.jpg", "/images/styling/airport-5.jpg", "/images/styling/pr-suruiqi.png", "/images/styling/pr-event-1.jpg", "/images/styling/pr-event-2.jpg"],
  },
];

const AGENCIES = [
  ["时代峰峻", "时代少年团、音乐厂牌 TFING、张峻豪、四代"],
  ["乐华娱乐", "王一博、黄明昊、毕雯珺、程潇、奥利"],
  ["哇唧唧哇", "肖战、毛不易"],
  ["嘉行传媒", "迪丽热巴、周柯宇"],
  ["悦凯娱乐", "杨洋、孟子义、宋茜"],
  ["和颂传媒", "李冰冰、周也、侯明昊、娜扎"],
  ["萌样", "王鹤棣"],
  ["唐人影视", "胡歌、李兰迪、林一"],
  ["东申未来", "舒淇、陈坤、张婧仪"],
  ["壹心娱乐", "李现、马思纯"],
  ["欢娱影视", "王星越、许凯、白鹿"],
  ["超级向上", "曾舜晞、丞磊"],
  ["浩瀚星缘", "田曦薇、何与"],
  ["众星时代", "张凌赫、李一桐、卢昱晓"],
  ["光线传媒", "丁禹兮、孙千、章若楠、任敏"],
  ["米未传媒", "黄渤、贾冰、大张伟"],
  ["天娱传媒", "张新成"],
  ["行星文化", "张杰、杨和苏"],
  ["大象音乐", "汪苏泷"],
  ["百沐音乐", "单依纯"],
  ["梦响强音", "希林娜依·高"],
  ["工夫真言", "沈月"],
  ["天浩盛世", "姚安娜、陈飞宇"],
  ["华策影视", "田栩宁、吴倩"],
  ["丝芭传媒", "袁一琦、许杨玉琢、段艺璇"],
  ["A2O", "A2O MAY、男团（待出道）"],
  ["耀客传媒", "代露娃、张萌、颜安"],
  ["白米范", "刘逸云、tablo、欧阳靖、庆怜、余景天"],
  ["嘉尚传媒", "敖瑞鹏、陈鹤一"],
  ["水滴经纪", "邱天、蒋奇明"],
  ["留白影视", "阎必果"],
  ["兆森传媒", "许栋铭、王鼎、李雨真"],
  ["和光传媒", "云旗、郝熠然"],
  ["泽栩传媒", "孙政、吕思瞳、法宣阁、贺嘉述、妙静欧"],
  ["瑞鹤娱乐", "梓渝"],
  ["韩国活动艺人", "BTS、AESPA、SEVENTEEN、CORTIS、ZB1、WayV、KISS OF LIFE、RESCENE、朴宰范、李栋旭、李俊昊、宁艺卓、韩振、沈小婷、邵子恒、宋雨琦"],
];

/* ---------------- 视图与组件 ---------------- */

type View = "home" | "about" | "business" | "cases" | "styling" | "brands" | "artists" | "contact";

const VIEWS: { key: Exclude<View, "home">; label: L }[] = [
  { key: "about", label: { cn: "我们是谁", en: "About" } },
  { key: "business", label: { cn: "业务板块", en: "Business" } },
  { key: "cases", label: { cn: "商务案例", en: "Cases" } },
  { key: "styling", label: { cn: "造型作品", en: "Styling" } },
  { key: "brands", label: { cn: "合作品牌", en: "Brands" } },
  { key: "artists", label: { cn: "艺人资源", en: "Artists" } },
  { key: "contact", label: { cn: "联系我们", en: "Contact" } },
];

function Label({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <div className="mb-12 lg:mb-16">
      <h2 className={`font-display text-4xl md:text-5xl text-white tracking-wide ${center ? "text-center" : ""}`}>{text}</h2>
      <div className="mt-7 h-px bg-white/10" />
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("cn");
  const [view, setView] = useState<View>("home");
  const [caseFilter, setCaseFilter] = useState<CaseFilterKey>("all");
  const [openCase, setOpenCase] = useState<string | null>(null);
  const [stylingCat, setStylingCat] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; title: string; sub: string } | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const t = (p: L) => p[lang];

  // 站内联动：cases:X → 案例页并筛选；styling:N → 造型页对应类别；service:N → 业务页对应条目
  const go = (act: string) => {
    const [kind, val] = act.split(":");
    if (kind === "cases") {
      setCaseFilter(val as CaseFilterKey);
      setView("cases");
    } else if (kind === "styling") {
      setStylingCat(Number(val));
      setView("styling");
    } else if (kind === "service") {
      setView("about");
      setTimeout(() => document.querySelector(`#service-${val}`)?.scrollIntoView({ behavior: "smooth" }), 80);
    }
    mainRef.current?.scrollTo({ top: 0 });
  };

  const switchView = (v: View) => {
    setView(v);
    setOpenCase(null);
    mainRef.current?.scrollTo({ top: 0 });
  };

  const openCaseData = CASE_GROUPS.find((c) => c.brand === openCase) ?? null;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const langToggle = (
    <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em]">
      <button
        onClick={() => setLang("cn")}
        className={`transition-colors duration-300 cursor-pointer ${lang === "cn" ? "text-white" : "text-white/35 hover:text-white/70"}`}
      >
        中
      </button>
      <span className="text-white/20">/</span>
      <button
        onClick={() => setLang("en")}
        className={`transition-colors duration-300 cursor-pointer ${lang === "en" ? "text-white" : "text-white/35 hover:text-white/70"}`}
      >
        EN
      </button>
    </div>
  );

  const navBtn = (v: (typeof VIEWS)[number], compact = false) => (
    <button
      key={v.key}
      onClick={() => switchView(v.key)}
      className={`text-left transition-colors duration-300 cursor-pointer whitespace-nowrap ${
        compact ? "text-[11px] tracking-[0.15em] uppercase py-1" : "text-sm py-2.5"
      } ${view === v.key ? "text-[var(--bc-yellow)]" : "text-white/50 hover:text-white"}`}
    >
      {t(v.label)}
    </button>
  );

  return (
    <div className="bg-black text-white h-screen flex flex-col lg:flex-row overflow-hidden antialiased">
      {/* 移动端顶栏 */}
      <header className="lg:hidden flex items-center gap-6 px-5 h-14 border-b border-white/10 shrink-0">
        <button onClick={() => switchView("home")} className="shrink-0 cursor-pointer">
          <img src="/images/logo_bc.png" alt="BrillianceCast Media" className="h-5 w-auto" />
        </button>
        <nav className="flex items-center gap-5 overflow-x-auto flex-1">
          {VIEWS.map((v) => navBtn(v, true))}
        </nav>
        {langToggle}
      </header>

      {/* 桌面侧栏 */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-white/10 p-8">
        <button onClick={() => switchView("home")} className="text-left cursor-pointer">
          <img src="/images/logo_bc.png" alt="BrillianceCast Media" className="h-8 w-auto" />
        </button>
        <nav className="mt-16 flex-1 flex flex-col">
          {VIEWS.map((v) => navBtn(v))}
        </nav>
        <div className="space-y-5">
          {langToggle}
          <a href="mailto:brilliancecast@163.com" className="block text-white/35 text-[11px] hover:text-[var(--bc-yellow)] transition-colors duration-300">
            brilliancecast@163.com
          </a>
        </div>
      </aside>

      {/* 主内容区：一屏一页 */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {/* 首页：品牌主视觉 */}
        {view === "home" && (
          <div className="min-h-full flex flex-col max-w-[1200px] mx-auto px-6 lg:px-14">
            <div className="flex-1 flex flex-col items-center justify-center gap-10 py-16">
              <img src="/images/logo_bc.png" alt="BrillianceCast Media 北京嵊耀皓博文化传媒" className="w-[60vw] max-w-[400px] h-auto" />
              <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-white/50">{t(COPY.heroKicker)}</p>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 pb-12">
              {VIEWS.filter((v) => v.key !== "about" && v.key !== "contact").map((v) => (
                <button
                  key={v.key}
                  onClick={() => switchView(v.key)}
                  className="flex items-center gap-2.5 text-sm md:text-base tracking-[0.2em] text-white/55 hover:text-[var(--bc-yellow)] transition-colors duration-300 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--bc-yellow)] shrink-0" />
                  {t(v.label)}
                </button>
              ))}
            </nav>
            <div className="grid lg:grid-cols-2 gap-8 pb-14 items-end border-t border-white/10 pt-8">
              <p className="text-white/70 leading-relaxed text-sm max-w-xl">{t(COPY.heroLead)}</p>
              <div className="flex flex-wrap gap-6 lg:justify-end items-center">
                <button
                  onClick={() => switchView("cases")}
                  className="border border-white text-white text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
                >
                  {t(COPY.heroCta1)}
                </button>
                <button
                  onClick={() => switchView("business")}
                  className="text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {t(COPY.heroCta2)} →
                </button>
              </div>
            </div>
            <div className="pt-20 pb-10 flex justify-end">
              <button
                onClick={() => switchView("contact")}
                className="text-sm md:text-base tracking-[0.2em] text-white/55 hover:text-[var(--bc-yellow)] transition-colors duration-300 cursor-pointer"
              >
                {lang === "en" ? "Contact" : "联系我们"} →
              </button>
            </div>
          </div>
        )}

        {/* 我们是谁 */}
        {view === "about" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.aboutHead)} center />
            <div className="grid lg:grid-cols-[1fr_300px] gap-x-16 gap-y-8 items-end">
              <p className="text-sm md:text-base leading-loose text-white/65 max-w-2xl">{t(COPY.aboutText)}</p>
              <p className="text-[var(--bc-yellow)] text-sm tracking-[0.1em] leading-relaxed">{t(COPY.mission)}</p>
            </div>
            <div className="mt-16 pt-2 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {([
                { cn: "策略匹配", en: "Strategy Matching" },
                { cn: "商务统筹", en: "Business Coordination" },
                { cn: "落地管理", en: "Execution Management" },
              ] as L[]).map((tt, i) => (
                <span key={tt.cn} className="flex items-center gap-10">
                  {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />}
                  <span className="text-white/90 text-sm md:text-base tracking-[0.15em]">{t(tt)}</span>
                </span>
              ))}
            </div>

            <div className="mt-40">
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide text-center mb-14">{t(COPY.serviceHead)}</h2>
              <div className="grid md:grid-cols-3 gap-x-12 gap-y-12 border-t border-white/10 pt-12">
                {SERVICES.map((s, si) => (
                  <div key={s.part} id={`service-${si + 1}`} className="scroll-mt-8">
                    <h3 className="text-lg text-white/95">{t(s.title)}</h3>
                    <p className="text-white/45 leading-relaxed text-sm mt-5">{t(s.desc)}</p>
                    <p className="text-white/60 text-sm leading-loose mt-6 pt-6 border-t border-white/10">{s.steps.map((st) => t(st)).join("  ·  ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 业务板块 */}
        {view === "business" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.businessHead)} />
            <div className="grid lg:grid-cols-2 gap-x-20 gap-y-14">
              {[
                { label: COPY.divALabel, title: COPY.divATitle, desc: COPY.divADesc, items: DIV_A_ITEMS, mark: "A" },
                { label: COPY.divBLabel, title: COPY.divBTitle, desc: COPY.divBDesc, items: DIV_B_ITEMS, mark: "B" },
              ].map((d) => (
                <div key={d.mark}>
                  <h3 className="font-display text-2xl md:text-3xl cursor-default hover:text-[var(--bc-yellow)] transition-colors duration-500">{t(d.title)}</h3>
                  <p className="text-white/50 leading-relaxed text-sm mt-5 max-w-md">{t(d.desc)}</p>
                  <ul className="mt-9 border-t border-white/10">
                    {d.items.map((it, i) => (
                      <li key={i} className="border-b border-white/10">
                        <button onClick={() => go(it.act)} className="group w-full flex items-center gap-4 py-3.5 text-left cursor-pointer">
                          <span className="w-1 h-1 bg-[var(--bc-yellow)] shrink-0 group-hover:w-5 transition-all duration-500" />
                          <span className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">{t(it)}</span>
                          <span className="ml-auto text-white/0 group-hover:text-[var(--bc-yellow)] transition-all duration-300 text-sm">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 品牌案例 */}
        {view === "cases" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.casesHead)} />
            {openCaseData ? (
              <div>
                <button
                  onClick={() => setOpenCase(null)}
                  className="text-[11px] tracking-[0.25em] uppercase text-white/50 hover:text-[var(--bc-yellow)] transition-colors duration-300 cursor-pointer"
                >
                  ← {lang === "en" ? "All cases" : "返回案例列表"}
                </button>
                <header className="mt-8 mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <h3 className="font-display text-3xl md:text-5xl text-white">{openCaseData.brand}</h3>
                  <p className="text-white/60 text-sm md:text-base">{t(openCaseData.title)}</p>
                  <p className="text-white/35 text-xs">{t(openCaseData.tag)}</p>
                  <p className="ml-auto text-white/25 text-[11px]">{openCaseData.imgs.length} {lang === "en" ? "photos" : "张"}</p>
                </header>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>div]:mb-3">
                  {openCaseData.imgs.map((src) => (
                    <div
                      key={src}
                      className="group overflow-hidden cursor-pointer break-inside-avoid"
                      onClick={() => setLightbox({ src, title: `${openCaseData.brand} · ${t(openCaseData.title)}`, sub: t(openCaseData.tag) })}
                    >
                      <img
                        src={src}
                        alt={`${openCaseData.brand} ${t(openCaseData.title)}`}
                        loading="lazy"
                        className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
              {CASE_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCaseFilter(f.key)}
                  className={`text-[11px] tracking-[0.25em] uppercase pb-1.5 border-b transition-colors duration-300 cursor-pointer ${
                    caseFilter === f.key ? "text-[var(--bc-yellow)] border-[var(--bc-yellow)]" : "text-white/40 border-transparent hover:text-white"
                  }`}
                >
                  {t(f.label)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 border-t border-white/10 pt-10">
              {CASE_GROUPS.filter((c) => (caseFilter === "all" || c.cat === caseFilter) && !c.covers).map((c) => (
                <figure
                  key={c.brand}
                  className="group cursor-pointer"
                  onClick={() => { setOpenCase(c.brand); mainRef.current?.scrollTo({ top: 0 }); }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={c.imgs[0]}
                      alt={`${c.brand} ${t(c.title)}`}
                      loading="lazy"
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <h3 className="font-display text-lg md:text-xl leading-snug text-white group-hover:text-[var(--bc-yellow)] transition-colors duration-500">{c.brand}</h3>
                    <p className="mt-1.5 text-white/50 text-xs">{t(c.title)} · {t(c.tag)}</p>
                    <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-white/25 group-hover:text-[var(--bc-yellow)] transition-colors duration-500">{c.imgs.length} {lang === "en" ? "photos" : "张"} →</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            {CASE_GROUPS.filter((c) => (caseFilter === "all" || c.cat === caseFilter) && c.covers).map((c) => (
              <figure
                key={c.brand}
                className="group cursor-pointer mt-12"
                onClick={() => { setOpenCase(c.brand); mainRef.current?.scrollTo({ top: 0 }); }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {c.covers!.map((src) => (
                    <div key={src} className="overflow-hidden">
                      <img
                        src={src}
                        alt={`${c.brand} ${t(c.title)}`}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
                <figcaption className="mt-4">
                  <h3 className="font-display text-lg md:text-xl leading-snug text-white group-hover:text-[var(--bc-yellow)] transition-colors duration-500">{c.brand}</h3>
                  <p className="mt-1.5 text-white/50 text-xs">{t(c.title)} · {t(c.tag)}</p>
                  <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-white/25 group-hover:text-[var(--bc-yellow)] transition-colors duration-500">{c.imgs.length} {lang === "en" ? "photos" : "张"} →</p>
                </figcaption>
              </figure>
            ))}
            {(caseFilter === "all" || caseFilter === "endorse") && (
            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-white/45 text-[11px] font-bold tracking-[0.3em] uppercase mb-8">{t(COPY.moreTitle)}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {MORE_ENDORSEMENTS.map((m) => (
                  <figure key={m.img} className="group cursor-pointer" onClick={() => setLightbox({ src: m.img, title: m.brand, sub: `${t(m.role)} · ${t(m.artists)}` })}>
                    <div className="overflow-hidden">
                      <img
                        src={m.img}
                        alt={m.brand}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <figcaption className="mt-3">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/40">{m.brand}</p>
                      <p className="text-sm text-white/90 mt-1">{t(m.role)} · <span className="text-white/40">{t(m.artists)}</span></p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-10">{t(COPY.moreNote)}</p>
            </div>
            )}
            {(caseFilter === "all" || caseFilter === "social") && (
            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-white/45 text-[11px] font-bold tracking-[0.3em] uppercase mb-8">{t(COPY.socialTitle)}</p>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>figure]:mb-3">
                {SOCIAL_CASES.flatMap((s) => s.imgs.map((src) => ({ src, s }))).map(({ src, s }) => (
                  <figure key={src} className="group break-inside-avoid cursor-pointer" onClick={() => setLightbox({ src, title: s.brand, sub: t(s.note) })}>
                    <div className="overflow-hidden">
                      <img
                        src={src}
                        alt={s.brand}
                        loading="lazy"
                        className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <figcaption className="mt-2 mb-1">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/40">{s.brand}</p>
                      <p className="text-white/35 text-[11px] mt-0.5 leading-relaxed">{t(s.note)}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            )}
            </>
            )}
          </div>
        )}

        {/* 造型作品：一次一个类别 */}
        {view === "styling" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.stylingHead)} />
            <div className="flex flex-wrap gap-x-7 gap-y-3 mb-12">
              {STYLING_GROUPS.map((g, gi) => (
                <button
                  key={t(g.cat)}
                  onClick={() => setStylingCat(gi)}
                  className={`text-[11px] tracking-[0.2em] uppercase pb-1.5 border-b transition-colors duration-300 cursor-pointer ${
                    stylingCat === gi ? "text-[var(--bc-yellow)] border-[var(--bc-yellow)]" : "text-white/40 border-transparent hover:text-white"
                  }`}
                >
                  {t(g.cat)}
                </button>
              ))}
            </div>
            <div className="flex items-baseline gap-5 mb-8">
              <p className="text-xl text-white/95">{t(STYLING_GROUPS[stylingCat].cat)}</p>
              <p className="text-white/35 text-xs">{t(STYLING_GROUPS[stylingCat].note)}</p>
            </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>div]:mb-3">
              {STYLING_GROUPS[stylingCat].imgs.map((src) => (
                <div
                  key={src}
                  className="group overflow-hidden cursor-pointer break-inside-avoid"
                  onClick={() => setLightbox({ src, title: t(STYLING_GROUPS[stylingCat].cat), sub: t(STYLING_GROUPS[stylingCat].note) })}
                >
                  <img
                    src={src}
                    alt={t(STYLING_GROUPS[stylingCat].cat)}
                    loading="lazy"
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 合作品牌 */}
        {view === "brands" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.brandsHead)} />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-12 gap-y-12">
              {BRAND_GROUPS.map((g) => (
                <div key={t(g.cat)}>
                  <p className="text-[var(--bc-yellow)] text-[11px] font-bold tracking-[0.3em] mb-6">{t(g.cat)}</p>
                  <p className="text-white/60 text-sm leading-loose">{g.brands.join("　·　")}</p>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-12">{t(COPY.brandsNote)}</p>
          </div>
        )}

        {/* 艺人资源 */}
        {view === "artists" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <Label text={t(COPY.artistsHead)} />
            <div className="grid md:grid-cols-2 gap-x-20 border-t border-white/10">
              {AGENCIES.map(([agency, artists]) => (
                <div key={agency} className="flex items-baseline justify-between gap-8 py-3.5 border-b border-white/10">
                  <p className="text-white/90 text-sm shrink-0">{agency}</p>
                  <p className="text-white/40 text-xs leading-relaxed text-right">{artists}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 grid lg:grid-cols-[220px_1fr] gap-8 items-baseline border-t border-white/10 pt-10">
              <p className="text-white/45 text-[11px] font-bold tracking-[0.3em] uppercase">2026-27 Pipeline</p>
              <div className="text-white/60 text-sm leading-loose">
                <p>
                  <span className="text-white/95">{t(COPY.pipeTitle)}</span>
                  {t(COPY.pipeBody)}
                </p>
                <p className="mt-2 text-white/40">{t(COPY.pipeMore)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 联系我们 */}
        {view === "contact" && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl border-b border-white/10 pb-8 mb-10">{t(COPY.contactHead)}</h2>
            <p className="text-white/60 leading-relaxed max-w-xl">{t(COPY.contactLead)}</p>
            <a
              href="mailto:brilliancecast@163.com"
              className="inline-block font-display text-lg lg:text-xl mt-10 underline decoration-white/20 underline-offset-8 hover:decoration-[var(--bc-yellow)] hover:text-[var(--bc-yellow)] transition-colors duration-500 break-all"
            >
              brilliancecast@163.com
            </a>
            <p className="text-white/30 text-xs mt-4">{t(COPY.contactMailNote)}</p>
            <div className="mt-9 space-y-1.5 text-white/45 text-sm">
              <p>{t(COPY.contactAddr)}</p>
              <p>{t(COPY.contactHours)}</p>
              <p>
                <a href="https://brilliancecast.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[var(--bc-yellow)] transition-colors duration-300">
                  {t(COPY.contactSite)}
                </a>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-10 mt-14 max-w-3xl">
              <div>
                <img src="/images/卡片_小红书.png" alt="小红书官方账号二维码" className="w-full h-auto" />
                <p className="text-white/30 text-[11px] mt-3">{t(COPY.qrRed)}</p>
              </div>
              <div>
                <img src="/images/卡片_微博.png" alt="微博官方账号二维码" className="w-full h-auto" />
                <p className="text-white/30 text-[11px] mt-3">{t(COPY.qrWeibo)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 页脚 */}
        <div className="border-t border-white/10 mt-4">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-6 flex items-center justify-between gap-4">
            <p className="text-white/30 text-[11px] tracking-[0.1em]">
              © {new Date().getFullYear()} 北京嵊耀皓博文化传媒 · BrillianceCast Media
            </p>
          </div>
        </div>
      </main>

      {/* 图片放大查看 */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button aria-label="Close" className="absolute top-6 right-8 text-white/50 hover:text-white text-3xl leading-none transition-colors duration-300 cursor-pointer">
            ×
          </button>
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} className="w-full max-h-[78vh] object-contain" />
            <figcaption className="mt-5 text-center">
              <p className="text-white/90 text-sm">{lightbox.title}</p>
              <p className="text-white/40 text-xs mt-1.5">{lightbox.sub}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
