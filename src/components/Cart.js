import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { Button } from "semantic-ui-react";
import axios from "axios";

const Cart = ({
  currentOrderContents,
  submit,
  currentOrderID,
  handleCancelOrder,
  total,
  resetCart
}) => {
  const [address, setAddress] = useState("");

  const handleAddress = e => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const sendOrder = (address, currentOrderID, currentOrderContents) => {
    axios.put(`/orders/update/${currentOrderID}`, {
      id: currentOrderID,
      orderItems: currentOrderContents,
      deliveryAddress: address
    });
    resetCart();
  };

  const cancelOrder = currentOrderID => {
    axios.delete(`/orders/delete/${currentOrderID}`);
    handleCancelOrder();
  };

  return (
    <div>
      <div>
        {currentOrderContents.map(orderItem => {
          return (
            <MenuItem
              item={orderItem}
              submit={submit}
              defaultValue={orderItem.quantity}
              key={orderItem.id}
              submitButtonText="Update"
            />
          );
        })}
      </div>
      <div className="cart-order-container">
        <div>
          <h3>Total (pre-tax): ${total}</h3>
          <h3>VAT: ${(total * 0.13).toFixed(2)}</h3>
          <h3>
            Total: $
            {(Number(total) + Number((total * 0.13).toFixed(2))).toFixed(2)}
          </h3>
        </div>
        <input type="text" placeholder="Your address" onKeyUp={handleAddress} />
        <div className="cart-buttons">
          <Button
            primary
            onClick={() =>
              sendOrder(address, currentOrderID, currentOrderContents)
            }
          >
            Send Order
          </Button>
          <Button onClick={() => cancelOrder(currentOrderID)}>
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
