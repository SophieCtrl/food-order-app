import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { UserProgressContext } from "../store/progress-context";
import useHttp from "../hooks/useHttp";
import CurrencyFormatter from "../util/CurrencyFormatter";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./UI/Error";

const postConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { items, products, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", postConfig);

  const cartTotal = items.reduce((totalPrice, item) => {
    const productIndex = products.findIndex(
      (product) => product.id === item.id
    );
    return totalPrice + item.quantity * products[productIndex].price;
  }, 0);

  async function checkoutAction(fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: { items: items, customer: customerData },
      })
    );
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly style={{ color: "black" }} onClick={hideCheckout}>
        Close
      </Button>
      <Button textOnly={false}>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = "Sending data...";
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Sucess!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <h2>Checkout</h2>
      <p>Total Amount: {<CurrencyFormatter value={cartTotal} />}</p>
      <form action={checkoutAction}>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="text" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="number" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">{actions}</p>
        {error && <Error title="Failed to submit order" message={error} />}
      </form>
    </Modal>
  );
}
