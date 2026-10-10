import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "./services/api";
import type { ForumData } from "./types";

const ForumContext = createContext<ForumData | null>(null);
export function ForumProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ForumData | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    api
      .getForum()
      .then((value) => {
        if (active) setData(value);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);
  if (error)
    return (
      <div className="standalone">
        <h1>内容加载失败</h1>
        <button onClick={() => window.location.reload()}>重新加载</button>
      </div>
    );
  if (!data)
    return (
      <div className="standalone" role="status">
        正在加载论坛…
      </div>
    );
  return <ForumContext.Provider value={data}>{children}</ForumContext.Provider>;
}
export function useForum() {
  const data = useContext(ForumContext);
  if (!data) throw new Error("ForumProvider is required");
  return data;
}
