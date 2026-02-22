type Article = {
  query: string;
  title: string;
  summary: string;
  url: string;
  published_at: string;
  publisher: {
    title: string;
  };
};

import { unstable_cache } from "next/cache";

export function getNews(query: string) {
  return unstable_cache(async () => {
    const queryEncoded = encodeURIComponent(query);
    const res = await fetch(
      `https://resynk-backend.arinji.com/news/?search=${queryEncoded}`,
    );
    console.log(res);
    const data = await res.json();
    return data.results as Article[];
  }, ["news-search", query])();
}
