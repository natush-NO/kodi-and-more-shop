import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Завантажуємо вибране з localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Зберігаємо вибране в localStorage
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites, isLoaded]);

  // Додати або прибрати товар з вибраного
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      }

      return [...prevFavorites, product];
    });
  };

  // Перевірити, чи товар у вибраному
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Додати товар
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);

      if (exists) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  };

  // Видалити товар
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId),
    );
  };

  // Очистити все вибране
  const clearFavorites = () => {
    setFavorites([]);
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
