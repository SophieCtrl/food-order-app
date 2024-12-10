import { useState } from "react";
import Input from "./Input";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postCode: "",
    city: "",
  });

  const handleChange = (event, id) => {
    setFormData((prevData) => ({ ...prevData, [id]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: X</p>
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

        <p className="modal-actions">
          <Button textOnly style={{ color: "black" }}>
            Close
          </Button>
          <Button textOnly={false} onClick={handleSubmit}>
            Submit Order
          </Button>
        </p>
      </form>
    </>
  );
}
