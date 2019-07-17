import React from "react";
import MenuItem from "./MenuItem";

const Cart = ({ currentOrderContents, submit }) => (
  <div>
    <div>Cart</div>
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
  </div>
);

export default Cart;
