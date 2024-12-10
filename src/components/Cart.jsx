import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./Button";
import CartItems from "./CartItems";

export default function Cart({ onSubmit, onClose }) {
  const { items, isFetching } = useContext(CartContext);
  console.log(items);

  let cartContent;

  if (isFetching) {
    cartContent = <p>Loading...</p>;
  } else if (!isFetching && !items.length) {
    cartContent = <p>Your cart is empty</p>;
  } else if (!isFetching && items.length) {
    cartContent = <CartItems />;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartContent}
      <p className="modal-actions">
        <Button textOnly style={{ color: "black" }} onClick={onClose}>
          Close
        </Button>
        {items.length ? (
          <Button textOnly={false} onClick={onSubmit}>
            Go to Checkout
          </Button>
        ) : null}
      </p>
    </div>
  );
}
