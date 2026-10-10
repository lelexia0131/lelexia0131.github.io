import type { GameId } from "../types";

export const games: {
  id: GameId;
  name: string;
  english: string;
  tagline: string;
}[] = [
  {
    id: "fiverealms",
    name: "五域纷争",
    english: "FIVE REALMS",
    tagline: "在五域之间，找到你的策略。",
  },
  {
    id: "wildgrid",
    name: "野格",
    english: "WILDGRID",
    tagline: "方格之内，探索无限可能。",
  },
];
