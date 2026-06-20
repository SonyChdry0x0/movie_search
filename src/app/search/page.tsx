import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>

        <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358", textDecoration: "none" }}>
          ← Back to archive
        </Link>

        <div style={{ margin: "2rem 0", display: "flex", alignItems: "baseline", gap: "1rem" }}>
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
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}