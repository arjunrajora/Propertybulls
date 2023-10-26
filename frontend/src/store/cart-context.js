import React from "react";

const CartContext = React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    setItems: [], // Update the parameter name to "items"
    clear:[]
});

export default CartContext;