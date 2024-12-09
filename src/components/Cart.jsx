import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./Button";
import CurrencyFormatter from "../util/CurrencyFormatter";

export default function Cart({ onSubmit, onClose }) {
  const { items, products, isFetching, updateItemQuantity } =
    useContext(CartContext);
  console.log(items);

  let cartSum = 0;
  let cartContent;

  if (isFetching) {
    cartContent = "Loading...";
  } else if (!isFetching && !items.length) {
    cartContent = "Your cart is empty";
  } else if (!isFetching && items.length) {
    cartContent = (
      <div>
        <ul>
          {items.map((cartItem) => {
            const item = products.find((product) => product.id === cartItem.id);
            if (!item) return null;

            const itemTotal = +item.price * cartItem.quantity;
            cartSum += itemTotal;

            return (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {<CurrencyFormatter value={+item.price} />} x{" "}
                  {cartItem.quantity} ={" "}
                  {<CurrencyFormatter value={itemTotal} />}
                </p>
                <button onClick={() => updateItemQuantity(item.id, -1)}>
                  -
                </button>
                <p>{cartItem.quantity}</p>
                <button onClick={() => updateItemQuantity(item.id, 1)}>
                  +
                </button>
              </li>
            );
          })}
        </ul>
        <p className="cart-total">{<CurrencyFormatter value={+cartSum} />}</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartContent}
      <div className="cart-item-action">
        <button onClick={onClose}>Close</button>
        <Button textOnly={false} onClick={onSubmit}>
          Go to Checkout
        </Button>
      </div>
    </div>
  );
}
