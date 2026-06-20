import { getTrending } from "@/lib/tmdb";
import HomeClient from "@/components/HomeClient";
import Link from "next/link";

export default async function Home() {
  const movies = await getTrending();

  return (
    <div className="min-h-screen" style={{ background: "#0d0d0f", color: "#f0ede8" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "3rem 0 2.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", color: "#6b6358", textTransform: "uppercase", marginBottom: "1rem" }}>
            Vol. 01 — Now Showing
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500, fontStyle: "italic", lineHeight: 1, color: "#f0ede8", margin: 0 }}>
              Reel Search
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#6b6358", maxWidth: "320px", lineHeight: 1.6, margin: 0 }}>
                A small archive for finding the film you didn&apos;t know you were looking for.
              </p>
              <Link href="/favorites" style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "#d4a24c", textDecoration: "none", whiteSpace: "nowrap",
                border: "1px solid rgba(212,162,76,0.3)",
                padding: "0.4rem 1rem", borderRadius: "6px",
              }}>
                ★ Favorites
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search + Grid — handled client side */}
      <HomeClient trending={movies} />
    </div>
  );
}