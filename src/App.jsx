import CartContextProvider from "./store/cart-context";
import { UserProgressContextProvider } from "./store/progress-context";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Checkout />
        <Cart />
        <Header />
        <Products />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
