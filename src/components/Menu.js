import React from "react";
import { menuData } from "../data/MenuData.json";
import MenuItem from "./MenuItem";

const Menu = ({ submit }) => (
  <div className="Menu">
    <div>Menu</div>
    {menuData.map(item => (
      <MenuItem item={item} submit={submit} />
    ))}
  </div>
);

export default Menu;
