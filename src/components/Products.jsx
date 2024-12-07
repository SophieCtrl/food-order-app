import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./Button";

export default function Products({ data, onAdd }) {
  const { products, addItem } = useContext(CartContext);

  return (
    <ul id="meals">
      {products.map((product) => {
        const { id, description, image, name, price } = product;
        return (
          <li className="meal-item" key={id}>
            <article>
              <img src={`http://localhost:3000/${image}`} alt={name} />
              <div className="meal-item-actions">
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <Button onClick={() => addItem(product.id)}>Add to Cart</Button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
