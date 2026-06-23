import { getMovieDetail } from "@/lib/tmdb";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/MovieGrid";

export default async function MovieDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  const trailer = movie.videos?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  ) ?? movie.videos?.results?.find((video: any) => video.site === "YouTube");

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

      <Navbar />

      {/* Full screen backdrop */}
      {backdropUrl && (
        <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
          <img
            src={backdropUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,15,0.95) 10%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0f 0%, transparent 55%)" }} />

          <div style={{
            position: "absolute", bottom: "4rem", left: 0, right: 0,
            maxWidth: "1100px", margin: "0 auto", padding: "0 2rem",
          }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", color: "#d4a24c", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
              {movie.release_date?.slice(0, 4)} · {movie.runtime} min
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, fontStyle: "italic", color: "#f0ede8", margin: "0 0 0.5rem", lineHeight: 1, maxWidth: "600px" }}>
              {movie.title}
            </h1>
            {movie.tagline && (
              <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontStyle: "italic", color: "#d4a24c", margin: 0 }}>
                {movie.tagline}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Content below hero */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem 6rem" }}>

        

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>

          {/* Poster */}
          {posterUrl && (
            <div style={{ flexShrink: 0 }}>
              <img
                src={posterUrl}
                alt={movie.title}
                style={{
                  width: "240px", borderRadius: "12px", display: "block",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                  marginTop: backdropUrl ? "1rem" : "0",
                  position: "relative", zIndex: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              {cast.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "18px",
                  fontWeight: 500, fontStyle: "italic", color: "#f0ede8",
                  margin: "0 0 1.25rem",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  Cast
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
                  {cast.map((member: any) => (
                    <div key={member.id} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "8px", padding: "10px",
                    }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
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
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#f0ede8", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {member.name}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#6b6358", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {member.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          )}
          

          {/* Info */}
          <div style={{ flex: 1, minWidth: "280px", paddingTop: "1rem" }}>

            {/* Rating + Genres */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <div style={{
                border: `1px solid ${ratingColor}`, borderRadius: "6px",
                padding: "5px 14px", fontFamily: "var(--font-body)",
                fontSize: "15px", fontWeight: 700, color: ratingColor,
                background: "rgba(0,0,0,0.4)",
              }}>
                ★ {rating.toFixed(1)}
              </div>
              {genres.map((genre: string) => (
                <span key={genre} style={{
                  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px",
                  padding: "5px 14px", fontFamily: "var(--font-body)",
                  fontSize: "12px", color: "#6b6358",
                }}>
                  {genre}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.8, color: "rgba(240,237,232,0.75)",
              marginBottom: "2.5rem",
              borderLeft: "2px solid rgba(212,162,76,0.4)",
              paddingLeft: "1rem",
            }}>
              {movie.overview}
            </p>

            {/* Trailer */}
            {trailer && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "18px",
                  fontWeight: 500, fontStyle: "italic", color: "#f0ede8",
                  margin: "0 0 1.25rem",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  Trailer
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                </h2>

                <div style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                  background: "#000",
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0, left: 0,
                      width: "100%", height: "100%",
                      border: "none",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Cast */}
            

            {/* Similar Movies */}
            {movie.similar?.results?.length > 0 && (
              <div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "18px",
                  fontWeight: 500, fontStyle: "italic", color: "#f0ede8",
                  margin: "0 0 1.25rem",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  Similar Movies
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
                </h2>
                <MovieGrid movies={movie.similar.results.slice(0, 12)} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}