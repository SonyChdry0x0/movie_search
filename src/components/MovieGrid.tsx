"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function MovieGrid({ movies }: { movies: any[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1.5rem" }}>
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieCard({ movie }: { movie: any }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);
  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date)?.slice(0, 4);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;
  const rating = movie.vote_average ?? 0;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite({
            id: movie.id, title,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date || movie.first_air_date,
            voteAverage: rating,
            overview: movie.overview,
            genres: [],
          });
        }}
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
          style={{ position: "relative", aspectRatio: "2/3", borderRadius: "8px", overflow: "hidden", background: "#1a1a1f", marginBottom: "8px" }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
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
                background: "#d4a24c", color: "#0d0d0f",
                borderRadius: "6px", padding: "5px 14px",
                fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 700,
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
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontStyle: "italic", color: "#f0ede8", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#6b6358", margin: 0 }}>
          {year}
        </p>
      </Link>
    </div>
  );
}
