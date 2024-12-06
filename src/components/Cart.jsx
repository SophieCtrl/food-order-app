import Button from "./Button";
import CurrencyFormatter from "./CurrencyFormatter";

export default function Cart({ cartData, onSubmit, setModalIsOpen }) {
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  let cartSum = 0;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartData.map((meal) => {
          cartSum += +meal.price;

          return (
            <li key={meal.id} className="cart-item">
              <p>
                {meal.name} - {<CurrencyFormatter value={+meal.price} />}
              </p>
              <button>-</button>
              <p>0</p>
              <button>+</button>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{<CurrencyFormatter value={+cartSum} />}</p>
      <div className="cart-item-action">
        <button onClick={handleCloseModal}>Close</button>
        <Button onClick={onSubmit}>Go to Checkout</Button>
      </div>
    </div>
  );
}
