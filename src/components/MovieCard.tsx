"use client";

import Link from "next/link";
import { useState } from "react";
import { Movie } from "@/types/movie";
import { useFavorites } from "@/context/FavoritesContext";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const year = movie.releaseDate?.slice(0, 4) ?? "—";
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const rating = movie.voteAverage;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  return (
    <div style={{ position: "relative" }}>

      {/* Bookmark button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        style={{
          position: "absolute", top: "8px", right: "8px", zIndex: 10,
          background: favorited ? "#d4a24c" : "rgba(0,0,0,0.6)",
          border: favorited ? "1px solid #d4a24c" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: "32px", height: "32px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "14px", transition: "all 0.2s",
        }}
        title={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        {favorited ? "★" : "☆"}
      </button>

      <Link href={`/movie/${movie.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative", aspectRatio: "2/3", borderRadius: "10px",
            overflow: "hidden", background: "#1a1a1f", marginBottom: "10px",
          }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={movie.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
            />
          )}

          {/* Dark overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: hovered ? "rgba(13,13,15,0.75)" : "rgba(13,13,15,0)",
            transition: "background 0.3s ease",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "8px",
          }}>
            {hovered && (
              <>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600,
                  color: "#0d0d0f", background: "#d4a24c", borderRadius: "6px",
                  padding: "6px 18px", letterSpacing: "0.05em",
                }}>
                  View Film
                </span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "12px",
                  color: ratingColor, fontWeight: 600,
                }}>
                  ★ {rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          {/* Rating badge — only when not hovered */}
          {!hovered && (
            <div style={{
              position: "absolute", bottom: "10px", left: "10px",
              background: "rgba(0,0,0,0.7)", border: `1px solid ${ratingColor}`,
              borderRadius: "4px", padding: "2px 8px",
              fontFamily: "var(--font-body)", fontSize: "12px",
              fontWeight: 600, color: ratingColor,
            }}>
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 500,
          fontStyle: "italic", color: "#f0ede8", margin: "0 0 3px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {movie.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#6b6358", margin: 0 }}>
          {year}
        </p>
      </Link>
    </div>
  );
}