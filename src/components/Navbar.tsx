"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [moviesOpen, setMoviesOpen] = useState(false);
  const [tvOpen, setTvOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const moviesRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moviesRef.current && !moviesRef.current.contains(e.target as Node)) {
        setMoviesOpen(false);
      }
      if (tvRef.current && !tvRef.current.contains(e.target as Node)) {
        setTvOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const movieDropdownItems = [
    { label: "🎬 Hollywood", href: "/movies?tab=hollywood" },
    { label: "🎭 Bollywood", href: "/movies?tab=bollywood" },
    { label: "🇳🇵 Nepali", href: "/movies?tab=nepali" },
  ];

  const tvDropdownItems = [
    { label: "📺 English Shows", href: "/tv?tab=english" },
    { label: "🎭 Hindi Serials", href: "/tv?tab=hindi" },
    { label: "🇰🇷 K-Drama", href: "/tv?tab=kdrama" },
    { label: "🇳🇵 Nepali TV", href: "/tv?tab=nepali" },
  ];

  function NavDropdown({
    label,
    items,
    isOpen,
    setOpen,
    refEl,
    isActive,
  }: {
    label: string;
    items: { label: string; href: string }[];
    isOpen: boolean;
    setOpen: (v: boolean) => void;
    refEl: React.RefObject<HTMLDivElement|null>;
    isActive: boolean;
  }) {
    return (
      <div ref={refEl} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!isOpen)}
          style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            color: isActive ? "#f0ede8" : "#6b6358",
            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
            border: "none", cursor: "pointer",
            padding: "0.4rem 0.85rem", borderRadius: "6px",
            fontWeight: isActive ? 600 : 400,
            borderBottom: isActive ? "2px solid #d4a24c" : "2px solid transparent",
            display: "flex", alignItems: "center", gap: "4px",
            transition: "all 0.2s",
          }}
        >
          {label}
          <span style={{
            fontSize: "10px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}>▼</span>
        </button>

        {isOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            background: "#1a1a1f",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", overflow: "hidden", minWidth: "180px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            zIndex: 200,
          }}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "10px 16px",
                  fontFamily: "var(--font-body)", fontSize: "14px",
                  color: "#f0ede8", textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(212,162,76,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(13,13,15,0.97)" : "rgba(13,13,15,0.5)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      padding: "0.85rem 2rem",
      display: "flex", alignItems: "center", gap: "0.25rem",
      transition: "background 0.3s ease, border 0.3s ease",
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", flexShrink: 0, marginRight: "1rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", fontWeight: 600, color: "#f0ede8" }}>
          Reel Search
        </span>
      </Link>

      {/* Home */}
      <Link href="/" style={{
        fontFamily: "var(--font-body)", fontSize: "14px",
        color: pathname === "/" ? "#f0ede8" : "#6b6358",
        textDecoration: "none", padding: "0.4rem 0.85rem",
        borderRadius: "6px",
        background: pathname === "/" ? "rgba(255,255,255,0.08)" : "transparent",
        fontWeight: pathname === "/" ? 600 : 400,
        borderBottom: pathname === "/" ? "2px solid #d4a24c" : "2px solid transparent",
        transition: "all 0.2s",
      }}>
        Home
      </Link>

      {/* Movies dropdown */}
      <NavDropdown
        label="Movies"
        items={movieDropdownItems}
        isOpen={moviesOpen}
        setOpen={setMoviesOpen}
        refEl={moviesRef}
        isActive={pathname.startsWith("/movies")}
      />

      {/* TV Shows dropdown */}
      <NavDropdown
        label="TV Shows"
        items={tvDropdownItems}
        isOpen={tvOpen}
        setOpen={setTvOpen}
        refEl={tvRef}
        isActive={pathname.startsWith("/tv")}
      />

      {/* Top Rated */}
      <Link href="/top-rated" style={{
        fontFamily: "var(--font-body)", fontSize: "14px",
        color: pathname === "/top-rated" ? "#f0ede8" : "#6b6358",
        textDecoration: "none", padding: "0.4rem 0.85rem",
        borderRadius: "6px",
        background: pathname === "/top-rated" ? "rgba(255,255,255,0.08)" : "transparent",
        fontWeight: pathname === "/top-rated" ? 600 : 400,
        borderBottom: pathname === "/top-rated" ? "2px solid #d4a24c" : "2px solid transparent",
        transition: "all 0.2s",
      }}>
        Top Rated
      </Link>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: "400px", marginLeft: "auto" }}>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", fontSize: "14px", pointerEvents: "none",
          }}>
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search films, shows..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "0.5rem 1rem 0.5rem 2.25rem",
              fontFamily: "var(--font-body)", fontSize: "13px",
              color: "#f0ede8", outline: "none",
              boxSizing: "border-box",
              transition: "border 0.2s, background 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(212,162,76,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
          />
        </div>
      </div>

      {/* Favorites */}
      <Link href="/favorites" style={{
        fontFamily: "var(--font-body)", fontSize: "13px",
        color: "#d4a24c", textDecoration: "none",
        border: "1px solid rgba(212,162,76,0.35)",
        padding: "0.4rem 1rem", borderRadius: "6px",
        flexShrink: 0, marginLeft: "8px",
      }}>
        ★ Favorites
      </Link>
    </nav>
  );
}