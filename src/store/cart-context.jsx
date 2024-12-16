import { createContext, useReducer, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";

export const CartContext = createContext({
  items: [],
  products: [],
  isFetching: false,
  error: null,
  addItem: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
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
      .filter((item) => item.quantity > 0);

    return { ...state, items: updatedItems };
  } else if (action.type === "SET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
};

const getConfig = {
  method: "GET",
};

const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
    products: [],
  });

  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    getConfig,
    []
  );

  useEffect(() => {
    if (data) {
      cartDispatch({ type: "SET_PRODUCTS", payload: data });
    }
  }, [data]);

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

  function clearCart() {
    cartDispatch({ type: "CLEAR_CART" });
  }

  const ctxValue = {
    items: cartState.items,
    products: cartState.products,
    isFetching: isLoading,
    error,
    addItem: handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
