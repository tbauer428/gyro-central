import React from "react";
import "./App.css";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderID: "",
      currentOrderContents: [],
      data: [],
      currentPage: "LandingPage"
    };

    this.eventSource = new EventSource("/EventSource");
  }

  componentDidMount = () => {
    this.loadOrders();
    this.eventSource.onmessage = e => console.log(e.data);
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
    this.setState({
      currentPage: "Cart"
    });
  };

  handleCancelOrder = () => {
    axios.get("/orders/all").then(response => {
      this.setState({
        data: response.data,
        currentOrderContents: [],
        currentOrderID: "",
        currentPage: "LandingPage"
      });
    });
  };

  render() {
    switch (this.state.currentPage) {
      case "LandingPage":
        return <LandingPage addOrder={this.addOrder} />;
      case "Menu":
        return (
          <Menu submit={this.addItemToOrder} checkout={this.handleCheckout} />
        );
      case "Cart":
        return (
          <Cart
            currentOrderContents={this.state.currentOrderContents}
            submit={this.handleUpdateQuantity}
            currentOrderID={this.state.currentOrderID}
            handleCancelOrder={this.handleCancelOrder}
          />
        );
      default:
        return;
    }
  }
}

export default App;
