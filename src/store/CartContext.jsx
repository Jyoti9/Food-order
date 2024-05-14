import { createContext, useReducer } from "react";
function cartReducer(state,action){
  if(action.type === 'ADD_ITEM'){
    const itemIndex = state.items.findIndex((item)=> item.id === action.item.id)
    let updatedItems = [...state.items];
    if(itemIndex > -1){
      const itemToUpdate = state.items[itemIndex];
      const updateitem = {
        ...itemToUpdate,
        quantity: itemToUpdate.quantity + 1
      }
      updatedItems[itemIndex] = updateitem;
    }else{
      updatedItems.push({...action.item, quantity: 1})
    }
    return { ...state, items: updatedItems};
  }else if(action.type === 'REMOVE_ITEM'){
    const itemIndex = state.items.findIndex((item) => item.id === action.id)
    let updatedItems = [...state.items];
    const updateItem = state.items[itemIndex];
    if (updateItem.quantity === 1){
      updatedItems.splice(itemIndex, 1);
    }else{
      const itemChange = {
        ...updateItem,
        quantity: updateItem.quantity - 1
      }
      updatedItems[itemIndex] = itemChange;
    }
    return {...state , items: updatedItems}
  }else if(action.type === 'CLEAR_CART'){
    return {...state, items: []}
  }
}
  export function CartProvider({children}){
   const [state, dispatchAction] = useReducer(cartReducer, {items: []})
    function addToCart(data) {
      dispatchAction({type: 'ADD_ITEM', item:data})
    }
    function removeToCart(id) {
      dispatchAction({ type: 'REMOVE_ITEM', id })
    }
    function clearCart(){
      dispatchAction({ type: 'CLEAR_CART'})
    }
    const initProvider = {
      items: state.items,
      addTocart: addToCart,
      removeFromCart: removeToCart,
      clearCart: clearCart
    }
    return (<CartContxt.Provider value={initProvider}>{children}</CartContxt.Provider> )
    }

const CartContxt = createContext({
  mealsAdded: [],
  addTocart: ()=>{},
  removeFromCart: ()=>{},
  clearCart:()=>{}
});
export default CartContxt;

