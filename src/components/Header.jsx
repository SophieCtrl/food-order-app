import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/cart-context";
import { UserProgressContext } from "../store/progress-context";

export default function Header({ setModal }) {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCartItems = items.reduce(
    (itemsQuantity, item) => itemsQuantity + item.quantity,
    0
  );

  const handleShowCart = () => {
    showCart();
  };

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="UrbanFoodie Logo" />
        <h1>UrbanFoodie</h1>
      </div>
      <Button textOnly onClick={handleShowCart}>
        Cart ({totalCartItems})
      </Button>
    </div>
  );
}
