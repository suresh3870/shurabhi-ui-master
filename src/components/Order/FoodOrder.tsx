import React, { useState } from "react";
import Nav from "./Navbar/Nav";
import Shop from "./Shop";
import Cart from "./Cart";
import { HashRouter, Switch, Route } from "react-router-dom";

const FoodOrder: React.FC = () => {
  const [cartItems, setCartItems] = useState<any>([]);

  return (
    <HashRouter>
      <Nav cartItems={cartItems} />
      <Switch>
        <Route path="/shop" exact>
          <Shop cartItems={cartItems} setCartItems={setCartItems} />
        </Route>
        <Route path="/cart" exact>
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default FoodOrder;