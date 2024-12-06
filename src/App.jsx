import { useContext } from "react";
import CartContextProvider from "./store/cart-context";
import { CartContext } from "./store/cart-context";
import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {
  const { items, products, isFetching, error } = useContext(CartContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleShowCart = () => {
    setModalIsOpen(true);
  };

  const handleCartSubmit = () => {
    setModalIsOpen(false);
  };

  return (
    <CartContextProvider>
      <Modal open={modalIsOpen}>
        <Cart onSubmit={handleCartSubmit} setModalIsOpen={setModalIsOpen} />
      </Modal>
      <Header onShowCart={handleShowCart} />
      {isFetching ? "Data is loading..." : <Products />}
    </CartContextProvider>
  );
}

export default App;
