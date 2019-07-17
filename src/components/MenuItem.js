import React, { useState } from "react";

const MenuItem = ({ item, submit, defaultValue, submitButtonText }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = e => {
    e.preventDefault();
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(item, quantity);
  };

  return (
    <>
      <div>
        {item.name} ${item.price}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          defaultValue={defaultValue}
          min="1"
          onChange={handleQuantity}
        />
        <div onClick={handleSubmit}>{submitButtonText}</div>
      </form>
    </>
  );
};

export default MenuItem;
