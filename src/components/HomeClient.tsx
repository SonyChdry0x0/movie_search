"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TiltPoster from "@/components/TiltPoster";

interface Props {
  trending: any[];
  nowPlaying: any[];
  topRated: any[];
  bollywood: any[];
  korean: any[];
  trendingTV: any[];
  popularTV: any[];
}

function MovieRow({
  title,
  reelNumber,
  movies,
  index,
}: {
  title: string;
  reelNumber: number;
  movies: any[];
  index: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [rowHovered, setRowHovered] = useState(false);

  function scrollByPage(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (!movies || movies.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, rotate: -1.5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: "2.75rem", position: "relative" }}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "1rem" }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em",
          color: "#d4a24c", border: "1px solid rgba(212,162,76,0.35)",
          borderRadius: "3px", padding: "2px 7px", flexShrink: 0,
        }}>
          REEL {String(reelNumber).padStart(2, "0")}
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic",
          fontWeight: 500, color: "#f0ede8", margin: 0,
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
      </div>

      <div style={{ position: "relative" }}>
        {rowHovered && (
          <button
            onClick={() => scrollByPage("left")}
            style={{
              position: "absolute", left: 0, top: 0, bottom: "1rem", zIndex: 30,
              width: "44px",
              background: "linear-gradient(to right, #0d0d0f 30%, transparent)",
              border: "none", cursor: "pointer", color: "#f0ede8", fontSize: "20px",
            }}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>
        )}

        <div
          ref={scrollRef}
          style={{
            display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem",
            scrollbarWidth: "none",
          }}
        >
          {movies.map((movie: any) => (
            <TiltPoster key={movie.id} movie={movie} />
          ))}
        </div>

        {rowHovered && (
          <button
            onClick={() => scrollByPage("right")}
            style={{
              position: "absolute", right: 0, top: 0, bottom: "1rem", zIndex: 30,
              width: "44px",
              background: "linear-gradient(to left, #0d0d0f 30%, transparent)",
              border: "none", cursor: "pointer", color: "#f0ede8", fontSize: "20px",
            }}
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>
        )}
      </div>
    </motion.div>
  );
}

const GENRE_MAP: Record<string, number> = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  "Sci-Fi": 878,
  Romance: 10749,
  Thriller: 53,
  Animation: 16,
};
const GENRES = Object.keys(GENRE_MAP);

export default function HomeClient({ trending, nowPlaying, topRated, bollywood, korean, trendingTV, popularTV }: Props) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const featured = trending[0];

  function filterByGenre(movies: any[]) {
    if (!activeGenre) return movies;
    const genreId = GENRE_MAP[activeGenre];
    return movies.filter((m: any) => m.genre_ids?.includes(genreId));
  }

  const rows = [
    { title: "Popular This Week", movies: filterByGenre(trending) },
    { title: "In Cinemas Now", movies: filterByGenre(nowPlaying) },
    { title: "Trending TV Series", movies: trendingTV },
    { title: "Bollywood", movies: filterByGenre(bollywood) },
    { title: "K-Drama & Korean Films", movies: filterByGenre(korean) },
    { title: "Popular TV Shows", movies: popularTV },
    { title: "All Time Top Rated", movies: filterByGenre(topRated) },
  ];

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}
      >
        <img
          src={
            featured.backdrop_path
              ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
              : "https://via.placeholder.com/1600x900/0d0d0f/6b6358?text=Reel+Search"
          }
          alt={featured.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,  transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0f 0%, transparent 55%)" }} />
        {/* film grain vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "4rem", left: 0, right: 0,
            maxWidth: "1200px", margin: "0 auto", padding: "0 2rem",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", color: "#d4a24c", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            ★ Featured Reel
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 700, fontStyle: "italic", color: "#f0ede8", margin: "0 0 1rem", lineHeight: 1, maxWidth: "550px" }}>
            {featured.title}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(240,237,232,0.7)", maxWidth: "420px", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {featured.overview?.slice(0, 130)}...
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href={`/movie/${featured.id}`} style={{
              background: "#d4a24c", color: "#0d0d0f", borderRadius: "6px",
              padding: "0.7rem 1.75rem", fontFamily: "var(--font-body)",
              fontSize: "14px", fontWeight: 700, textDecoration: "none",
            }}>
              ▶ View Film
            </Link>
            <div style={{
              background: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,162,76,0.4)",
              borderRadius: "6px", padding: "0.7rem 1.25rem",
              fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#d4a24c",
            }}>
              ★ {featured.vote_average?.toFixed(1)}
            </div>
          </div>
        </motion.div>
      </motion.div>

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
          {activeGenre && (
            <button
              onClick={() => setActiveGenre(null)}
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px", padding: "6px 16px",
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "#6b6358", cursor: "pointer",
              }}
            >
              ✕ Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Reels */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
        {rows.map((row, i) => (
          <MovieRow
            key={row.title}
            title={row.title}
            reelNumber={i + 1}
            movies={row.movies}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}