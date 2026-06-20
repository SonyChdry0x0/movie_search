import { getTrending } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = await getTrending();

  return (
    <div className="min-h-screen" style={{ background: "#0d0d0f", color: "#f0ede8" }}>
      {/* Hero */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "3rem 0 2.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", color: "#6b6358", textTransform: "uppercase", marginBottom: "1rem" }}>
            Vol. 01 — Now Showing
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500, fontStyle: "italic", lineHeight: 1, color: "#f0ede8", margin: 0 }}>
              Reel Search
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#6b6358", maxWidth: "320px", lineHeight: 1.6, margin: 0 }}>
              A small archive for finding the film you didn&apos;t know you were looking for.
            </p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ position: "relative", maxWidth: "600px" }}>
          <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "18px", pointerEvents: "none" }}>🎬</span>
          <input
            type="text"
            placeholder="Search by title, genre, year..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              padding: "1rem 7rem 1rem 3.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "#f0ede8",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#d4a24c",
              border: "none",
              borderRadius: "4px",
              padding: "0.5rem 1.25rem",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0d0d0f",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Grid */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 500, fontStyle: "italic", color: "#f0ede8", margin: 0 }}>
            Trending This Week
          </h2>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={{
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              posterPath: movie.poster_path,
              backdropPath: movie.backdrop_path,
              releaseDate: movie.release_date,
              voteAverage: movie.vote_average,
              genres: [],
            }} />
          ))}
        </div>
      </main>
    </div>
  );
}