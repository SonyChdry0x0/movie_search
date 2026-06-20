"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: any[];
  toggleFavorite: (movie: any) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("reel-favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  function toggleFavorite(movie: any) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem("reel-favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(id: number) {
    return favorites.some((m) => m.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}