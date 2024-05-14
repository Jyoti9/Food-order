import Header from "./Components/Header";
import MealCards from "./Components/MealCards";
import { CartProvider } from './store/CartContext';
function App() {
  return (
    <CartProvider>
   
      <Header/>
      <MealCards/>
    </CartProvider>
  );
}

export default App;
