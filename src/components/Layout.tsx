import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        跳转到内容
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Lelexia 作品论坛首页">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
            <span>
              Lelexia<span className="brand-sub">作品论坛</span>
            </span>
          </Link>
          <nav
            className={`primary-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="主导航"
          >
            {[
              { to: "/", text: "首页" },
              { to: "/boards", text: "版面列表" },
              { to: "/latest", text: "最新" },
              { to: "/featured", text: "精华" },
              { to: "/search", text: "搜索" },
            ].map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.text}
              </NavLink>
            ))}
          </nav>
          <form
            className="header-search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            }}
          >
            <Search size={16} />
            <input
              aria-label="搜索论坛"
              placeholder="搜索感兴趣的内容"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <Link to="/login" className="login-link">
            登录 <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-toggle icon-button"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <Link className="footer-brand" to="/">
            Lelexia <span>作品论坛</span>
          </Link>
          <p>游戏让我们相遇，交流让灵感延续。</p>
        </div>
        <div>
          <span>独立作品 · 共同探索</span>
          <p>© {new Date().getFullYear()} Lelexia · 前端演示版</p>
        </div>
      </footer>
    </>
  );
}
