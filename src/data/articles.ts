export interface Article {
  slug: string;
  title: string;
  date: string;
  category: "开发日志" | "技术文章" | "版本记录";
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
}

// Add only real, authored articles. Release announcements live with each project.
export const articles: Article[] = [];
