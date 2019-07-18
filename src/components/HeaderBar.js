import React from "react";
import { Header, Modal, Button } from "semantic-ui-react";
import MenuImg from "../assets/MenuImg.svg";
import CartImg from "../assets/CartImg.svg";

const HeaderBar = ({
  changeCurrentPage,
  currentPage,
  handleCheckout,
  modalStatus,
  resetModal,
  cartCount
}) => (
  <div className="HeaderBar">
    <Header size="huge" block>
      <div className="header-bar-interior">
        <img
          src={MenuImg}
          alt="Go to menu"
          onClick={
            currentPage !== "Menu" ? () => changeCurrentPage("Menu") : null
          }
          className="header-bar-button"
        />
        <div>{currentPage}</div>
        <div className="cart-icon-container">
          {cartCount}
          <img
            src={CartImg}
            alt="Go to cart"
            onClick={currentPage !== "Cart" ? handleCheckout : null}
            className="header-bar-button"
          />
        </div>
      </div>
    </Header>
    <Modal open={modalStatus === "noItemsInOrder"} size="mini">
      <Modal.Header>
        <div className="modal-header">What were you thinking?!</div>
      </Modal.Header>
      <Modal.Content>
        <div className="modal-content">
          You haven't even added any food to your order!!!
        </div>
      </Modal.Content>
      <div className="modal-button">
        <Button onClick={resetModal}>Wow, you were right.</Button>
      </div>
    </Modal>
  </div>
);

export default HeaderBar;
