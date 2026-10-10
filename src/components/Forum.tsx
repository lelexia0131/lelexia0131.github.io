import {
  ArrowDownUp,
  ArrowRight,
  Bug,
  ChevronRight,
  Compass,
  Grid2X2,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Pin,
  Shapes,
  Shield,
  Sparkles,
  Swords,
  Tent,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { useForum } from "../context";
import { games } from "../data/games";
import type { Board, Topic } from "../types";

export const boardIcons = {
  announcement: Megaphone,
  discussion: MessagesSquare,
  strategy: Swords,
  feedback: Bug,
  camp: Tent,
  creation: Shapes,
};
export function formatDate(value: string, time = false) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    ...(time ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}),
  }).format(new Date(value));
}
export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="面包屑">
      <Link to="/">首页</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={13} />
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function EmptyState({
  title = "这里还没有主题",
  description = "换个版块看看，或浏览最新主题。",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="empty-state">
      <MessagesSquare size={32} />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="text-link" to="/latest">
        浏览最新主题 <ArrowRight size={14} />
      </Link>
    </div>
  );
}
export function BoardGroup({ gameId }: { gameId: Board["gameId"] }) {
  const { boards, topics, replies } = useForum();
  const game = games.find((item) => item.id === gameId)!;
  const GameIcon = gameId === "fiverealms" ? Swords : Grid2X2;
  return (
    <section className={`panel board-group ${gameId}`}>
      <div className="game-heading">
        <div className="game-symbol">
          <GameIcon size={23} />
        </div>
        <div>
          <h2>
            {game.name} <span>{game.english}</span>
          </h2>
          <p>{game.tagline}</p>
        </div>
        <span className="board-count">4 个版块</span>
      </div>
      <div className="board-grid">
        {boards
          .filter((board) => board.gameId === gameId)
          .map((board) => {
            const Icon = boardIcons[board.icon];
            const boardTopics = topics.filter(
              (topic) => topic.boardId === board.id,
            );
            const replyCount = replies.filter((reply) =>
              boardTopics.some((topic) => topic.id === reply.topicId),
            ).length;
            return (
              <Link
                key={board.id}
                to={`/boards/${board.id}`}
                className="board-card"
              >
                <div className="board-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </div>
                <div className="board-info">
                  <h3>
                    {board.name}
                    <ChevronRight size={14} />
                  </h3>
                  <p>{board.description}</p>
                  <div className="board-stats">
                    <span>
                      <b>{boardTopics.length}</b> 主题
                    </span>
                    <span>
                      <b>{replyCount}</b> 回复
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
}

export function TopicList({
  topics,
  title,
  more,
  compact = false,
}: {
  topics: Topic[];
  title?: string;
  more?: string;
  compact?: boolean;
}) {
  const { boards, users, replies } = useForum();
  const [sort, setSort] = useState("latest");
  const sorted = [...topics].sort((a, b) => {
    if (sort === "replies")
      return (
        replies.filter((r) => r.topicId === b.id).length -
          replies.filter((r) => r.topicId === a.id).length ||
        b.createdAt.localeCompare(a.createdAt)
      );
    if (sort === "views")
      return b.views - a.views || b.createdAt.localeCompare(a.createdAt);
    return sort === "active"
      ? b.lastReplyAt.localeCompare(a.lastReplyAt)
      : b.createdAt.localeCompare(a.createdAt);
  });
  return (
    <section className="panel topic-panel">
      <div className="section-heading">
        <h2>
          {title || "全部主题"}{" "}
          <span className="count-chip">{topics.length}</span>
        </h2>
        {more ? (
          <Link className="muted-link" to={more}>
            查看全部 <ArrowRight size={14} />
          </Link>
        ) : (
          <label className="sort-control">
            <ArrowDownUp size={14} />
            <select
              aria-label="主题排序"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="latest">最新发布</option>
              <option value="active">最后回复</option>
              <option value="replies">回复最多</option>
              <option value="views">浏览最多</option>
            </select>
          </label>
        )}
      </div>
      {!topics.length ? (
        <EmptyState />
      ) : (
        <div className={`topic-table ${compact ? "compact" : ""}`}>
          <div className="topic-table-head">
            <span>主题</span>
            <span>回复 / 浏览</span>
            <span>最后回复</span>
          </div>
          {(compact ? sorted.slice(0, 5) : sorted).map((topic) => {
            const board = boards.find((item) => item.id === topic.boardId)!;
            const user = users.find((item) => item.id === topic.authorId)!;
            const topicReplies = replies
              .filter((item) => item.topicId === topic.id)
              .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
            const lastUser = users.find(
              (item) => item.id === topicReplies.at(-1)?.authorId,
            );
            return (
              <article className="topic-row" key={topic.id}>
                <span
                  className={`topic-mark ${topic.featured ? "featured" : ""}`}
                >
                  {topic.featured ? (
                    <Trophy size={18} />
                  ) : topic.pinned ? (
                    <Pin size={18} />
                  ) : (
                    <MessageCircle size={18} />
                  )}
                </span>
                <div className="topic-main">
                  <Link className="topic-title" to={`/topics/${topic.id}`}>
                    {topic.title}
                  </Link>
                  <div className="topic-meta">
                    <Link
                      className={`board-label ${board.gameId}`}
                      to={`/boards/${board.id}`}
                    >
                      {games.find((g) => g.id === board.gameId)!.name} ·{" "}
                      {board.name}
                    </Link>
                    <Link to={`/users/${user.id}`}>{user.nickname}</Link>
                    <time dateTime={topic.createdAt}>
                    {formatDate(topic.createdAt, !compact)}
                    </time>
                    <span className="demo-tag">演示</span>
                  </div>
                </div>
                <div className="topic-numbers">
                  <strong>{topicReplies.length}</strong>
                  <span> / {topic.views}</span>
                </div>
                <div className="topic-last">
                  <span>
                    {topicReplies.length
                      ? formatDate(topic.lastReplyAt, true)
                      : "暂无回复"}
                  </span>
                  {lastUser && (
                    <Link to={`/users/${lastUser.id}`}>
                      {lastUser.nickname}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function Sidebar() {
  const { topics, boards } = useForum();
  return (
    <aside className="sidebar">
      <section className="panel welcome-card">
        <span className="eyebrow">A PLACE FOR PLAYERS</span>
        <div className="sidebar-emblem">
          <MessagesSquare size={31} strokeWidth={1.4} />
          <Sparkles size={17} />
        </div>
        <h2>因为热爱，相聚于此。</h2>
        <p>
          交流每一个灵感，
          <br />
          记录每一次探索。
        </p>
        <Link className="button primary wide" to="/new">
          发起一个话题 <ArrowRight size={16} />
        </Link>
        <span className="quiet-note">当前为演示社区，发帖暂未开放</span>
      </section>
      <section className="panel sidebar-section">
        <h2>
          <Compass size={17} /> 社区导航
        </h2>
        <Link to="/boards">
          <Grid2X2 size={17} />
          全部版面
          <ChevronRight size={14} />
        </Link>
        <Link to="/latest">
          <MessageCircle size={17} />
          最新讨论
          <ChevronRight size={14} />
        </Link>
        <Link to="/featured">
          <Trophy size={17} />
          精华内容
          <ChevronRight size={14} />
        </Link>
      </section>
      <section className="panel sidebar-section guide-card">
        <h2>
          <Shield size={17} /> 交流小约定
        </h2>
        <p>友善交流，尊重不同的声音。</p>
        <p>攻略与解法，请提前标注剧透。</p>
        <p>反馈问题，记得附上复现步骤。</p>
        <Link className="text-link" to="/topics/feedback-guide">
          查看反馈指南 <ArrowRight size={14} />
        </Link>
      </section>
      <div className="demo-summary">
        <span className="status-dot" /> 前端演示版
        <div>
          <span>{boards.length} 个版块</span>
          <span>{topics.length} 篇示例主题</span>
        </div>
        <p>内容与统计均为演示数据</p>
      </div>
    </aside>
  );
}

export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="columns">
      <div className="main-column">{children}</div>
      <Sidebar />
    </div>
  );
}
