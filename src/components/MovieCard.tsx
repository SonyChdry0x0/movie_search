"use client";

import Link from "next/link";
import { Movie } from "@/types/movie";
import { useState } from "react";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const year = movie.releaseDate?.slice(0, 4) ?? "—";
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const rating = movie.voteAverage;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  return (
    <Link href={`/movie/${movie.id}`} style={{ display: "block", textDecoration: "none" }}>
      <div
        style={{ position: "relative", aspectRatio: "2/3", borderRadius: "8px", overflow: "hidden", background: "#1a1a1f", marginBottom: "10px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        )}

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div style={{
          position: "absolute", bottom: "10px", left: "10px",
          background: "rgba(0,0,0,0.7)", border: `1px solid ${ratingColor}`,
          borderRadius: "4px", padding: "2px 8px",
          fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, color: ratingColor,
        }}>
          {rating.toFixed(1)}
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 500, color: "#f0ede8", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {movie.title}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358", margin: 0 }}>
        {year}
      </p>
    </Link>
  );
}