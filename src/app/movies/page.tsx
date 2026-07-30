import { getTrending, getNowPlaying, getBollywood, getNepali } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import MoviesClient from "@/components/MoviesClient";

export default async function MoviesPage() {
  const [hollywood, nowPlaying, bollywood, nepali] = await Promise.all([
    getTrending(),
    getNowPlaying(),
    getBollywood(),
    getNepali(),
  ]);

  //there we call all these four topic trending,playing,bollywood, nepali which we want to display in our page 

  const hollywoodAll = [...hollywood, ...nowPlaying].filter(
    (m, i, arr) => arr.findIndex((x: any) => x.id === m.id) === i
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2rem 6rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontStyle: "italic", fontWeight: 700, color: "#f0ede8", margin: "0 0 2rem" }}>
          Movies
        </h1>
        <MoviesClient
          hollywood={hollywoodAll}
          bollywood={bollywood}
          nepali={nepali}
        />
      </div>
    </div>
  );
}

//how to open the font display should be stored in this page .