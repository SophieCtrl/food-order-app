import { useContext } from "react";
import CartContextProvider from "./store/cart-context";
import { CartContext } from "./store/cart-context";
import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {
  const { isFetching } = useContext(CartContext);
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
        <Cart
          onSubmit={handleCartSubmit}
          onClose={() => setModalIsOpen(false)}
        />
      </Modal>
      <Header onShowCart={handleShowCart} />
      {isFetching ? "Data is loading..." : <Products />}
    </CartContextProvider>
  );
}

export default App;
