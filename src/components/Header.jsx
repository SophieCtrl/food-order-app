import logo from "../assets/logo.jpg";

export default function Header({ onShowCart }) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="UrbanFoodie Logo" />
        <h1>UrbanFoodie</h1>
      </div>
      <button onClick={onShowCart}>Cart</button>
    </div>
  );
}
