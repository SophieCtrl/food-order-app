import { useContext } from "react";
import CartContextProvider from "./store/cart-context";
import { CartContext } from "./store/cart-context";
import {
  UserProgressContext,
  UserProgressContextProvider,
} from "./store/progress-context";
import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/UI/Modal";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Checkout />
        <Cart />
        <Header />
        <Products />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
