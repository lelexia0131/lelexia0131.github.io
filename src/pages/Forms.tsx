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
        <h1>{register ? "注册" : "登录"}</h1>
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
      <PageHeading title="发表主题" />
      <div className="editor-layout">
        <section className="panel editor-panel">
          <div className="form-notice">
            <LockKeyhole size={17} />
            <span>仅供编辑预览，内容不会保存。</span>
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
      </div>
    </>
  );
}
