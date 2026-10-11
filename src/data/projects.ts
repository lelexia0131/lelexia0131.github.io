export interface Project {
  slug: string;
  name: string;
  englishName: string;
  category: string;
  description: string;
  icon: string;
  platforms: string[];
  releaseUrl: string;
  repository: string;
  screenshots: { src: string; caption: string; width: number; height: number }[];
  features: { title: string; description: string }[];
  release: { version: string; date: string; summary: string; changes: string[]; url: string };
  installation: { platform: string; instructions: string; file: string }[];
}

// Only public projects belong here. Add future works when they are announced.
export const projects: Project[] = [
  {
    slug: "fiverealms", name: "五域纷争", englishName: "FiveRealms",
    category: "阵营卡牌 · 策略博弈",
    description: "最开始只是想自己动手做一款桌游。从设计规则，到编写 AI 系统、处理游戏里的各种逻辑和交互，一点点把最初的想法变成了真正能玩的游戏。这也是我第一次独立完成一个完整的游戏项目。",
    icon: "/games/fiverealms/icon.png", platforms: ["Windows"],
    releaseUrl: "https://github.com/lelexia0131/FiveRealms/releases",
    repository: "https://github.com/lelexia0131/FiveRealms",
    screenshots: [{ src: "/games/fiverealms/gameplay.png", caption: "单人对局 · 角色、阵营与手牌", width: 1707, height: 960 }],
    features: [
      { title: "公开阵营，协作制胜", description: "五名角色分为晨星与暮影两队。观察座次和动态距离，选择出牌目标，配合队友推进战局。" },
      { title: "卡牌与角色的组合", description: "八名角色各有主动与被动技能。搭配基础牌、战术牌和装备，在进攻、格挡与救援之间作出选择。" },
      { title: "独自挑战，也能一起玩", description: "单人模式与四名电脑角色对局；多人模式通过房间连接真人玩家，其余席位由电脑补全。" },
    ],
    release: {
      version: "1.3.2", date: "2026-09-18", summary: "玩家成长系统与联机体验更新",
      changes: ["加入持久化经验、经验徽章与历史档案进度。", "联机房间支持聊天、连续对局与撤销角色选择。", "改进 AI 响应、概率计算和多人同步稳定性。"],
      url: "https://github.com/lelexia0131/FiveRealms/releases/tag/v1.3.2",
    },
    installation: [{ platform: "Windows", file: "FiveRealms-Setup-1.3.2.exe", instructions: "在 Releases 对应版本的 Assets 中选择 EXE 安装包，下载后运行安装向导。" }],
  },
  {
    slug: "wildgrid", name: "野格", englishName: "Wildgrid",
    category: "露营主题 · 逻辑益智",
    description: "国庆假期偶然看到一款叫《露营达人》的掌机游戏，觉得挺有意思，就有了自己做一款露营主题小游戏的想法。后来慢慢做成了现在的《野格》，在电脑和手机上都能玩。",
    icon: "/games/wildgrid/icon.svg", platforms: ["Windows", "Android"],
    releaseUrl: "https://github.com/lelexia0131/Wildgrid/releases",
    repository: "https://github.com/lelexia0131/Wildgrid",
    screenshots: [
      { src: "/games/wildgrid/adventure.png", caption: "冒险模式 · Day 41 的营地布局", width: 1280, height: 900 },
      { src: "/games/wildgrid/survival.png", caption: "荒野求生 · 随机地图挑战", width: 1280, height: 900 },
    ],
    features: [
      { title: "45 关，慢慢找到答案", description: "从 6×6 到 8×8，在固定冒险关卡中逐步认识设施与规则。支持撤销、重做和本地进度保存。" },
      { title: "到荒野里再来一局", description: "荒野求生提供 10 档难度的随机挑战。规划布局，完成地图，积累经验并解锁身份徽章。" },
      { title: "亲手设计一片营地", description: "在沙盒中创造 6×6 或 8×8 地图，摆放地形与设施。通过质检后保存或导出，也可以导入地图代码游玩。" },
    ],
    release: {
      version: "1.0.0", date: "2026-10-11", summary: "Windows 与 Android 版本正式发布",
      changes: ["45 个固定冒险关卡，以及 10 档难度的荒野求生挑战。", "沙盒地图创作、地图代码导入与本地地图保存。", "发布 Windows x64 安装包与 Android APK。"],
      url: "https://github.com/lelexia0131/Wildgrid/releases/tag/v1.0.0",
    },
    installation: [
      { platform: "Windows x64", file: "Wildgrid-Setup-1.0.0-x64.exe", instructions: "下载 EXE 后运行安装向导。此版本未配置代码签名证书，请核对下载来源。" },
      { platform: "Android 7.0 及以上", file: "Wildgrid-v1.0.0.apk", instructions: "在 Android 设备上打开 APK 安装。此包沿用项目 debug 签名；更新请覆盖安装，卸载会删除本地存档。" },
    ],
  },
];

export const updates = projects.map((project) => ({ project, release: project.release }))
  .sort((a, b) => b.release.date.localeCompare(a.release.date));
