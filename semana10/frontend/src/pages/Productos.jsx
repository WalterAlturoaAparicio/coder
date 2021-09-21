/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const Productos = (props) => {
  const [products, setProducts] = React.useState([]);
  async function getProducts() {
    let res = await fetch("http://localhost:8080/productos", {
      method: "GET",
    });
    res = await res.json();
    console.log(res)
    return res.products;
  }
  async function loadProducts() {
    const productos = await getProducts();
    setProducts(productos);
  }
  async function eliminarProducto(id) {
    let res = await fetch(`http://localhost:8080/productos/${id}`, {
      method: "DELETE",
    });
    res = await res.json();
    return res;
  }
  async function guardarProducto(id, thumbnail) {
    const code = document.querySelector('.code').value;
    const price = Number(document.querySelector('.price').value);
    const title = document.querySelector('.title').value;
    const description = document.querySelector('.description').value;
    const stock = Number(document.querySelector('.stock').value);
    let res = await fetch(`http://localhost:8080/productos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
            title,
            price,
            stock,
            description,
            code,
            thumbnail,
        })
    });
    res = await res.json();
    return res;
  }
  useEffect(() => {
    loadProducts();
  });

  return (
    <div className="container">
      <div className="lista">
        {products.map((producto) => {
          return (
            <form className="cardBox2" key={producto._id}>
              <img src={producto.thumbnail} alt="thumbnail" className="icon" />
              <div>
                <label htmlFor="info">Fecha de publicación</label>
                <br />
                <div className="fecha">{producto.date}</div>
                <br />
                <label htmlFor="info">Producto</label>
                <br />
                <input
                  className="title"
                  type="text"
                  defaultValue={producto.title}
                />
                <br />
                <label htmlFor="info">Code</label>
                <br />
                <input
                  className="code"
                  type="text"
                  defaultValue={producto.code}
                />
                <br />
                <label htmlFor="info">Descripción</label>
                <br />
                <input
                  className="description"
                  type="text"
                  defaultValue={producto.description}
                />
                <br />
                <label htmlFor="info">Unidades en Stock</label>
                <br />
                <input
                  className="stock"
                  type="number"
                  defaultValue={producto.stock}
                  min={0}
                />
                <br />
                <label htmlFor="info">Precio</label>
                <br />
                <input
                  className="price"
                  type="number"
                  defaultValue={producto.price}
                  min={0}
                  step="0.01"
                />
                <br />
                <button
                  onClick={() => guardarProducto(producto._id, producto.thumbnail)}
                  className="buy"
                  type="button"
                >
                  Guardar cambios
                </button>
              </div>

              <div>
                
                <button onClick={() => eliminarProducto(producto._id)} return false>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
};
export default Productos;
