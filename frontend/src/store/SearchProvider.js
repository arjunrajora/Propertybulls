import { useReducer,useEffect } from "react";
import SearchContext from "./search-context";


const SearchProvider = (props) => {
  const cartData = sessionStorage.getItem('search');
  const defaultCartState = {
    Searchitems: [],
    totalAmount: 0,
  };
  const savedCartData = cartData ? JSON.parse(cartData) : defaultCartState;
  const [cartState, dispatchCartAction] = useReducer(
    SearchReducer,
    savedCartData
  );
  const setsearchItems = (apiData) => {
    dispatchCartAction({ type: 'SET_ITEMS', Searchitems: apiData });
  };
  const addItemToCartHandler = (item) => {
    console.log(item);
        dispatchCartAction({ type: "ADD", Searchitem: item });
      };

      const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
      };
      const logoutHandler = () => {
        dispatchCartAction({ type: "CLEAR_CART" });
      };
      const searchContext = {
        Searchitems: cartState.Searchitems,
        addItem: addItemToCartHandler,
        removeSearchItem: removeItemFromCartHandler,
        clear:logoutHandler,
        setSearchItems: setsearchItems, 
        
      };
    
      useEffect(() => {
        sessionStorage.setItem('search', JSON.stringify(cartState));
      }, [cartState]);
    
    
      return (
        <SearchContext.Provider value={searchContext}>
          {props.children}
        </SearchContext.Provider>
      );
};

const SearchReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.Searchitems.concat(action.Searchitem);
    return {
        Searchitems: updatedItems,
    };
  }

  if (action.type === 'REMOVE') {
    const updatedItems = state.Searchitems.filter((item) => item.id !== action.id.id);
            console.log(updatedItems,"id");
            console.log(action.id.id,"id");
    return {
      ...state,
      Searchitems: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      Searchitems: [],
    };
  }
  if (action.type === 'SET_ITEMS') {
    return {
      ...state,
      Searchitems: action.Searchitems, // Use action.Searchitems, not action.items
    };
  }
  return state;
};
export default SearchProvider;
