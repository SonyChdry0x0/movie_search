"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

interface Props {
  trending: any[];
  nowPlaying: any[];
  topRated: any[];
  bollywood: any[];
  korean: any[];
  trendingTV: any[];
  popularTV: any[];
}

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

function MoviePoster({ movie }: { movie: any }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;
  const rating = movie.vote_average ?? 0;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  return (
    <div style={{ position: "relative", flexShrink: 0, width: "150px" }}>
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(mapMovie(movie)); }}
        style={{
          position: "absolute", top: "6px", right: "6px", zIndex: 10,
          background: favorited ? "#d4a24c" : "rgba(0,0,0,0.7)",
          border: favorited ? "1px solid #d4a24c" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: "28px", height: "28px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "12px", transition: "all 0.2s",
        }}
      >
        {favorited ? "★" : "☆"}
      </button>

      <Link href={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ position: "relative", aspectRatio: "2/3", borderRadius: "8px", overflow: "hidden", background: "#1a1a1f" }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={movie.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: hovered ? "rgba(13,13,15,0.7)" : "rgba(13,13,15,0)",
            transition: "background 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {hovered && (
              <span style={{
                background: "#d4a24c", color: "#0d0d0f", borderRadius: "6px",
                padding: "5px 14px", fontFamily: "var(--font-body)",
                fontSize: "12px", fontWeight: 700,
              }}>
                View
              </span>
            )}
          </div>
          {!hovered && (
            <div style={{
              position: "absolute", bottom: "6px", left: "6px",
              background: "rgba(0,0,0,0.75)", border: `1px solid ${ratingColor}`,
              borderRadius: "4px", padding: "1px 6px",
              fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, color: ratingColor,
            }}>
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "13px", fontStyle: "italic",
          color: "#f0ede8", margin: "6px 0 2px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {movie.title}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#6b6358", margin: 0 }}>
          {movie.release_date?.slice(0, 4)}
        </p>
      </Link>
    </div>
  );
}

function MovieRow({ title, movies }: { title: string; movies: any[] }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic",
        fontWeight: 500, color: "#f0ede8", margin: "0 0 1rem 0",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        {title}
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
      </h2>
      <div style={{
        display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem",
        scrollbarWidth: "none",
      }}>
        {movies.map((movie: any) => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation"];

export default function HomeClient({ trending, nowPlaying, topRated, bollywood, korean, trendingTV, popularTV }: Props) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const featured = trending[0];

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
        <img
          src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
          alt={featured.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,15,0.95) 45%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0f 0%, transparent 55%)" }} />

        <div style={{
          position: "absolute", bottom: "4rem", left: 0, right: 0,
          maxWidth: "1200px", margin: "0 auto", padding: "0 2rem",
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", color: "#d4a24c", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            ★ Featured Film
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 700, fontStyle: "italic", color: "#f0ede8", margin: "0 0 1rem", lineHeight: 1, maxWidth: "550px" }}>
            {featured.title}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(240,237,232,0.7)", maxWidth: "420px", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {featured.overview?.slice(0, 130)}...
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a href={`/movie/${featured.id}`} style={{
              background: "#d4a24c", color: "#0d0d0f", borderRadius: "6px",
              padding: "0.7rem 1.75rem", fontFamily: "var(--font-body)",
              fontSize: "14px", fontWeight: 700, textDecoration: "none",
            }}>
              ▶ View Film
            </a>
            <div style={{
              background: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,162,76,0.4)",
              borderRadius: "6px", padding: "0.7rem 1.25rem",
              fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#d4a24c",
            }}>
              ★ {featured.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Genre chips */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem 0" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(activeGenre === genre ? null : genre)}
              style={{
                background: activeGenre === genre ? "#d4a24c" : "rgba(255,255,255,0.05)",
                border: activeGenre === genre ? "1px solid #d4a24c" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px", padding: "6px 16px",
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: activeGenre === genre ? "#0d0d0f" : "#6b6358",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie rows */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
        {/* Movie rows */}
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
  <MovieRow title="Popular This Week" movies={trending} />
  <MovieRow title="In Cinemas Now" movies={nowPlaying} />
  <MovieRow title="Trending TV Series" movies={trendingTV} />
  <MovieRow title="Bollywood" movies={bollywood} />
  <MovieRow title="K-Drama & Korean Films" movies={korean} />
  <MovieRow title="Popular TV Shows" movies={popularTV} />
  <MovieRow title="All Time Top Rated" movies={topRated} />
</div>
      </div>
    </div>
  );
}