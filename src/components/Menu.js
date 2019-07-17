import React from "react";
import { menuData } from "../data/MenuData.json";
import MenuItem from "./MenuItem";

const Menu = ({ submit, checkout }) => (
  <div className="Menu">
    <div>Menu</div>
    {menuData.map(item => (
      <MenuItem
        item={item}
        submit={submit}
        key={item.id}
        defaultValue="1"
        submitButtonText="Add to Order"
      />
    ))}
    <div onClick={checkout}>Checkout</div>
  </div>
);

export default Menu;
