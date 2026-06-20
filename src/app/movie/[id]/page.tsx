import { getMovieDetail } from "@/lib/tmdb";
import Link from "next/link";

export default async function MovieDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const movie = await getMovieDetail(id);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const genres = movie.genres?.map((g: any) => g.name) ?? [];
  const rating = movie.vote_average ?? 0;
  const ratingColor = rating >= 7.5 ? "#4ade80" : rating >= 6 ? "#d4a24c" : "#f87171";

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0f", color: "#f0ede8" }}>

      {/* Backdrop */}
      {backdropUrl && (
        <div style={{ position: "relative", height: "400px", overflow: "hidden" }}>
          <img
            src={backdropUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, #0d0d0f 100%)" }} />
        </div>
      )}

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem 6rem" }}>

        {/* Back link */}
        <Link href="/" style={{
          display: "inline-block",
          fontFamily: "var(--font-body)", fontSize: "13px", color: "#6b6358",
          textDecoration: "none", marginTop: backdropUrl ? "-3rem" : "2rem",
          position: "relative", zIndex: 10,
        }}>
          ← Back to archive
        </Link>

        <div style={{ display: "flex", gap: "3rem", marginTop: "2rem", flexWrap: "wrap" }}>

          {/* Poster */}
          {posterUrl && (
            <div style={{ flexShrink: 0 }}>
              <img
                src={posterUrl}
                alt={movie.title}
                style={{ width: "240px", borderRadius: "10px", display: "block" }}
              />
            </div>
          )}

          {/* Info */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.15em", color: "#6b6358", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
              {movie.release_date?.slice(0, 4)} · {movie.runtime} min
            </p>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 500, fontStyle: "italic", color: "#f0ede8", margin: "0 0 0.5rem", lineHeight: 1.1 }}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontStyle: "italic", color: "#d4a24c", margin: "0 0 1.5rem" }}>
                {movie.tagline}
              </p>
            )}

            {/* Rating + Genres */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <div style={{
                border: `1px solid ${ratingColor}`, borderRadius: "6px",
                padding: "4px 12px", fontFamily: "var(--font-body)",
                fontSize: "14px", fontWeight: 600, color: ratingColor,
                background: "rgba(0,0,0,0.4)",
              }}>
                ★ {rating.toFixed(1)}
              </div>
              {genres.map((genre: string) => (
                <span key={genre} style={{
                  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px",
                  padding: "4px 14px", fontFamily: "var(--font-body)",
                  fontSize: "12px", color: "#6b6358",
                }}>
                  {genre}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.75, color: "rgba(240,237,232,0.75)", marginBottom: "2.5rem" }}>
              {movie.overview}
            </p>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, fontStyle: "italic", color: "#f0ede8", margin: "0 0 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem" }}>
                  Cast
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
                  {cast.map((member: any) => (
                    <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "#1a1a1f", border: "1px solid rgba(255,255,255,0.08)",
                        flexShrink: 0, overflow: "hidden",
                      }}>
                        {member.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                            alt={member.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "#f0ede8", margin: 0 }}>
                          {member.name}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#6b6358", margin: 0 }}>
                          {member.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}