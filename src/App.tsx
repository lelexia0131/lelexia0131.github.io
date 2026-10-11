import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Code2, Expand, Menu, Monitor, Smartphone, X } from "lucide-react";
import { Link, NavLink, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { projects, updates, type Project } from "./data/projects";
import { articles } from "./data/articles";

const github = "https://github.com/lelexia0131";
const navigation = [{ to: "/", label: "首页" }, { to: "/works", label: "作品" }, { to: "/articles", label: "文章" }, { to: "/about", label: "关于" }];

function ExternalLink({ href, children, className = "", label }: { href: string; children: React.ReactNode; className?: string; label?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">（在新标签页打开）</span></a>;
}

function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const initialRoute = useRef(true);
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (initialRoute.current) initialRoute.current = false;
    else mainRef.current?.focus({ preventScroll: true });
    const project = projects.find((item) => pathname === `/works/${item.slug}`);
    const article = articles.find((item) => pathname === `/articles/${item.slug}`);
    const title = project?.name ?? article?.title ?? navigation.find((item) => item.to === pathname)?.label ?? "页面未找到";
    document.title = pathname === "/" ? "Lelexia 的个人博客 · 五域纷争与野格" : `${title} · Lelexia's Blog`;
  }, [pathname]);
  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); mainRef.current?.focus(); }}>跳转到正文</a>
    <header className="site-header"><div className="header-inner">
      <Link to="/" className="brand" aria-label="Lelexia's Blog 首页"><span className="brand-mark">L<span /></span>Lelexia<span className="brand-suffix">'s Blog</span></Link>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label="主导航">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}</nav>
      <ExternalLink href={github} className="header-github" label="GitHub（在新标签页打开）"><Code2 size={19} /><span>GitHub</span></ExternalLink>
      <button className="menu-toggle icon-button" aria-label={menuOpen ? "关闭导航" : "打开导航"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={(event) => { if (event.key === "Escape") setMenuOpen(false); }}>{menuOpen ? <X /> : <Menu />}</button>
    </div></header>
    <main id="main-content" ref={mainRef} tabIndex={-1}><Outlet /></main>
    <footer className="site-footer container"><Link to="/" className="footer-brand">Lelexia's Blog</Link><div><span>© {new Date().getFullYear()} Lelexia</span><a href="https://blog.lelexia.ccwu.cc/">blog.lelexia.ccwu.cc</a><ExternalLink href={github}>GitHub</ExternalLink></div></footer>
  </>;
}

function PlatformList({ platforms }: { platforms: string[] }) {
  return <span className="platforms">{platforms.map((platform) => <span key={platform}>{platform === "Android" ? <Smartphone size={14} /> : <Monitor size={14} />}{platform}</span>)}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return <Link to={`/works/${project.slug}`} className={`project-card ${project.slug}`}>
    <div className="project-image"><img src={project.screenshots[0].src} alt={`${project.name}游戏实景`} width={project.screenshots[0].width} height={project.screenshots[0].height} loading="lazy" /><span className="view-project">探索作品 <ArrowUpRight size={19} /></span></div>
    <div className="project-card-body"><div className="project-card-title"><img className="app-icon" src={project.icon} width="64" height="64" alt={`${project.name} App 图标`} /><div><span className="project-english">{project.englishName}</span><h3>{project.name}</h3></div><ArrowUpRight className="card-arrow" size={25} /></div><p>{project.description}</p><div className="project-card-meta"><span>{project.category}</span><PlatformList platforms={project.platforms} /></div></div>
  </Link>;
}

