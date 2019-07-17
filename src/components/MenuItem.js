import React, { useState } from "react";

const MenuItem = ({ item, submit }) => {
  const [quantity, setQuantity] = useState("");

  const handleQuantity = e => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(item, quantity);
    setQuantity("");
  };

  return (
    <>
      <div>
        {item.name} ${item.price}
      </div>
      <form>
        <input
          type="number"
          defaultValue="1"
          min="1"
          onChange={handleQuantity}
        />
        <div onClick={handleSubmit}>Add to Order</div>
      </form>
    </>
  );
};

export default MenuItem;
