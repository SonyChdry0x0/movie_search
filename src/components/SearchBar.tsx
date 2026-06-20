"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Props {
  onResults: (results: any[], query: string) => void;
  onClear: () => void;
}

export default function SearchBar({ onResults, onClear }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 3) {
      onClear();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        onResults(data.results ?? [], query);
      } catch {
        onClear();
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSearch() {
    if (query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div style={{ position: "relative", maxWidth: "600px" }}>
      <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "18px", pointerEvents: "none" }}>🎬</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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
  onClick={handleSearch}
  style={{
    position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
    background: "#d4a24c", border: "none", borderRadius: "4px",
    padding: "0.5rem 1.25rem", fontFamily: "var(--font-body)",
    fontSize: "13px", fontWeight: 600, color: "#0d0d0f", cursor: "pointer",
  }}
>
  Search
</button>
    </div>
  );
}