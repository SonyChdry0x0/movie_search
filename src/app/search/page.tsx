import { searchMovies } from "@/lib/tmdb";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const movies = await searchMovies(query);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2rem 6rem" }}>

        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontStyle: "italic", fontWeight: 500, margin: 0 }}>
            "{query}"
          </h1>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358" }}>
            {movies.length} results
          </span>
        </div>

        {movies.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "#6b6358" }}>
              No films found for "{query}"
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b6358", marginTop: "0.5rem" }}>
              Try a different title or keyword
            </p>
            <Link href="/" style={{
              display: "inline-block", marginTop: "1.5rem",
              background: "#d4a24c", borderRadius: "6px",
              padding: "0.6rem 1.5rem", fontFamily: "var(--font-body)",
              fontSize: "14px", fontWeight: 600, color: "#0d0d0f",
              textDecoration: "none",
            }}>
              Back to home →
            </Link>
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
}