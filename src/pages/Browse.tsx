import {
  ArrowRight,
  ChevronRight,
  Grid2X2,
  Megaphone,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useForum } from "../context";
import { games } from "../data/games";
import {
  BoardGroup,
  Breadcrumb,
  Columns,
  EmptyState,
  PageHeading,
  TopicList,
  boardIcons,
} from "../components/Forum";

export function HomePage() {
  const { topics } = useForum();
  return (
    <>
      <div className="home-intro">
        <div>
          <span className="eyebrow">LELEXIA COMMUNITY</span>
          <h1>
            每一个世界，都值得一起探索<span>。</span>
          </h1>
          <p>欢迎来到 Lelexia 作品论坛。聊游戏，找攻略，分享你的奇思妙想。</p>
        </div>
        <span className="intro-decoration" aria-hidden="true">
          <Grid2X2 size={49} strokeWidth={1} />
          <Sparkles size={25} strokeWidth={1.4} />
        </span>
      </div>
      <div className="announcement">
        <span>
          <Megaphone size={17} />
          <b>社区公告</b>
        </span>
        <Link to="/topics/welcome">
          论坛正在建设中，当前内容与统计均为演示数据。
        </Link>
        <ChevronRight size={16} />
      </div>
      <Columns>
        <div className="section-caption">
          <h2>
            <Grid2X2 size={18} />
            作品版块
          </h2>
          <Link to="/boards">
            全部版面 <ArrowRight size={14} />
          </Link>
        </div>
        <BoardGroup gameId="fiverealms" />
        <BoardGroup gameId="wildgrid" />
        <TopicList topics={topics} title="最新主题" more="/latest" compact />
      </Columns>
    </>
  );
}

export function BoardsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "版面列表" }]} />
      <PageHeading
        title="版面列表"
        description="两个游戏世界，八个交流角落。找到你感兴趣的话题。"
      />
      <Columns>
        <BoardGroup gameId="fiverealms" />
        <BoardGroup gameId="wildgrid" />
      </Columns>
    </>
  );
}

export function BoardPage() {
  const { boardId } = useParams();
  const { boards, topics } = useForum();
  const board = boards.find((item) => item.id === boardId);
  if (!board) return <NotFoundPage />;
  const game = games.find((item) => item.id === board.gameId)!;
  const Icon = boardIcons[board.icon];
  return (
    <>
      <Breadcrumb
        items={[
          { label: "版面列表", to: "/boards" },
          { label: game.name },
          { label: board.name },
        ]}
      />
      <Columns>
        <section className={`panel board-banner ${board.gameId}`}>
          <div className="board-icon">
            <Icon size={28} />
          </div>
          <div>
            <span className="eyebrow">{game.english}</span>
            <h1>{board.name}</h1>
            <p>{board.description}</p>
          </div>
          <Link className="button primary" to={`/new?board=${board.id}`}>
            <Plus size={16} />
            发表主题
          </Link>
        </section>
        <nav className="board-tabs" aria-label="切换子版块">
          {boards
            .filter((item) => item.gameId === board.gameId)
            .map((item) => (
              <Link
                className={item.id === boardId ? "active" : ""}
                key={item.id}
                to={`/boards/${item.id}`}
              >
                {item.name}
              </Link>
            ))}
        </nav>
        <TopicList
          key={board.id}
          topics={topics.filter((item) => item.boardId === boardId)}
        />
      </Columns>
    </>
  );
}

export function FeedPage({ featured = false }: { featured?: boolean }) {
  const { topics, boards } = useForum();
  const [game, setGame] = useState("all");
  const title = featured ? "精华内容" : "最新主题";
  const filtered = topics.filter(
    (topic) =>
      (!featured || topic.featured) &&
      (game === "all" ||
        boards.find((board) => board.id === topic.boardId)?.gameId === game),
  );
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <PageHeading
        title={title}
        description={
          featured
            ? "值得慢慢读的策略笔记与探索心得。"
            : "发现作品社区里正在发生的讨论。"
        }
        action={
          <Link className="button primary" to="/new">
            <Plus size={16} />
            发表主题
          </Link>
        }
      />
      <Columns>
        <div className="filter-tabs" aria-label="筛选游戏">
          {[{ id: "all", name: "全部作品" }, ...games].map((item) => (
            <button
              key={item.id}
              className={game === item.id ? "active" : ""}
              onClick={() => setGame(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <TopicList
          key={featured ? "featured" : "latest"}
          topics={filtered}
          title={title}
        />
      </Columns>
    </>
  );
}

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const boardId = params.get("board") || "";
  const [input, setInput] = useState(query);
  const { topics, posts, boards } = useForum();
  useEffect(() => {
    setInput(query);
  }, [query]);
  const normalized = query.trim().toLocaleLowerCase();
  const results = topics.filter(
    (topic) =>
      (!boardId || topic.boardId === boardId) &&
      (topic.title.toLocaleLowerCase().includes(normalized) ||
        posts.some(
          (post) =>
            post.topicId === topic.id &&
            post.body.toLocaleLowerCase().includes(normalized),
        )),
  );
  return (
    <>
      <Breadcrumb items={[{ label: "搜索" }]} />
      <PageHeading
        title="发现你感兴趣的讨论"
        description="搜索主题标题与正文，寻找攻略、灵感和答案。"
      />
      <Columns>
        <section className="panel search-panel">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setParams({
                q: input.trim(),
                ...(boardId ? { board: boardId } : {}),
              });
            }}
          >
            <label className="search-input">
              <Search size={20} />
              <input
                aria-label="搜索关键词"
                placeholder="输入关键词，如：卡牌、营地、地图"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <button className="button primary" type="submit">
                搜索
              </button>
            </label>
            <label className="search-filter">
              搜索范围
              <select
                aria-label="搜索范围"
                value={boardId}
                onChange={(event) =>
                  setParams({
                    q: query,
                    ...(event.target.value
                      ? { board: event.target.value }
                      : {}),
                  })
                }
              >
                <option value="">全部版块</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {games.find((g) => g.id === board.gameId)!.name} ·{" "}
                    {board.name}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </section>
        {normalized ? (
          <TopicList topics={results} title={`“${query}” 的搜索结果`} />
        ) : (
          <section className="panel">
            <EmptyState
              title="从一个关键词开始"
              description="试试“卡牌”“营地”或“地图”，搜索演示主题。"
            />
          </section>
        )}
      </Columns>
    </>
  );
}

export function NotFoundPage() {
  return (
    <div className="panel not-found">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>这个角落还没有内容</h1>
      <p>页面可能不存在，回到版面列表继续探索吧。</p>
      <Link className="button primary" to="/boards">
        返回版面列表 <ArrowRight size={16} />
      </Link>
    </div>
  );
}
