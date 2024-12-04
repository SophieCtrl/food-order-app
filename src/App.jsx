import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState([]);

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
      <Header />
      {isFetching ? "Data is loading..." : <Products data={fetchedData} />}
    </>
  );
}

export default App;
