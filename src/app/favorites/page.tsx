"use client";

import { useFavorites } from "@/context/FavoritesContext";
import MovieGrid from "@/components/MovieGrid";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2rem 6rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontStyle: "italic", fontWeight: 700, margin: 0 }}>
            Your Favorites
          </h1>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358" }}>
            {favorites.length} saved
          </span>
        </div>

        {favorites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "#6b6358" }}>
              No favorites yet
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6b6358", marginTop: "0.5rem" }}>
              Click the ☆ on any film to save it here
            </p>
            <Link href="/" style={{
              display: "inline-block", marginTop: "1.5rem",
              background: "#d4a24c", borderRadius: "6px",
              padding: "0.6rem 1.5rem", fontFamily: "var(--font-body)",
              fontSize: "14px", fontWeight: 600, color: "#0d0d0f",
              textDecoration: "none",
            }}>
              Browse films →
            </Link>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </div>
  );
}