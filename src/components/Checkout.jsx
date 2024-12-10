import { useState, useContext } from "react";
import { CartContext } from "../store/cart-context";
import { UserProgressContext } from "../store/progress-context";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postCode: "",
    city: "",
  });

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleChange = (event, id) => {
    setFormData((prevData) => ({ ...prevData, [id]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Modal open={progress === "checkout"}>
      <h2>Checkout</h2>
      <p>Total Amount: {cartTotal}</p>
      <form>
        <Input
          label="Full Name"
          id="name"
          type="text"
          value={formData.name}
          onChange={() => handleChange("name")}
        />
        <Input
          label="Email Address"
          id="email"
          type="text"
          value={formData.email}
          onChange={() => handleChange("email")}
        />
        <Input
          label="Street"
          id="street"
          type="text"
          value={formData.street}
          onChange={() => handleChange("street")}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            id="postCode"
            type="number"
            value={formData.postCode}
            onChange={() => handleChange("postCode")}
          />
          <Input
            label="City"
            id="city"
            type="text"
            value={formData.city}
            onChange={() => handleChange("text")}
          />
        </div>

        <p className="modal-actions">
          <Button textOnly style={{ color: "black" }} onClick={hideCheckout}>
            Close
          </Button>
          <Button textOnly={false} onClick={handleSubmit}>
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}
