import Button from "./Button";

export default function Products({ data, onAdd }) {
  return (
    <ul id="meals">
      {data.map((meal) => {
        const { id, description, image, name, price } = meal;
        return (
          <li className="meal-item" key={id}>
            <article>
              <img src={`http://localhost:3000/${image}`} alt={name} />
              <div className="meal-item-actions">
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <Button onClick={() => onAdd(meal)}>Add to Cart</Button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
