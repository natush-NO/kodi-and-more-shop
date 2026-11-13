import { createContext, useContext, useSyncExternalStore } from "react";

const CartContext = createContext();

const EMPTY_CART = [];

let cartSnapshot = null;
const listeners = new Set();

// Отримуємо кошик із localStorage
function getCartSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  if (cartSnapshot !== null) {
    return cartSnapshot;
  }

  try {
    const savedCart = localStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    cartSnapshot = Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Помилка завантаження кошика:", error);
    localStorage.removeItem("cart");
    cartSnapshot = [];
  }

  return cartSnapshot;
}

// Стан для серверного рендерингу
function getServerSnapshot() {
  return EMPTY_CART;
}

// Повідомляємо компоненти про зміну кошика
function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// Підписка на зміни localStorage
function subscribe(listener) {
  listeners.add(listener);

  function handleStorageChange(event) {
    if (event.key === "cart" || event.key === null) {
      cartSnapshot = null;
      notifyListeners();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

// Оновлення кошика
function updateCart(updater) {
  const currentCart = getCartSnapshot();
  const newCart = updater(currentCart);

  cartSnapshot = newCart;

  try {
    localStorage.setItem("cart", JSON.stringify(newCart));
  } catch (error) {
    console.error("Помилка збереження кошика:", error);
  }

  notifyListeners();
}

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(
    subscribe,
    getCartSnapshot,
    getServerSnapshot,
  );

  // Додати товар
  const addToCart = (product) => {
    updateCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Збільшити кількість
  const increaseQuantity = (id) => {
    updateCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Зменшити кількість
  const decreaseQuantity = (id) => {
    updateCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Видалити товар
  const removeFromCart = (id) => {
    updateCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  // Очистити кошик
  const clearCart = () => {
    updateCart(() => []);
  };

  // Загальна кількість товарів
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Загальна сума
  const cartTotal = cart.reduce(
    (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
