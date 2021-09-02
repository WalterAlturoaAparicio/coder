import React from "react";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

const App = () => {
  React.useEffect(() => {
    
  }, []);
  return (
    <Router>
      <div>
        <nav className="navbar">
          <button onClick={Home.changeAdmin} className="buy">
            Set Admin
          </button>
          <div className="max-width">
            {Home.admin ? (
              <ul className="menu">
                <li>
                  <a href="/" className="menu-btn">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/productos" className="menu-btn">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/carrito" className="menu-btn">
                    <i className="fas fa-shopping-cart"></i>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="menu">
                <li>
                  <a href="/" className="menu-btn">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#"></a>
                </li>
                <li>
                  <a href="/carrito" className="menu-btn">
                    <i className="fas fa-shopping-cart"></i>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/carrito">
            <Carrito />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