function HomePage() {
  return <div className="container home-page">
    <header className="home-intro"><h1>你好，我是 Lelexia。</h1><p>我是一名独立开发者，这里放着我做的游戏。</p></header>
    <div className="home-projects">{projects.map((project) => <section className={`home-project ${project.slug}`} key={project.slug} aria-labelledby={`home-${project.slug}`}>
      <Link to={`/works/${project.slug}`} className="home-project-art" aria-label={`查看${project.name}游戏详情`}><img src={project.icon} alt={`${project.name} App 图标`} width="256" height="256" /></Link>
      <div className="home-project-copy"><h2 id={`home-${project.slug}`}><Link to={`/works/${project.slug}`}>{project.name}<span> · {project.englishName}</span></Link></h2><p>{project.description}</p><div className="home-project-actions"><Link to={`/works/${project.slug}`} className="text-link">看看游戏 <ArrowRight size={18} /></Link><ExternalLink href={project.releaseUrl} className="text-link">下载游戏</ExternalLink></div></div>
    </section>)}</div>
    <section className="updates-section"><div className="section-heading"><h2>最近更新</h2><Link className="text-link" to="/articles">文章 <ArrowRight size={18} /></Link></div><div className="update-list">{updates.map(({ project, release }) => <Link key={project.slug} to={`/works/${project.slug}`} className="update-row"><time dateTime={release.date}>{release.date.replaceAll("-", ".")}</time><div><h3>{project.name} v{release.version}</h3><p>{release.summary}</p></div><ArrowUpRight size={22} /></Link>)}</div></section>
  </div>;
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>;
}

function WorksPage() {
  return <div className="container page-content"><header className="page-heading"><h1>我的游戏</h1></header><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div>;
}

function Gallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = project.screenshots[index];
  useEffect(() => {
    const onClose = () => { document.body.style.overflow = ""; };
    const element = dialog.current;
    element?.addEventListener("close", onClose);
    return () => { element?.removeEventListener("close", onClose); onClose(); };
  }, []);
  function openImage(next: number) { setIndex(next); dialog.current?.showModal(); document.body.style.overflow = "hidden"; }
  function changeImage(direction: number) { setIndex((value) => (value + direction + project.screenshots.length) % project.screenshots.length); }
  return <section className="detail-section"><div className="section-heading compact"><h2>游戏实景</h2><span className="muted">点击图片查看大图</span></div><div className="screenshots">{project.screenshots.map((shot, shotIndex) => <figure key={shot.src}><button className="screenshot-button" onClick={() => openImage(shotIndex)} aria-label={`放大查看：${shot.caption}`}><img src={shot.src} width={shot.width} height={shot.height} alt={shot.caption} loading="lazy" /><span><Expand size={20} /></span></button><figcaption>{shot.caption}</figcaption></figure>)}</div>
    <dialog ref={dialog} className="image-dialog" aria-label={`${project.name}截图预览`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowRight") changeImage(1); if (event.key === "ArrowLeft") changeImage(-1); }}><button className="dialog-close icon-button" onClick={() => dialog.current?.close()} aria-label="关闭大图"><X /></button><img src={current.src} alt={current.caption} /><div className="dialog-caption">{project.screenshots.length > 1 && <button className="icon-button" onClick={() => changeImage(-1)} aria-label="上一张截图"><ChevronLeft /></button>}<span>{current.caption}</span>{project.screenshots.length > 1 && <button className="icon-button" onClick={() => changeImage(1)} aria-label="下一张截图"><ChevronRight /></button>}</div></dialog>
  </section>;
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  const other = projects.find((item) => item.slug !== slug);
  return <div className="container page-content project-detail"><Link to="/works" className="back-link"><ArrowLeft size={17} /> 所有作品</Link>
    <header className={`detail-hero ${project.slug}`}><div className="detail-title"><img className="detail-icon" src={project.icon} alt={`${project.name} App 图标`} width="112" height="112" /><div><p className="eyebrow">{project.englishName}</p><h1>{project.name}</h1><p className="detail-category">{project.category}</p></div></div><p className="detail-intro">{project.description}</p><div className="detail-actions"><ExternalLink href={project.releaseUrl} className="button primary">前往 GitHub 下载</ExternalLink><PlatformList platforms={project.platforms} /></div></header>
    <Gallery project={project} key={project.slug} />
    <section className="detail-section"><p className="eyebrow">HOW TO PLAY</p><h2>走进游戏</h2><div className="features">{project.features.map((feature, index) => <div key={feature.title}><span className="feature-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</div></section>
    <div className="release-download-grid"><section className="release-panel"><p className="eyebrow">RELEASE NOTES</p><h2>版本更新</h2><div className="release-heading"><span>v{project.release.version}</span><time dateTime={project.release.date}>{project.release.date}</time></div><h3>{project.release.summary}</h3><ul className="change-list">{project.release.changes.map((change) => <li key={change}><Check size={16} /><span>{change}</span></li>)}</ul><ExternalLink href={project.release.url} className="text-link">查看完整发布记录</ExternalLink></section>
      <section className="download-panel"><p className="eyebrow">GET THE GAME</p><h2>准备好开始了吗？</h2><p>前往 GitHub Releases，在 Assets 中选择适合设备的安装包。</p>{project.installation.map((item) => <div className="install-step" key={item.platform}><h3>{item.platform}</h3><p>{item.instructions}</p><code>{item.file}</code></div>)}<ExternalLink href={project.releaseUrl} className="button primary">前往 GitHub 下载</ExternalLink><ExternalLink href={project.repository} className="source-link">查看项目源码</ExternalLink></section></div>
    {other && <Link className="next-project" to={`/works/${other.slug}`}><span>继续探索</span><img src={other.icon} width="48" height="48" alt="" /><strong>{other.name}</strong><span>{other.englishName}</span><ArrowRight /></Link>}
  </div>;
}

function ArticlesPage() {
  return <div className="container page-content articles-page"><PageHeading eyebrow="NOTES & JOURNAL" title="开发路上的记录。" description="关于游戏、代码，以及把想法做出来的过程。" />{articles.length ? <div className="article-list">{articles.map((article) => <Link key={article.slug} to={`/articles/${article.slug}`} className="article-row"><div className="article-meta"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span></div><h2>{article.title}</h2><p>{article.summary}</p><ArrowUpRight /></Link>)}</div> : <section className="empty-state"><div className="empty-illustration" aria-hidden="true"><span /><span /><span /><i /></div><h2>第一篇，留给值得记录的事。</h2><p>这里还没有发布文章。<br />先去看看正在创造的游戏吧。</p><Link to="/works" className="text-link">探索作品 <ArrowRight size={18} /></Link></section>}</div>;
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;
  return <article className="container page-content reading-page"><Link className="back-link" to="/articles"><ArrowLeft size={17} /> 全部文章</Link><header><div className="article-meta"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span></div><h1>{article.title}</h1><p className="article-summary">{article.summary}</p></header>{article.sections.map((section, index) => <section key={index}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</section>)}</article>;
}

function AboutPage() {
  return <div className="container page-content about-page"><PageHeading eyebrow="HELLO, I'M LELEXIA" title="你好，我是 Lelexia。" description="一名把想法写进代码里的个人开发者。" /><div className="about-grid"><div className="about-statement"><span className="large-l" aria-hidden="true">L<span>.</span></span><p>保持好奇。<br />继续创造。</p></div><div className="about-copy"><h2>从一个想法，到一个可以玩的世界。</h2><p>我开发原创游戏，也在这里记录开发过程。现在，你可以探索我的两款作品：阵营卡牌游戏「五域纷争」，以及露营主题逻辑益智游戏「野格」。</p><p>这个博客用来安放作品、开发日志与技术笔记。希望每一个来到这里的人，都能找到一点游戏的乐趣，或一点创造的灵感。</p><Link to="/works" className="text-link">看看我的作品 <ArrowRight size={18} /></Link><div className="contact"><h2>找到我</h2><p>项目源码与公开联系方式，请查看我的 GitHub 主页。</p><ExternalLink href={github} className="contact-link"><Code2 size={24} /><span><strong>lelexia0131</strong><small>github.com/lelexia0131</small></span></ExternalLink></div></div></div></div>;
}

function NotFoundPage() {
  return <div className="container not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>这里还没有故事。</h1><p>这个地址不存在，去看看其他作品吧。</p><Link to="/" className="button primary">回到首页 <ArrowRight size={18} /></Link></div>;
}

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="works" element={<WorksPage />} /><Route path="works/:slug" element={<ProjectPage />} /><Route path="articles" element={<ArticlesPage />} /><Route path="articles/:slug" element={<ArticlePage />} /><Route path="about" element={<AboutPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>;
}
