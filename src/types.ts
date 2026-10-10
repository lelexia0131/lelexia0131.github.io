export type GameId = "fiverealms" | "wildgrid";

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  role: string;
}

export interface Board {
  id: string;
  gameId: GameId;
  name: string;
  description: string;
  icon:
    | "announcement"
    | "discussion"
    | "strategy"
    | "feedback"
    | "camp"
    | "creation";
}

export interface Topic {
  id: string;
  boardId: string;
  authorId: string;
  title: string;
  createdAt: string;
  lastReplyAt: string;
  views: number;
  pinned?: boolean;
  featured?: boolean;
  tags: string[];
}

export interface Post {
  id: string;
  topicId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface Reply extends Post {
  floor: number;
}
export interface TopicDraft {
  title: string;
  boardId: string;
  body: string;
}
export interface ForumData {
  users: User[];
  boards: Board[];
  topics: Topic[];
  posts: Post[];
  replies: Reply[];
}
