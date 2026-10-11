# 内容与素材来源

核对日期：2026-10-11。游戏项目只读，未修改游戏本体。

| 网站资源 | 本地原始来源 | 处理 |
| --- | --- | --- |
| `public/games/fiverealms/icon.png` | `D:\FiveRealms\assets\ui\five-realms.ico` | 无损提取原始 256×256 图层，保留 RGBA 像素与比例 |
| `public/games/fiverealms/gameplay.png` | `D:\FiveRealms\reports\network-ui\singleplayer.png` | 原文件复制，单人对局运行截图 |
| `public/games/wildgrid/icon.svg` | `D:\Wildgrid\public\icon.svg` | 原文件复制，无设计修改 |
| `public/games/wildgrid/adventure.png` | `D:\Wildgrid\.desktop-smoke\day31\game-1280.png` | 原文件复制，Day 41 运行截图 |
| `public/games/wildgrid/survival.png` | `D:\Wildgrid\reports\survival-badges\game-desktop.png` | 原文件复制，荒野求生运行截图 |

截图展示已有界面，不将历史运行画面标注为最新版截图。详情页完整保留截图比例。App 图标使用 `object-fit: contain`。

作品介绍依据两个项目 README。FR 公开版本核对自 [v1.3.2](https://github.com/lelexia0131/FiveRealms/releases/tag/v1.3.2)，Windows 附件为 `FiveRealms-Setup-1.3.2.exe`。

WG 的 [v1.0.0](https://github.com/lelexia0131/Wildgrid/releases/tag/v1.0.0) 于本次任务按所有者要求发布，目标提交 `d3a128971971e6a940fc30d2fd217c166b6fdd06`。使用已有构建，不重新编译、不修改游戏源码。Windows EXE 文件版本 1.0.0，SHA-512 与 `release/latest.yml` 匹配；APK 包名 `com.wildgrid.game`、versionName 1.0.0、versionCode 4、minSdk 24。

| WG 公开附件 | 字节数 | SHA-256 |
| --- | ---: | --- |
| `Wildgrid-Setup-1.0.0-x64.exe` | 111553506 | `284e0b87755ec7cc32e4257c592a29174bfedec7253cea09bf2232601c241fe6` |
| `Wildgrid-v1.0.0.apk` | 4421322 | `04b98bd51406591ebb0a3ba7d6364294c07bd1a76e48f7b7567c38fd9bfb3f1e` |

GitHub 两个附件的 digest 与本地 SHA-256 一致。APK 只改附件名，原文件为 `野格-v1.0.0.apk`。安装指引如实注明 Windows 未配置代码签名、Android 沿用现有 debug 签名。网站公开资源与构建产物不包含安装包。
