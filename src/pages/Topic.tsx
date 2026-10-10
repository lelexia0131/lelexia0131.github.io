import {
  ArrowLeft,
  Eye,
  LockKeyhole,
  MessageSquare,
  Pin,
  Trophy,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForum } from "../context";
import { Breadcrumb, formatDate, TopicList } from "../components/Forum";
import { games } from "../data/games";
import { NotFoundPage } from "./Browse";
import type { Post } from "../types";

function Floor({
  post,
  floor,
  authorId,
}: {
  post: Post;
  floor: number;
  authorId: string;
}) {
  const { users } = useForum();
  const user = users.find((item) => item.id === post.authorId)!;
  return (
    <article className="panel post-floor">
      <aside className="post-author">
        <Link
          className={`avatar ${user.id === "demo-player" ? "sage" : ""}`}
          to={`/users/${user.id}`}
        >
          {user.avatar}
        </Link>
        <Link className="author-name" to={`/users/${user.id}`}>
          {user.nickname}
        </Link>
        <span className="role-tag">{user.role}</span>
        {user.id === authorId && <span className="op-tag">楼主</span>}
      </aside>
      <div className="post-content">
        <div className="post-heading">
          <time dateTime={post.createdAt}>
            发表于 {formatDate(post.createdAt, true)}
          </time>
          <span>{floor === 1 ? "1 楼 · 楼主" : `${floor} 楼`}</span>
        </div>
        <div className="post-body">{post.body}</div>
      </div>
    </article>
  );
}

export function TopicPage() {
  const { topicId } = useParams();
  const { topics, boards, posts, replies } = useForum();
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) return <NotFoundPage />;
  const board = boards.find((item) => item.id === topic.boardId)!;
  const post = posts.find((item) => item.topicId === topic.id)!;
  const topicReplies = replies
    .filter((item) => item.topicId === topicId)
    .sort((a, b) => a.floor - b.floor);
  return (
    <>
      <Breadcrumb
        items={[
          { label: "版面列表", to: "/boards" },
          {
            label: `${games.find((g) => g.id === board.gameId)!.name} · ${board.name}`,
            to: `/boards/${board.id}`,
          },
          { label: "主题详情" },
        ]}
      />
      <section className="panel topic-detail-heading">
        <div className="detail-tags">
          <span className="demo-tag">演示主题</span>
          {topic.pinned && (
            <span>
              <Pin size={13} />
              版块指南
            </span>
          )}
          {topic.featured && (
            <span className="orange">
              <Trophy size={13} />
              精华
            </span>
          )}
          {topic.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h1>{topic.title}</h1>
        <div className="detail-meta">
          <span>
            <MessageSquare size={15} />
            {topicReplies.length} 回复
          </span>
          <span>
            <Eye size={15} />
            {topic.views} 浏览（演示）
          </span>
          <Link to={`/boards/${board.id}`}>
            <ArrowLeft size={14} />
            返回版块
          </Link>
        </div>
      </section>
      <Floor post={post} floor={1} authorId={topic.authorId} />
      <div className="reply-heading">
        <h2>
          全部回复 <span>{topicReplies.length}</span>
        </h2>
        <span>按楼层顺序</span>
      </div>
      {topicReplies.map((reply) => (
        <Floor
          key={reply.id}
          post={reply}
          floor={reply.floor}
          authorId={topic.authorId}
        />
      ))}
      {!topicReplies.length && (
        <div className="panel no-replies">这里还没有演示回复。</div>
      )}
      <section className="panel reply-locked">
        <LockKeyhole size={21} />
        <div>
          <h3>回复功能尚未开放</h3>
        </div>
        <button className="button" disabled>
          发表回复
        </button>
      </section>
    </>
  );
}

export function ProfilePage() {
  const { userId } = useParams();
  const { users, topics, replies } = useForum();
  const user = users.find((item) => item.id === userId);
  if (!user) return <NotFoundPage />;
  const userTopics = topics.filter((topic) => topic.authorId === user.id);
  return (
    <>
      <Breadcrumb items={[{ label: "个人主页" }]} />
      <section className="panel profile-card">
        <div className="profile-cover" />
        <div className="profile-info">
          <div className={`avatar ${user.id === "demo-player" ? "sage" : ""}`}>
            {user.avatar}
          </div>
          <div>
            <span className="role-tag">{user.role}</span>
            <h1>{user.nickname}</h1>
            <p>{user.bio}</p>
            <span className="muted">演示加入日期：{user.joinedAt}</span>
          </div>
          <div className="profile-stats">
            <div>
              <b>{userTopics.length}</b>
              <span>主题</span>
            </div>
            <div>
              <b>
                {replies.filter((reply) => reply.authorId === user.id).length}
              </b>
              <span>回复</span>
            </div>
          </div>
        </div>
      </section>
      <TopicList topics={userTopics} title="发布的主题" />
    </>
  );
}
