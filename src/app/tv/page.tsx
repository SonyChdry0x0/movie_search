import { getTrendingTV, getHindiTV, getKDrama, getNepaliTV } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import TVClient from "@/components/TVClient";

export default async function TVPage() {
  const [english, hindi, kdrama, nepali] = await Promise.all([
    getTrendingTV(),
    getHindiTV(),
    getKDrama(),
    getNepaliTV(),
  ]);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2rem 6rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontStyle: "italic", fontWeight: 700, color: "#f0ede8", margin: "0 0 2rem" }}>
          TV Shows
        </h1>
        <TVClient english={english} hindi={hindi} kdrama={kdrama} nepali={nepali} />
      </div>
    </div>
  );
}