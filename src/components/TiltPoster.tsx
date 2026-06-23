"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

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

export default function TiltPoster({ movie }: { movie: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;
  const rating = movie.vote_average ?? 0;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 to 1
    const py = (e.clientY - rect.top) / rect.height; // 0 to 1
    const rotateY = (px - 0.5) * 18; // max ~9deg either side
    const rotateX = (0.5 - py) * 18;
    setTilt({ x: rotateX, y: rotateY });
  }

  function handleLeave() {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      style={{
        position: "relative",
        flexShrink: 0,
        width: "150px",
        zIndex: hovered ? 20 : 1,
        perspective: "600px",
      }}
    >
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
          ref={cardRef}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          style={{
            position: "relative",
            aspectRatio: "2/3",
            borderRadius: "6px",
            overflow: "hidden",
            background: "#1a1714",
            transformStyle: "preserve-3d",
            transform: hovered
              ? `scale(1.12) translateY(-8px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : "scale(1) rotateX(0deg) rotateY(0deg)",
            transition: hovered ? "transform 0.05s linear" : "transform 0.4s ease",
            boxShadow: hovered
              ? `${-tilt.y / 2}px ${12 - tilt.x / 2}px 30px rgba(212,162,76,0.25), 0 20px 40px rgba(0,0,0,0.6)`
              : "none",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={movie.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {/* Light sheen that follows tilt */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: hovered
                ? `linear-gradient(${105 + tilt.y * 2}deg, rgba(212,162,76,0.18) 0%, transparent 50%)`
                : "transparent",
              pointerEvents: "none",
              transition: "background 0.1s linear",
            }}
          />

          <div style={{
            position: "absolute", inset: 0,
            background: hovered ? "rgba(13,13,15,0.35)" : "rgba(13,13,15,0)",
            transition: "background 0.25s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {hovered && (
              <span style={{
                background: "#d4a24c", color: "#0d0d0f", borderRadius: "4px",
                padding: "5px 14px", fontFamily: "var(--font-body)",
                fontSize: "12px", fontWeight: 700,
                transform: "translateZ(20px)",
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
          color: "#f0ede8", margin: "8px 0 2px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {movie.title}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#6b6358", margin: 0 }}>
          {movie.release_date?.slice(0, 4)}
        </p>
      </Link>
    </motion.div>
  );
}