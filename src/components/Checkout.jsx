import { useContext, useState } from "react";
import { CartContext } from "../store/cart-context";
import { UserProgressContext } from "../store/progress-context";
import CurrencyFormatter from "../util/CurrencyFormatter";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./UI/Error";

export default function Checkout() {
  const { items, products } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const [isSending, setIsSending] = useState();
  const [error, setError] = useState();

  const cartTotal = items.reduce((totalPrice, item) => {
    const productIndex = products.findIndex(
      (product) => product.id === item.id
    );
    return totalPrice + item.quantity * products[productIndex].price;
  }, 0);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    setIsSending(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: { items: items, customer: customerData },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send products.");
      }
      hideCheckout();
    } catch (error) {
      setError({ message: error.message || "Failed to send products." });
    } finally {
      setIsSending(false);
    }
  }

  let actions = (
    <p className="modal-actions">
      <Button textOnly style={{ color: "black" }} onClick={hideCheckout}>
        Close
      </Button>
      <Button textOnly={false}>Submit Order</Button>
    </p>
  );

  if (isSending) {
    actions = "Sending data...";
  }

  if (error) {
    return <Error title="Something went wrong" message={error.message} />;
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <h2>Checkout</h2>
      <p>Total Amount: {<CurrencyFormatter value={cartTotal} />}</p>
      <form onSubmit={handleSubmit}>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="text" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="number" />
          <Input label="City" id="city" type="text" />
        </div>
        {actions}
      </form>
    </Modal>
  );
}
