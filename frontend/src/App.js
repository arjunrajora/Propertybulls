import Routers from "./routes";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CartProvider from "./store/CartProvider";
import SearchProvider from "./store/SearchProvider";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
 
    <CartProvider>
    <SearchProvider>
      {isLoading ? (
        <div className="loader">
          <ClipLoader
            // color={color}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <Routers />
        </div>
      )}
          </SearchProvider>
    </CartProvider>
  );
}
