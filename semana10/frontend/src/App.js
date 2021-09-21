import React from "react";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Productos from "./pages/Productos";

const App = () => {
  const [admin, setAdmin] = React.useState(false);

  async function changeAdmin() {
    const adminState = await setStateAdmin();
    setAdmin(adminState.isAdmin);
  }
  async function setStateAdmin() {
    let res = await fetch("http://localhost:8080/isAdmin", {
      method: "POST",
    });
    res = res.json();
    return res;
  }
  async function getStateAdmin() {
    let res = await fetch("http://localhost:8080/isAdmin", {
      method: "GET",
    });
    res = res.json();
    return res;
  }
  async function getAdmin() {
    const adminState = await getStateAdmin();
    setAdmin(adminState.isAdmin);
  }
  React.useEffect(() => {
    getAdmin();
  }, []);
  return (
    <Router>
      <div>
        <nav className="navbar">
          <button onClick={() => changeAdmin()} className="buy">
            Set Admin
          </button>
          <div className="max-width">
            {admin ? (
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
          <Route path="/productos">
            <Productos />
          </Route>
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
