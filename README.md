# Lelexia's Blog

Lelexia 的个人开发者博客与作品展示站。正式域名：<https://blog.lelexia.ccwu.cc/>。

## 开发与构建

需要 Node.js 22.12+（当前使用 Node.js 24）。

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` 执行 TypeScript 检查并生成 `dist/`，由 GitHub Actions 发布到 GitHub Pages。无需数据库或服务端应用。网站代码不请求外部字体、媒体或 API。

## 页面与内容

- `/#/`：个人介绍、两款精选作品及真实版本发布动态。
- `/#/works`：五域纷争（FR）与野格（WG）。
- `/#/works/fiverealms`、`/#/works/wildgrid`：真实图标、玩法、截图预览、支持平台、更新与安装指引。
- `/#/articles`：文章列表，目前为空；真实文章添加后由 `/#/articles/:slug` 阅读页展示。
- `/#/about`：个人介绍及 GitHub 联系入口。

仅有首页、作品、文章、关于四个主栏目。截图支持点击放大、键盘左右切换和 Escape 关闭。未识别地址显示 404 页面。

所有“前往 GitHub 下载”按钮都在新标签页打开对应 GitHub Releases，不包含安装包直链、镜像或下载代理。

## 内容维护

- `src/data/projects.ts`：已公开作品数据。新增作品时添加数据即可生成卡片与详情页；不要提前加入未公开项目。
- `src/data/articles.ts`：真实文章数组。每篇包含唯一 `slug`、标题、日期、分类、摘要与正文段落；当前为空数组。
- `public/games/`：真实图标与截图，来源见 [素材记录](docs/assets.md)。
- `src/App.tsx`：页面、共享导航、截图预览和文章阅读布局。
- `src/styles.css`：统一视觉、响应式布局与减少动画适配。

版本信息是构建时快照。发布新版本后，核对 Releases 的附件，再更新作品数据并构建。

## GitHub Pages 自动部署

复用仓库 `lelexia0131/lelexia0131.github.io` 和 `.github/workflows/deploy.yml`。推送到 `main` 或手动运行工作流后，使用 Node.js 24 执行 `npm ci`、`npm run build`，上传 `dist/` 并部署。仓库 Settings → Pages 的 Source 为 **GitHub Actions**。

保留 Vite `base: "/"` 和 HashRouter，资源从自定义域名根目录加载，页面链接使用 `/#/…`，不需要服务端路由规则。FR/WG 的图标和截图随构建产物发布。

Custom domain 在 GitHub Pages 设置中绑定为 `blog.lelexia.ccwu.cc`。Actions 部署不读取产物里的 `CNAME` 文件，因此不添加该文件；后续部署会保留仓库的域名设置。[GitHub 官方说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

Cloudflare 仅负责 DNS：博客 CNAME 指向 `lelexia0131.github.io`，**DNS only（灰云）**，TTL Auto。先绑定 Pages 域名，再添加 DNS；证书签发后启用 Enforce HTTPS。不更新 VPS 文件，也不修改原有 A 记录、Nginx、Xray、443 分流或 Tunnel。配置与验证步骤见 [部署说明](docs/deployment.md)。
