import React from "react";

const SearchContext = React.createContext({
    Searchitems:[],
    totalAmount:0,
    addSearchItem:(Searchitem)=>{},
    removeSearchItem:(id)=>{},
    setSearchItems: [],
    clear:[]
});

export default SearchContext;   