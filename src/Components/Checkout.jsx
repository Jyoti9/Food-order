import { useContext, useState } from "react";
import Input from "./Input";
import CartContxt from "../store/CartContext";
import { useHttps } from "../hooks/usehttps";
const initData = {
    url: 'http://localhost:3000/orders',
    config: { method: 'POST', headers: {
        'Content-Type': 'application/json'
        }
    }
}
export default function Checkout({ amount , close}){
    const cartCont = useContext(CartContxt);
    const { isLoading, isError, data: responseData, getdata: sendRequest } = useHttps(initData);
    
  
    async function handleForm(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        sendRequest(JSON.stringify({
            order: {
                items: cartCont.items,
                customer: data
            }
        }));
    }
    function closeSuccess(){
        close();
        cartCont.clearCart();
    }
    let buttonsState = <div className="modal-actions">
        <button className="text-button" type="button">Close</button>
        <button className="button">Submit Order</button>
    </div>;
    if (isLoading){
        buttonsState = <p>Data is Submitting...</p>
    }
    if(isError){
        buttonsState = <p>{isError.message}</p>
    }
    if (responseData && !isError){
        return (<div>
            <h2>Success</h2>
            <p>Your Order has been submitted Successfully.</p>
            <p>We will get back to you with more deatils via email after few minutes.</p>
            <div className="modal-actions">
                <button className="text-button" onClick={close} type="button">Close</button>
                <button className="button" onClick={closeSuccess}>Okay</button>
            </div>
        </div>)
    }
    return (
        <>
        <form onSubmit={handleForm}>
            <h2>Checkout</h2>
            <p>Total Amount{amount}</p>
            <Input label="Full name" id="name" required/>
            <Input label="Email Address" required id="email" />
            <Input label="Street" id="street" required />
            <div className="control-row">
                <Input label="Postal code" required id="postal-code" />
                <Input label="City" id="city" required />
            </div>
                {buttonsState}
        
        </form>
        </>
    )
}