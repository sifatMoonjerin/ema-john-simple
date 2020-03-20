import React, { useContext } from "react";




const Cart = props => {
  const cart = props.cart;
 
  const total = cart.reduce((total, product) => {
    return total + product.price*product.quantity}
    , 0);

  let shipping;
  if(total < 15 && total){
      shipping = 12.99
  } else if(total < 35 && total){
      shipping = 4.99
  } else{
      shipping = 0;
  }

  const tax = total*0.1;
  const grandTotal = total + shipping + tax;

  const formatNumber = num => Number(num.toFixed(2))

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Products Price: {formatNumber(total)}</p>
      <p><small>Tax: {formatNumber(tax)} </small></p>
      <p><small>Shipping: {formatNumber(shipping)} </small></p>
      <p>Total: {formatNumber(grandTotal)}</p>
      <br/>
      { props.children }
      
    </div>
  );
};

export default Cart;
