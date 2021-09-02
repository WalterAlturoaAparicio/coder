import React from "react";

const Info = (props) => {
  const shoeName = (
    <div className="shoeName">
      <div>
        <h1 className="big">{props.title}</h1>
        {/* <span className="new">new</span> */}
      </div>
      <h3 className="small">Code {props.code}</h3>
    </div>
  );

  const description = (
    <div className="description">
      <h3 className="title">Product Info</h3>
      <p className="text">{props.description}</p>
    </div>
  );

  // const ColorContainer = (
  //   <div className="color-container">
  //     <h3 className="title">Color</h3>
  //     <div className="colors">
  //       <span className="color active" primary="#2175f5" color="blue"></span>
  //       <span className="color" primary="#f84848" color="red"></span>
  //       <span className="color" primary="#29b864" color="green"></span>
  //       <span className="color" primary="#ff5521" color="orange"></span>
  //       <span className="color" primary="#444" color="black"></span>
  //     </div>
  //   </div>
  // );

  const SizeContainer = (
    <div className="size-container">
      {/* <h3 className="title"></h3> */}
      <div className="sizes">
        {/* <span className="size">7</span>
        <span className="size">8</span>
        <span className="size active">9</span>
        <span className="size">10</span>
        <span className="size">11</span> */}
        
      </div>
    </div>
  );

  const BuySection = (
    <div className="buy-price">
      <a href="/#" className="buy">
        <i className="fas fa-shopping-cart"></i>Add to card
      </a>
      <div className="price">
        <i className="fas fa-dollar-sign"></i>
        <h1>{props.price}</h1>
      </div>
    </div>
  );

  return (
    <div className="info">
      {shoeName}
      {description}
      {/* {ColorContainer} */}
      {SizeContainer}
      {BuySection}
    </div>
  );
};

export default Info;
