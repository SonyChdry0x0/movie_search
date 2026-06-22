import { getTrending, getNowPlaying, getTopRated, getBollywood, getKorean, getTrendingTV, getPopularTV } from "@/lib/tmdb";
import HomeClient from "@/components/HomeClient";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const [trending, nowPlaying, topRated, bollywood, korean, trendingTV, popularTV] = await Promise.all([
    getTrending(),
    getNowPlaying(),
    getTopRated(),
    getBollywood(),
    getKorean(),
    getTrendingTV(),
    getPopularTV(),
  ]);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <HomeClient
        trending={trending}
        nowPlaying={nowPlaying}
        topRated={topRated}
        bollywood={bollywood}
        korean={korean}
        trendingTV={trendingTV}
        popularTV={popularTV}
      />
    </div>
  );
}