import React, { useEffect } from "react";
import Gradients from "../components/Gradients";
import ProductImages from "../components/ProductImages";
import Info from "../components/Info/Info";

const Home = () => {
  var sizes, colors, gradients;
  var shoes, shoeBackground, shoeHeight;
  var prevColor = "blue";
  var animateOrNot = true;

  function changeColor() {
    if (!animateOrNot) {
      console.log("waittttt");
      return;
    }
    var primary = this.getAttribute("primary");
    var color = this.getAttribute("color");
    var shoe = document.querySelector(`.shoe[color="${color}"]`);
    var gradient = document.querySelector(`.gradient[color="${color}"]`);
    var prevGradient = document.querySelector(
      `.gradient[color="${prevColor}"]`
    );

    // showing correct color
    colors.forEach((color) => color.classList.remove("active"));
    this.classList.add("active");

    // changing primary css variable
    document.documentElement.style.setProperty("--primary", primary);

    // showing correct img
    shoes.forEach((s) => s.classList.remove("show"));
    shoe.classList.add("show");

    // dealing with gradient
    gradients.forEach((g) => g.classList.remove("display", "behind"));
    prevGradient.classList.add("behind");
    gradient.classList.add("display");

    // logic
    prevColor = color;
    animateOrNot = false;

    // hack
    setTimeout(() => {
      animateOrNot = true;
    }, 800);
  }

  function changeSize() {
    sizes.forEach((size) => size.classList.remove("active"));
    this.classList.add("active");
  }

  // for responsive behaviour
  const changeHeight = () => {
    var x = window.matchMedia("(max-width:1000px)");

    !shoes ? (shoeHeight = 0) : (shoeHeight = shoes[0].offsetHeight);

    if (x.matches) {
      if (shoeHeight === 0) {
        try {
          setTimeout(changeHeight, 50);
        } catch (error) {
          alert("Something is Wrong!!");
        }
      }
      shoeBackground.style.height = `${shoeHeight * 0.9}px`;
    } else if (!!shoeBackground) {
      // go back to default
      shoeBackground.style.height = "475px";
    }
  };

  useEffect(() => {
    sizes = document.querySelectorAll(".size");
    colors = document.querySelectorAll(".color");
    shoes = document.querySelectorAll(".shoe");
    gradients = document.querySelectorAll(".gradient");
    shoeBackground = document.querySelector(".shoeBackground");

    colors.forEach((color) => color.addEventListener("click", changeColor));
    sizes.forEach((size) => size.addEventListener("click", changeSize));
    changeHeight();
  }, []);
  window.addEventListener("resize", changeHeight);

  return (
    <div className="Home">
      <nav className="navbar">
        <div className="max-width">
            <ul className="menu">
                <li><a href="#" className="menu-btn">Home</a></li>
                <li><a href="#card" className="menu-btn">Products</a></li>
                <li><a href="#carrito" className="menu-btn"><i className="fas fa-shopping-cart"></i></a></li>
            </ul>
        </div>
    </nav>
      <div className="container">
        <div className="card">
          <div className="shoeBackground">
            <Gradients />

            <a href="/#" className="share">
              <i className="fas fa-share-alt"></i>
            </a>

            <ProductImages />
          </div>
          <Info />
        </div>
        <div className="card">
          <div className="shoeBackground">
            <Gradients />

            <a href="/#" className="share">
              <i className="fas fa-share-alt"></i>
            </a>

            <ProductImages />
          </div>
          <Info />
        </div>
      </div>
    </div>
  );
};

export default Home;
