/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Gradients from "../components/Gradients";
import ProductImages from "../components/ProductImages";
import Info from "../components/Info/Info";

const Home = (props) => {
  const [data, setData] = React.useState([]);
  
  var sizes, colors, gradients;
  var shoes, shoeBackground, shoeHeight;
  var prevColor = "blue";
  var animateOrNot = true;  
  
  async function getData() {
    let res = await fetch("http://localhost:8080/api/productos", {
      method: "GET",
    });
    res = res.json();
    return res;
  }
  async function loadData() {
    const dataServer = await getData();
    setData(dataServer);
  }
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
  // const changeHeight = () => {
  //   var x = window.matchMedia("(max-width:1000px)");

  //   !shoes ? (shoeHeight = 0) : (shoeHeight = shoes[0].offsetHeight);

  //   if (x.matches) {
  //     if (shoeHeight === 0) {
  //       try {
  //         setTimeout(changeHeight, 50);
  //       } catch (error) {
  //         alert("Something is Wrong!!");
  //       }
  //     }
  //     shoeBackground.style.height = `${shoeHeight * 0.9}px`;
  //   } else if (!!shoeBackground) {
  //     // go back to default
  //     shoeBackground.style.height = "475px";
  //   }
  // };

  useEffect(() => {
    sizes = document.querySelectorAll(".size");
    colors = document.querySelectorAll(".color");
    shoes = document.querySelectorAll(".shoe");
    gradients = document.querySelectorAll(".gradient");
    shoeBackground = document.querySelector(".shoeBackground");

    colors.forEach((color) => color.addEventListener("click", changeColor));
    sizes.forEach((size) => size.addEventListener("click", changeSize));
    //changeHeight();
    loadData();
  }, []);
  //window.addEventListener("resize", changeHeight);

  return (
    <div className="Home">
      <div className="container">
        {data.map((product) => {
          return (
            <div className="card" key={product.id}>
              <div className="shoeBackground">
                <Gradients />

                <a href="/#" className="share">
                  <i className="fas fa-share-alt"></i>
                </a>

                <ProductImages urlImage={product.thumbnail}/>
              </div>
              <Info product={product}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
