import logo from "../assets/logo.jpg";
import Button from "./Button";

export default function Header({ onShowCart }) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="UrbanFoodie Logo" />
        <h1>UrbanFoodie</h1>
      </div>
      <Button textOnly onClick={onShowCart}>
        Cart
      </Button>
    </div>
  );
}
