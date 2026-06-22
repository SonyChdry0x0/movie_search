"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieGrid from "./MovieGrid";

interface Props {
  hollywood: any[];
  bollywood: any[];
  nepali: any[];
}

const tabs = [
  { key: "hollywood", label: "🎬 Hollywood" },
  { key: "bollywood", label: "🎭 Bollywood" },
  { key: "nepali", label: "🇳🇵 Nepali" },
];

export default function MoviesClient({ hollywood, bollywood, nepali }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState(searchParams.get("tab") || "hollywood");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActive(tab);
  }, [searchParams]);

  function handleTab(key: string) {
    setActive(key);
    router.push(`/movies?tab=${key}`, { scroll: false });
  }

  const movies =
    active === "hollywood" ? hollywood :
    active === "bollywood" ? bollywood :
    nepali;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTab(tab.key)}
            style={{
              fontFamily: "var(--font-body)", fontSize: "14px",
              padding: "0.5rem 1.25rem", borderRadius: "6px",
              border: active === tab.key ? "1px solid #d4a24c" : "1px solid rgba(255,255,255,0.1)",
              background: active === tab.key ? "rgba(212,162,76,0.15)" : "transparent",
              color: active === tab.key ? "#d4a24c" : "#6b6358",
              cursor: "pointer", transition: "all 0.2s",
              fontWeight: active === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358", marginLeft: "auto", alignSelf: "center" }}>
          {movies.length} films
        </span>
      </div>

      {movies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 0" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "#6b6358" }}>
            No films found
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b6358", marginTop: "0.5rem" }}>
            TMDB may not have enough data for this category yet
          </p>
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}