import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { Button } from "semantic-ui-react";
import axios from "axios";

const sendOrder = (address, currentOrderID, currentOrderContents) => {
  axios.put(`/orders/update/${currentOrderID}`, {
    id: currentOrderID,
    orderItems: currentOrderContents,
    deliveryAddress: address
  });
};

const Cart = ({
  currentOrderContents,
  submit,
  currentOrderID,
  handleCancelOrder,
  currentPage
}) => {
  const [address, setAddress] = useState("");

  const handleAddress = e => {
    e.preventDefault();
    setAddress(e.target.value);
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
