# GitHub Pages 部署

配置日期：2026-10-11。博客目标地址：<https://blog.lelexia.ccwu.cc/>。

## 发布方式

- 现有仓库：`lelexia0131/lelexia0131.github.io`，分支 `main`。
- 复用 `.github/workflows/deploy.yml`：Node.js 24、`npm ci`、`npm run build`，发布目录 `dist/`。
- Settings → Pages → Source：**GitHub Actions**。
- Custom domain：`blog.lelexia.ccwu.cc`。域名绑定保存在仓库 Pages 设置中；Actions 部署会忽略 `CNAME` 文件，不需要添加该文件。
- 保留 Vite `base: "/"`、HashRouter 和当前博客设计；FR/WG 图标、截图及介绍一并发布。

## DNS 与 HTTPS

先保存 GitHub Pages 自定义域名，再到 Cloudflare Zone **`lelexia.ccwu.cc`** 添加记录。DNS 委托已核实为 `aitana.ns.cloudflare.com` 和 `robert.ns.cloudflare.com`。只操作完整名称 `blog.lelexia.ccwu.cc`，不修改其他记录。

| 字段 | 值 |
| --- | --- |
| 类型 | CNAME |
| Name | `blog` |
| 完整名称 | `blog.lelexia.ccwu.cc` |
| 目标 | `lelexia0131.github.io` |
| Proxy status | **DNS only（灰云）** |
| TTL | Auto |

保存前核对最终完整名称为 `blog.lelexia.ccwu.cc`，不能在其他 Zone 下照填 `blog`。

DNS 生效后，在仓库 Settings → Pages 确认证书已签发并启用 **Enforce HTTPS**。证书和该选项可能需要等待 GitHub 处理，不能通过启用 Cloudflare Proxy 规避等待。

[GitHub 自定义域名说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

## 更新与必要验证

1. 更新博客源码或真实作品数据，执行 `npm run build`。
2. 提交并推送到 `main`，确认该提交的 GitHub Actions 部署成功。
3. 确认博客 CNAME 指向 GitHub Pages，A/AAAA 解析为 GitHub Pages 地址。
4. 正常校验证书访问 HTTPS 首页，检查 JS、CSS、favicon、FR/WG 图标和截图。
5. 检查桌面和移动端，以及 `/#/works/fiverealms`、`/#/works/wildgrid` 的文字和 Releases 链接。

博客后续更新只由 GitHub Pages 发布。此前部署在 `lelexia.ccwu.cc` 的 VPS 站点保持现状；本次部署不操作 VPS 文件，不修改原有 A 记录、Nginx、Tunnel、VLESS、Xray 或 443 端口，也不重启服务。
