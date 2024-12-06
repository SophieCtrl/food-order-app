import { createContext, useReducer, useEffect, useState } from "react";

export const CartContext = createContext({
  items: [],
  products: [],
  isFetching: false,
  error: "",
  addItem: () => {},
  updateItemQuantity: () => {},
});

const shoppingCartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const productToAdd = state.products.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        ...productToAdd,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  } else if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.find(
      (item) => item.id === action.payload.id
    );
    const updatedItem = updatedItems[updatedItemIndex];

    updatedItem.quantity += action.payload.amaount;
    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItem[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
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
