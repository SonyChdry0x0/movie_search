import MovieCard from "@/components/MovieCard";
import { mockMovies } from "@/lib/mock-movies";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Masthead */}
      <header className="border-b border-ink/10 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-stone">
            Vol. 01 — Now Showing
          </p>
          <h1 className="mt-2 font-display text-5xl font-medium italic text-ink sm:text-6xl">
            Reel Search
          </h1>
          <p className="mt-3 max-w-md font-body text-base text-stone">
            A small archive for finding the film you didn&apos;t know you
            were looking for.
          </p>
        </div>
      </header>

      {/* Search bar — ticket-stub style */}
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <form className="flex items-center gap-3 rounded-sm border border-ink/15 bg-white/60 px-4 py-3 shadow-sm">
          <span className="font-body text-sm text-stone">🎬</span>
          <input
            type="text"
            placeholder="Search by title..."
            className="flex-1 bg-transparent font-body text-base text-ink placeholder:text-stone/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-sm bg-ink px-4 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-amber hover:text-ink"
          >
            Search
          </button>
        </form>
      </div>

      {/* Movie grid */}
      <main className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">
          Now Showing
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {mockMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}