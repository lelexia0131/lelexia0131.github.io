import { demoData } from "../data/demo";
import type { ForumData, Reply, Topic, TopicDraft, User } from "../types";

// Replace this adapter with HTTPS requests to FastAPI when the backend is ready.
// UI components depend on this contract, never on the demo data source.
export interface ForumApi {
  getForum(): Promise<ForumData>;
  login(input: { email: string; password: string }): Promise<User>;
  register(input: {
    nickname: string;
    email: string;
    password: string;
  }): Promise<User>;
  createTopic(input: TopicDraft): Promise<Topic>;
  createReply(topicId: string, body: string): Promise<Reply>;
}

export const SERVER_UNAVAILABLE = "服务尚未开放，当前为前端演示。";
async function unavailable(): Promise<never> {
  throw new Error(SERVER_UNAVAILABLE);
}

export const api: ForumApi = {
  getForum: async () => demoData,
  login: unavailable,
  register: unavailable,
  createTopic: unavailable,
  createReply: unavailable,
};
