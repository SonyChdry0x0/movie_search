"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieGrid from "./MovieGrid";

interface Props {
  english: any[];
  hindi: any[];
  kdrama: any[];
  nepali: any[];
}

const tabs = [
  { key: "english", label: "📺 English Shows" },
  { key: "hindi", label: "🎭 Hindi Serials" },
  { key: "kdrama", label: "🇰🇷 K-Drama" },
  { key: "nepali", label: "🇳🇵 Nepali TV" },
];

export default function TVClient({ english, hindi, kdrama, nepali }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState(searchParams.get("tab") || "english");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActive(tab);
  }, [searchParams]);

  function handleTab(key: string) {
    setActive(key);
    router.push(`/tv?tab=${key}`, { scroll: false });
  }

  const shows =
    active === "english" ? english :
    active === "hindi" ? hindi :
    active === "kdrama" ? kdrama :
    nepali;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", flexWrap: "wrap" }}>
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
          {shows.length} shows
        </span>
      </div>

      {shows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 0" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "#6b6358" }}>
            No shows found
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b6358", marginTop: "0.5rem" }}>
            TMDB may not have enough data for this category yet
          </p>
        </div>
      ) : (
        <MovieGrid movies={shows} />
      )}
    </div>
  );
}