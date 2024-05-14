import { useContext } from "react";
import CartContxt from "../store/CartContext";

export default function Meal(props){
    const meal = props.meal;
    const cartCont = useContext(CartContxt);
    function addTocart(data){
        cartCont.addTocart(data);
        console.log(cartCont, 'ceck')
      
    }
    return(
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`}></img>
                <h3>{meal.name}</h3>
                <span className="meal-item-price">{meal.price}</span>
                <p className="meal-item-description">{meal.description}</p>
                <div className="meal-item-actions">
                    <button className="button" onClick={() => addTocart(meal)}>Add to Cart</button>
                </div>
            </article>
        </div>
    )
}