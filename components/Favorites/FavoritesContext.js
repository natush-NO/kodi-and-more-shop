import { createContext, useContext, useSyncExternalStore } from "react";

const FavoritesContext = createContext();

const EMPTY_FAVORITES = [];

let favoritesSnapshot = null;
const listeners = new Set();

function getFavoritesSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }

  if (favoritesSnapshot !== null) {
    return favoritesSnapshot;
  }

  try {
    const savedFavorites = localStorage.getItem("favorites");
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    favoritesSnapshot = Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    localStorage.removeItem("favorites");
    favoritesSnapshot = [];
  }

  return favoritesSnapshot;
}

function getServerSnapshot() {
  return EMPTY_FAVORITES;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  function handleStorageChange(event) {
    if (event.key === "favorites" || event.key === null) {
      favoritesSnapshot = null;
      notifyListeners();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function updateFavorites(updater) {
  const currentFavorites = getFavoritesSnapshot();
  const newFavorites = updater(currentFavorites);

  favoritesSnapshot = newFavorites;

  try {
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }

  notifyListeners();
}

export function FavoritesProvider({ children }) {
  const favorites = useSyncExternalStore(
    subscribe,
    getFavoritesSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = (product) => {
    updateFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      }

      return [...prevFavorites, product];
    });
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  const addToFavorites = (product) => {
    updateFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    updateFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId),
    );
  };

  const clearFavorites = () => {
    updateFavorites(() => []);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
