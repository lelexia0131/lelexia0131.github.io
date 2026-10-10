# Lelexia 作品论坛

五域纷争（FiveRealms）与野格（Wildgrid）的中文作品交流社区前端。

网站：https://lelexia0131.github.io/

## 本地开发

需要 Node.js 22.12+ 或 Node.js 24 LTS、npm。

```powershell
cd D:\MyWebsite
npm ci
npm run dev
```

访问终端显示的本地地址（默认 `http://localhost:5173`）。

```powershell
npm run build
npm run preview
```

`build` 先执行严格 TypeScript 检查，再构建至 `dist/`；`preview` 默认在 `http://localhost:4173` 预览生产产物。

## 页面与行为

- 首页：公告、两个作品区、八个子版块、最新主题。
- 版面列表和子版块：主题统计、版块切换、按发布时间 / 最后回复 / 回复数 / 浏览数排序。
- 最新 / 精华：按游戏筛选；精华仅显示演示精选主题。
- 帖子详情：作者资料入口、正文、按楼层排列的回复、返回版块。
- 搜索：标题和正文匹配，可限定版块；关键词保存在 URL，支持刷新与前进后退。
- 个人主页：演示头像、昵称、简介、加入日期和发帖列表。
- 登录 / 注册：仅 UI，输入和提交禁用，不收集凭据。
- 发帖编辑器：版块选择、标题、纯文本正文和预览。发布禁用，不提交、不保存草稿。
- 未知地址、版块或用户显示友好的 404 页面。

所有示例作者、日期、帖子及统计均为**演示数据**，不代表实际账号、运营活动或用户活跃度。没有真实登录、数据库、网络提交、阅读计数或回复发布功能。

## 结构

```text
src/
  components/      共享布局、版块、主题列表、侧栏、面包屑
  pages/           浏览、帖子与个人主页、认证与编辑页面
  data/            作品配置及少量演示内容
  services/api.ts  统一 ForumApi 接口与演示适配器
  types.ts         User、Board、Topic、Post、Reply 等类型
  context.tsx      数据加载与共享（React Context）
  styles.css       响应式样式
```

技术栈：React、TypeScript、Vite、React Router、Lucide SVG 图标。无 Electron、后端或额外状态管理框架；字体使用系统字体，无外部字体请求。

## GitHub Pages 部署

`.github/workflows/deploy.yml` 在推送 `main` 时执行 `npm ci`、`npm run build`，上传 `dist/` 并部署到 GitHub Pages。也可以在 GitHub Actions 中手动运行工作流。

首次部署前，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**，而不是 **Deploy from a branch**。仓库管理员需要允许 Actions 运行和 Pages 部署；若仓库环境配置了审批规则，部署还需要通过该审批。

```powershell
git add .
git commit -m "Update forum"
git push origin main
```

在仓库 Actions 页查看 `Deploy forum to GitHub Pages` 的构建与部署结果。

- 这是用户站点 `lelexia0131.github.io`，因此 Vite 的 `base` 为 `/`。
- 使用 `HashRouter`，帖子地址例如 `https://lelexia0131.github.io/#/topics/camp-notes`。刷新时服务器始终请求根路径，避免静态站点深层路由 404。
- 内部导航统一使用 React Router 链接。不要把 `/#/topics/...` 改成 `/topics/...`。
- 参考：[Vite GitHub Pages 部署](https://vite.dev/guide/static-deploy.html#github-pages)与 [GitHub 自定义 Pages 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 后续接入 VPS

目前 `src/services/api.ts` 提供 `getForum`、`login`、`register`、`createTopic`、`createReply` 的 TypeScript 契约。读取返回演示内容，所有写入接口均拒绝并报告未开放，不伪造成功。

后续需要完成：

1. 在 VPS 独立实现 FastAPI + SQLite，建立用户、版块、主题、正文及回复数据模型；保持稳定 ID、ISO 日期和接口字段。
2. 按真实数据规模拆分列表、详情、搜索、分页接口，将 `api.ts` 的演示适配器替换为 HTTPS 请求，并按需调整 Context 的加载方式。
3. 完成服务器端身份认证、会话、密码哈希、权限校验、内容校验、限流与错误返回，配置仅允许前端站点来源的 CORS。
4. 将 API 地址通过 Vite 环境变量注入；前端环境变量会公开，不能放数据库密码或认证密钥。
5. 接通表单与对应 API 后再开放登录、注册、发帖、回复；移除演示状态和样本内容，使用服务端统计，并验证加载、失败和过期会话状态。

本仓库不包含 VPS 服务端或数据库部署。
