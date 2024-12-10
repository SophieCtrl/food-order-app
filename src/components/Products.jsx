import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CurrencyFormatter from "../util/CurrencyFormatter";
import Button from "./UI/Button";

export default function Products() {
  const { products, isFetching, addItem } = useContext(CartContext);

  return (
    <>
      {isFetching ? (
        <p>Data is fetching...</p>
      ) : (
        <ul id="meals">
          {products.map((product) => {
            const { id, description, image, name, price } = product;
            return (
              <li className="meal-item" key={id}>
                <article>
                  <img src={`http://localhost:3000/${image}`} alt={name} />
                  <div className="meal-item-actions">
                    <h3>{name}</h3>
                    <p className="meal-item-price">
                      <CurrencyFormatter value={price} />
                    </p>
                    <p className="meal-item-description">{description}</p>
                    <Button
                      onClick={() => addItem(product.id)}
                      textOnly={false}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
