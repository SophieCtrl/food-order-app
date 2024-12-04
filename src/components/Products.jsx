export default function Products({ data }) {
  return (
    <ul id="meals">
      {data.map((meal) => {
        const { description, image, name, price } = meal;
        return (
          <li className="meal-item" key={meal.id}>
            <article>
              <img src={`http://localhost:3000/${image}`} alt={name} />
              <div className="meal-item-actions">
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <button className="button">Add to Cart</button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
