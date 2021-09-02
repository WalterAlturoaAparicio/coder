import React, { useEffect } from "react";

const Carrito = (props) => {
  const [products, setProducts] = React.useState([]);
  let total = 0;
  async function getProducts() {
    let res = await fetch("http://localhost:8082/api/carrito/1/productos", {
      method: "GET",
    });
    res = res.json();
    return res;
  }
  async function loadProducts() {
    const productos = await getProducts();
    setProducts(productos.products);
  }
  useEffect(() => {
    loadProducts();
    products.map((producto) => {
      total += producto.price;
    });
  });

  return (
    <div className="container">
      <div className="lista">
        {products.map((producto) => {
          return (
            <div className="cardBox">
              <img src={producto.thumbnail} alt="thumbnail" className="icon" />
              <div className="info">{producto.title}</div>
              <div className="info">{producto.code}</div>
              <div className="info">{producto.price}</div>
              <div>
                <button>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          );
        })}
        <div>
          <h2>TOTAL: {total}</h2>
        </div>
      </div>
    </div>
  );
};
export default Carrito;
