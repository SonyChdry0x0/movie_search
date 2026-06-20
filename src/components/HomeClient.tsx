"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

interface Props {
  trending: any[];
}

export default function HomeClient({ trending }: Props) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.length >= 3;
  const featured = trending[0];
  const displayMovies = isSearching ? searchResults : trending;
  const label = isSearching ? `Results for "${searchQuery}"` : "Trending This Week";

  function mapMovie(movie: any) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genres: [],
    };
  }

  return (
    <div>
      {!isSearching && featured && (
        <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
          <img
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={featured.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,15,0.95) 40%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0f 0%, transparent 60%)" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", paddingTop: "80px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", color: "#d4a24c", textTransform: "uppercase", marginBottom: "1rem" }}>
              Featured Film
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, fontStyle: "italic", color: "#f0ede8", margin: "0 0 1rem", lineHeight: 1, maxWidth: "600px" }}>
              {featured.title}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(240,237,232,0.7)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2rem" }}>
              {featured.overview?.slice(0, 150)}
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <a href={`/movie/${featured.id}`} style={{ background: "#d4a24c", color: "#0d0d0f", borderRadius: "6px", padding: "0.75rem 2rem", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                View Film
              </a>
              <div style={{ border: "1px solid rgba(212,162,76,0.4)", borderRadius: "6px", padding: "2px 12px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#d4a24c" }}>
                {featured.vote_average?.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      )}

      
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 500, fontStyle: "italic", color: "#f0ede8", margin: 0 }}>
            {label}
          </h2>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          {isSearching && (
            <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358" }}>
              {searchResults.length} results
            </span>
          )}
        </div>

        {isSearching && searchResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "#6b6358" }}>
              No films found
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {displayMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={mapMovie(movie)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
