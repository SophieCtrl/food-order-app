import { createContext, useReducer, useEffect, useState } from "react";

export const CartContext = createContext({
  items: [],
  products: [],
  isFetching: false,
  error: null,
  addItem: () => {},
  updateItemQuantity: () => {},
});

const shoppingCartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    if (existingCartItemIndex >= 0) {
      const updatedItems = state.items.map((item, index) =>
        index === existingCartItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, items: updatedItems };
    } else {
      return {
        ...state,
        items: [...state.items, { id: action.payload, quantity: 1 }],
      };
    }
  } else if (action.type === "UPDATE_ITEM") {
    const updatedItems = state.items
      .map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + action.payload.amount }
          : item
      )
      .filter((item) => item.amount > 0);

    return { ...state, items: updatedItems };
  } else if (action.type === "SET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
    products: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        cartDispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        setError(error.message || "Failed to fetch products");
      } finally {
        setIsFetching(false);
      }
    }
    fetchProducts();
  }, []);

  function handleAddItem(id) {
    cartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateItemQuantity(id, amount) {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { id, amount },
    });
  }

  const ctxValue = {
    items: cartState.items,
    products: cartState.products,
    isFetching,
    error,
    addItem: handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
