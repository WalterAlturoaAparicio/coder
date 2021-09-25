/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const Carrito = (props) => {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  let subTotal = 0;
  async function getProducts() {
    let res = await fetch("http://localhost:8080/carritos/tutd3tBCvUjit3USQzWX/productos", {
      method: "GET",
    });
    res = res.json();
    return res;
  }
  async function loadProducts() {
    const productos = await getProducts();
    setProducts(productos);
  }
  function sumaTotal() {
    products.map((producto) => {
      subTotal += Number(producto.price);
    });
    setTotal(Math.round(subTotal*100)/100);
  }
  async function eliminarProducto(id) {
    let res = await fetch(`http://localhost:8080/carritos/tutd3tBCvUjit3USQzWX/productos/${id}`, {
      method: "DELETE"
    });
    res = res.json();
    return res;
  }
  useEffect(() => {
    loadProducts();
    sumaTotal();
  });

  return (
    <div className="container">
      <div className="lista">

        {products.map((producto) => {
          return (
            <div className="cardBox" key={producto.id}>
              <img src={producto.thumbnail} alt="thumbnail" className="icon" />
              <div className="info">{producto.title}</div>
              <div className="info">{producto.code}</div>
              <div className="info">{producto.price}</div>
              <div>
                <button onClick = {()=>eliminarProducto(producto.id)}>
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
