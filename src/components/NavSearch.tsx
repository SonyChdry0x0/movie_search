"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search films..."
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "#f0ede8",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}