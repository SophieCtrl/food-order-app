import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./Button";
import CurrencyFormatter from "./CurrencyFormatter";

export default function Cart({ onSubmit, setModalIsOpen }) {
  const { items, products } = useContext(CartContext);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  let cartSum = 0;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((itemId) => {
          const item = products.find((product) => product.id === itemId);

          const itemTotal = +item.price * cartItem.quantity;
          cartSum += itemTotal;

          return (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {<CurrencyFormatter value={+item.price} />} x{" "}
                {cartItem.quantity} = {<CurrencyFormatter value={itemTotal} />}
              </p>
              <button>-</button>
              <p>{cartItem.quantity}</p>
              <button>+</button>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{<CurrencyFormatter value={+cartSum} />}</p>
      <div className="cart-item-action">
        <button onClick={handleCloseModal}>Close</button>
        <Button onClick={onSubmit}>Go to Checkout</Button>
      </div>
    </div>
  );
}
