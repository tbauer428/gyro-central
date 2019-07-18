import React from "react";
import { menuData } from "../data/MenuData.json";
import { Button } from "semantic-ui-react";
import MenuItem from "./MenuItem";

const Menu = ({ submit, checkout, adjustCartCount }) => (
  <div className="Menu">
    <div className="menu-items">
      {menuData.map(item => (
        <MenuItem
          item={item}
          submit={submit}
          key={item.id}
          defaultValue="1"
          submitButtonText="Add to Order"
        />
      ))}
    </div>
    <Button primary onClick={checkout}>
      Checkout
    </Button>
  </div>
);

export default Menu;
