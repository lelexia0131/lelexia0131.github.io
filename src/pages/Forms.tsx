import {
  ArrowLeft,
  ArrowRight,
  Eye,
  LockKeyhole,
  PencilLine,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumb, PageHeading } from "../components/Forum";
import { useForum } from "../context";
import { games } from "../data/games";

export function AuthPage({ register = false }: { register?: boolean }) {
  return (
    <div className="auth-wrap">
      <Link className="muted-link" to="/">
        <ArrowLeft size={15} />
        返回论坛
      </Link>
      <section className="panel auth-card">
        <img
          className="auth-logo"
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt="Lelexia"
        />
        <span className="eyebrow">LELEXIA COMMUNITY</span>
        <h1>{register ? "开启新的相遇" : "欢迎回来"}</h1>
        <p>
          {register ? "让灵感与热爱，在这里延续。" : "回到属于玩家的交流角落。"}
        </p>
        <div className="form-notice">
          <LockKeyhole size={17} />
          {register ? "注册" : "登录"}服务尚未开放
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          {register && (
            <label>
              昵称
              <input
                disabled
                placeholder="你的社区昵称"
                autoComplete="nickname"
              />
            </label>
          )}
          <label>
            邮箱
            <input
              type="email"
              disabled
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label>
            密码
            <input
              type="password"
              disabled
              placeholder={register ? "设置你的密码" : "输入密码"}
              autoComplete={register ? "new-password" : "current-password"}
            />
          </label>
          <button className="button primary wide" type="submit" disabled>
            {register ? "注册暂未开放" : "登录暂未开放"}
            <ArrowRight size={16} />
          </button>
        </form>
        <div className="auth-switch">
          {register ? "已有账号？" : "还没有账号？"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "前往登录" : "了解注册"}
          </Link>
        </div>
      </section>
      <p className="auth-footnote">当前仅展示界面，不收集账号或密码。</p>
    </div>
  );
}

export function EditorPage() {
  const { boards } = useForum();
  const [params] = useSearchParams();
  const initialBoard = params.get("board") || "";
  const [boardId, setBoardId] = useState(
    boards.some((board) => board.id === initialBoard) ? initialBoard : "",
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState(false);
  return (
    <>
      <Breadcrumb items={[{ label: "发表主题" }]} />
      <PageHeading
        title="分享你的想法"
        description="一份心得、一个问题，或一闪而过的灵感。"
      />
      <div className="editor-layout">
        <section className="panel editor-panel">
          <div className="form-notice">
            <LockKeyhole size={17} />
            <span>
              发帖服务尚未开放。可以体验编辑与预览，离开页面后内容不会保存。
            </span>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              所属版块
              <select
                value={boardId}
                onChange={(event) => setBoardId(event.target.value)}
                required
              >
                <option value="">请选择一个版块</option>
                {games.map((game) => (
                  <optgroup key={game.id} label={game.name}>
                    {boards
                      .filter((board) => board.gameId === game.id)
                      .map((board) => (
                        <option key={board.id} value={board.id}>
                          {board.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label>
              主题标题
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                placeholder="用一个清晰的标题，开启讨论"
                required
              />
              <span className="field-count">{title.length} / 100</span>
            </label>
            <div className="editor-label">
              <label htmlFor="post-body">正文</label>
              <span>纯文本编辑器</span>
            </div>
            <div className="editor-toolbar">
              <button
                type="button"
                className={!preview ? "active" : ""}
                onClick={() => setPreview(false)}
              >
                <PencilLine size={15} />
                编辑
              </button>
              <button
                type="button"
                className={preview ? "active" : ""}
                onClick={() => setPreview(true)}
              >
                <Eye size={15} />
                预览
              </button>
              <span>{body.length} 字</span>
            </div>
            {preview ? (
              <article className="editor-preview">
                <h2>{title || "未填写标题"}</h2>
                <div className="post-body">
                  {body || "正文预览将在这里显示。"}
                </div>
              </article>
            ) : (
              <textarea
                id="post-body"
                aria-label="正文"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="写下你的想法…"
                rows={14}
                maxLength={20000}
                required
              />
            )}
            <div className="editor-actions">
              <Link
                className="muted-link"
                to={boardId ? `/boards/${boardId}` : "/boards"}
              >
                <ArrowLeft size={15} />
                返回版块
              </Link>
              <button className="button primary" type="submit" disabled>
                <LockKeyhole size={15} />
                发布暂未开放
              </button>
            </div>
          </form>
        </section>
        <aside className="panel writing-tips">
          <PencilLine size={23} />
          <h2>让交流更有意义</h2>
          <h3>一个清楚的标题</h3>
          <p>概括你的问题或发现，让感兴趣的人更容易找到。</p>
          <h3>一个合适的版块</h3>
          <p>攻略、反馈与创作，各有适合它们的交流空间。</p>
          <h3>一点善意与耐心</h3>
          <p>尊重彼此的体验，认真表达，也认真倾听。</p>
        </aside>
      </div>
    </>
  );
}
