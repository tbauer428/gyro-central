import React, { useState } from "react";
import MenuImages from "../data/MenuImages";
import { Button } from "semantic-ui-react";

const MenuItem = ({ item, submit, defaultValue, submitButtonText }) => {
  const [quantity, setQuantity] = useState(Number(defaultValue));

  const handleQuantity = e => {
    e.preventDefault();
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(item, quantity);
  };

  return (
    <div className="menu-item-container">
      <div>
        <img
          src={MenuImages[item.id - 1].src}
          alt={item.name}
          className={item.id === "2" ? "big-gyro-img" : "menu-item-img"}
        />
        <div>
          {item.name} ${item.price}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          defaultValue={defaultValue}
          min="1"
          onChange={handleQuantity}
        />
        <Button onClick={handleSubmit}>{submitButtonText}</Button>
      </form>
    </div>
  );
};

export default MenuItem;
