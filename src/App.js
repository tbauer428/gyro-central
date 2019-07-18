import React from "react";
import "./App.css";
import axios from "axios";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import HeaderBar from "./components/HeaderBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderID: "",
      currentOrderContents: [],
      data: [],
      currentPage: "Welcome",
      modal: ""
    };

    this.eventSource = new EventSource("/EventSource");
  }

  componentDidMount = () => {
    this.loadOrders();
    this.eventSource.onopen = () => console.log("Connection to Backend Open");
    this.eventSource.onmessage = e => console.log(e.data);
    this.eventSource.onerror = e =>
      console.log("Connection to Backend Errored Out");
  };

  loadOrders = e => {
    axios.get("/orders/all").then(response => {
      this.setState({
        data: response.data
      });
    });
  };

  addOrder = e => {
    axios.post("orders/add").then(response =>
      this.setState({
        currentOrderID: response.data.id,
        currentPage: "Menu"
      })
    );
  };

  changeCurrentPage = newCurrentPage => {
    this.setState({
      currentPage: newCurrentPage
    });
  };

  checkItemsInOrder = itemToBeEvaluated => {
    let check = 0;
    this.state.currentOrderContents.map(item => {
      if (item.id === itemToBeEvaluated.id) {
        check = 1;
      }
    });
    return check === 1;
  };

  addItemToOrder = (newItem, quantity) => {
    if (this.checkItemsInOrder(newItem)) {
      let itemToBeUpdated = {};
      this.state.currentOrderContents.map(itemCurrentlyInCart => {
        if (itemCurrentlyInCart.id === newItem.id) {
          itemToBeUpdated = itemCurrentlyInCart;
        }
        return null;
      });

      itemToBeUpdated = {
        ...itemToBeUpdated,
        quantity: itemToBeUpdated.quantity + quantity
      };
      let newOrderContents = this.state.currentOrderContents.map(item => {
        if (item.id === itemToBeUpdated.id) {
          return itemToBeUpdated;
        } else {
          return item;
        }
      });
      this.setState({
        currentOrderContents: newOrderContents
      });
    } else {
      this.setState({
        currentOrderContents: [
          ...this.state.currentOrderContents,
          {
            ...newItem,
            quantity
          }
        ]
      });
    }
  };

  handleUpdateQuantity = (item, quantity) => {
    const updatedOrderContents = this.state.currentOrderContents.map(
      itemInCart => {
        if (itemInCart.id === item.id) {
          itemInCart.quantity = quantity;
        }
        return itemInCart;
      }
    );
    this.setState({
      currentOrderContents: updatedOrderContents
    });
  };

  handleCheckout = () => {
    if (this.state.currentOrderContents.length < 1) {
      this.setState({ modal: "noItemsInOrder" });
    } else {
      this.setState({
        currentPage: "Cart"
      });
    }
  };

  handleCancelOrder = () => {
    axios.get("/orders/all").then(response => {
      this.setState({
        data: response.data,
        currentOrderContents: [],
        currentOrderID: "",
        currentPage: "Welcome"
      });
    });
  };

  resetModal = () => {
    this.setState({
      modal: ""
    });
  };

  render() {
    switch (this.state.currentPage) {
      case "Welcome":
        return (
          <>
            <Welcome addOrder={this.addOrder} />
          </>
        );
      case "Menu":
        return (
          <>
            <HeaderBar
              changeCurrentPage={this.changeCurrentPage}
              currentPage={this.state.currentPage}
              handleCheckout={this.handleCheckout}
              modalStatus={this.state.modal}
              resetModal={this.resetModal}
            />
            <Menu submit={this.addItemToOrder} checkout={this.handleCheckout} />
          </>
        );
      case "Cart":
        return (
          <>
            <HeaderBar
              changeCurrentPage={this.changeCurrentPage}
              currentPage={this.state.currentPage}
              handleCheckout={this.handleCheckout}
              modalStatus={this.state.modal}
              resetModal={this.resetModal}
            />
            <Cart
              currentOrderContents={this.state.currentOrderContents}
              submit={this.handleUpdateQuantity}
              currentOrderID={this.state.currentOrderID}
              handleCancelOrder={this.handleCancelOrder}
              currentPage={this.state.currentPage}
            />
          </>
        );
      default:
        return;
    }
  }
}

export default App;
