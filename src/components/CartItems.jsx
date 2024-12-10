import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CurrencyFormatter from "../util/CurrencyFormatter";

export default function CartItems() {
  const { items, products, updateItemQuantity } = useContext(CartContext);

  let cartSum = 0;

  return (
    <div>
      <ul>
        {items.map((cartItem) => {
          const item = products.find((product) => product.id === cartItem.id);
          if (!item) return null;

          const itemTotal = +item.price * cartItem.quantity;
          cartSum += itemTotal;

          return (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {<CurrencyFormatter value={+item.price} />} x{" "}
                {cartItem.quantity} = {<CurrencyFormatter value={itemTotal} />}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => updateItemQuantity(item.id, -1)}>
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, 1)}>
                  +
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{<CurrencyFormatter value={+cartSum} />}</p>
    </div>
  );
}
