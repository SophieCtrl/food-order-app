import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { UserProgressContext } from "../store/progress-context";
import Button from "./UI/Button";
import CartItems from "./CartItems";
import Modal from "./UI/Modal";

export default function Cart() {
  const { items, isFetching } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const handleSubmitCart = () => {
    hideCart();
    showCheckout();
  };

  let cartContent;

  if (isFetching) {
    cartContent = <p>Loading...</p>;
  } else if (!isFetching && !items.length) {
    cartContent = <p>Your cart is empty</p>;
  } else if (!isFetching && items.length) {
    cartContent = <CartItems />;
  }

  return (
    <Modal
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : null}
    >
      <div className="cart">
        <h2>Your Cart</h2>
        {cartContent}
        <p className="modal-actions">
          <Button textOnly style={{ color: "black" }} onClick={hideCart}>
            Close
          </Button>
          {items.length ? (
            <Button textOnly={false} onClick={handleSubmitCart}>
              Go to Checkout
            </Button>
          ) : null}
        </p>
      </div>
    </Modal>
  );
}
