import { getTopRated } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";

export default async function TopRatedPage() {
  const movies = await getTopRated();

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2rem 6rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontStyle: "italic", fontWeight: 700, color: "#f0ede8", margin: "0 0 2rem" }}>
          Top Rated
        </h1>
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
}
