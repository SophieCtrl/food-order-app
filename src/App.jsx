import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedMeals, setSelectedMeals] = useState([]);

  const handleAddMeal = (newMeal) => {
    setSelectedMeals((prevMeals) => [newMeal, ...prevMeals]);
  };

  const handleCartSubmit = () => {
    setModalIsOpen(false);
  };

  const handleShowCart = () => {
    console.log(selectedMeals);
    setModalIsOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch meal data." });
      }
      setIsFetching(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Modal open={modalIsOpen}>
        <Cart
          cartData={selectedMeals}
          onSubmit={handleCartSubmit}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
      <Header onShowCart={handleShowCart} />
      {isFetching ? (
        "Data is loading..."
      ) : (
        <Products data={fetchedData} onAdd={handleAddMeal} />
      )}
    </>
  );
}

export default App;
