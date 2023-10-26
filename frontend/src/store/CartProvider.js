import { useReducer,useEffect } from "react";
import CartContext from "./cart-context";


const CartProvider = (props) => {
  const cartData = sessionStorage.getItem('cart');
  const defaultCartState = {
    items: [],
    totalAmount: 0,
  };
  const savedCartData = cartData ? JSON.parse(cartData) : defaultCartState;
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    savedCartData
  );
  const setItemsHandler = (apiData) => {
    dispatchCartAction({ type: 'SET_ITEMS', items: apiData });
  };
  const addItemToCartHandler = (item) => {
    console.log(item);
        dispatchCartAction({ type: "ADD", item: item });
      };
      const removeItemFromCartHandler = (id) => {
        console.log(id,"id");
        dispatchCartAction({ type: "REMOVE", id: id });
      };
      const logoutHandler = () => {
        dispatchCartAction({ type: "CLEAR_CART" });
      };
      const cartContext = {
        items: cartState.items,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clear:logoutHandler,
        setItems: setItemsHandler, // Add the setItems handler to the cartContext
        
      };
    
      useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cartState));
      }, [cartState]);
    
    
      return (
        <CartContext.Provider value={cartContext}>
          {props.children}
        </CartContext.Provider>
      );
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  }

  if (action.type === 'REMOVE') {
    const updatedItems = state.items.filter((item) => item.pro_id !== action.id.pro_id);
            console.log(updatedItems,"id");
            console.log(action.id.pro_id,"id");
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }
  if (action.type === 'SET_ITEMS') {
  
      return {
        ...state,
        items: action.items,
      }
  }
  return state;
};
export default CartProvider;
