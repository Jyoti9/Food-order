import { useContext, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import Modal from './Modal';
import CartContxt from '../store/CartContext';
import Checkout from './Checkout';
export default function Header(){
    const cartCtx = useContext(CartContxt);
    const [cartSteps, setcartSteps] = useState('cart'); 
    const cartItems = [...cartCtx.items]
    const totalAmount = cartItems.reduce((total, i) => total + i.quantity * i.price, 0)
    const totalItems = cartItems.reduce((total, item)=>{ return  total + item.quantity},0);
    const modal = useRef();
    function handleCartClick(){
        modal.current.open();
        setcartSteps('cart');
    }
    function removeItem(id){
        cartCtx.removeFromCart(id);
    }
    function addItem(item) {
        cartCtx.addTocart(item);
    }
    function closePopup(){
        modal.current.close();
    }
    function moveTocheckout(){
        setcartSteps('checkout');
        console.log('sfssbj')
    }
    return (
        <>
        <header id='main-header'>
            <div id='title'>
                 <img src={logo}></img>
                  <h1>REACTFOOD</h1>  
            </div>
            <nav>
                <button onClick={handleCartClick}>Cart({totalItems})</button>
            </nav>
        </header>
            <Modal ref={modal} onClose={closePopup}>
                {(cartSteps === 'cart') &&  <><h2>Your Cart</h2>
                <ul className="list-items">
                    {cartItems.map((item)=>{
                      return (<li className="cart-item" key={`item_${item.id}`}>
                            <p>{item.name} - {item.quantity} x ${item.price}</p>
                            <div className="cart-item-actions">
                              <button onClick={()=>removeItem(item.id)}>-</button>
                                <p>{item.quantity}</p>
                              <button onClick={() => addItem(item)}>+</button>
                            </div>
                        </li>)
                    })}
                </ul>
                <div className="cart-total">${totalAmount}</div>
                <form method='dialog'>
                <div className="modal-actions">
                            <button className="text-button" onClick={closePopup}>Close </button>
                        {cartItems.length > 0 && <button type='button' className="button" onClick={moveTocheckout}>Go to Checkout </button>} 
                </div>
                    </form></>}
                {(cartSteps === 'checkout') && <Checkout close={closePopup} amount={totalAmount}/>}
            </Modal>
        </>
    )
}