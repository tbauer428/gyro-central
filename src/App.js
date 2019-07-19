import React from "react";
import "./App.css";
import axios from "axios";
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import HeaderBar from "./components/HeaderBar";
import ProgressPage from "./components/ProgressPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderID: "",
      currentOrderContents: [],
      data: [],
      currentPage: "Welcome",
      modal: "",
      cartCount: 0,
      total: 0
    };

    //this.eventSource = new EventSource("/EventSource");
  }

  componentDidMount = () => {
    this.loadOrders();
    // this.eventSource.onopen = () => console.log("Connection to Backend Open");
    // this.eventSource.onmessage = e => console.log(e.data);
    // this.eventSource.onerror = e =>
    //   console.log("Connection to Backend Errored Out");
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
    // eslint-disable-next-line array-callback-return
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
    this.adjustCartCount(quantity);
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
    this.setState(
      {
        currentOrderContents: updatedOrderContents
      },
      () => {
        this.calculateTotal();
        this.calculateNumberItemsInCart();
      }
    );
  };

  handleCheckout = () => {
    if (this.state.currentOrderContents.length < 1) {
      this.setState({ modal: "noItemsInOrder" });
    } else {
      this.setState({
        currentPage: "Cart"
      });
      this.calculateNumberItemsInCart();
      this.calculateTotal();
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

  calculateNumberItemsInCart = () => {
    let totalItems = 0;
    this.state.currentOrderContents.map(
      orderItem => (totalItems += orderItem.quantity)
    );
    this.setState({ cartCount: totalItems });
  };

  calculateTotal = () => {
    let total = 0;
    this.state.currentOrderContents.map(
      orderItem => (total += orderItem.quantity * orderItem.price)
    );
    this.setState({ total: total.toFixed(2) });
  };

  adjustCartCount = quantity => {
    this.setState({ cartCount: this.state.cartCount + quantity });
  };

  resetCart = () => {
    this.setState({
      currentOrderContents: [],
      currentPage: "Progress",
      cartCount: 0,
      total: 0
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
              cartCount={this.state.cartCount}
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
              cartCount={this.state.cartCount}
            />
            <Cart
              resetCart={this.resetCart}
              currentOrderContents={this.state.currentOrderContents}
              submit={this.handleUpdateQuantity}
              currentOrderID={this.state.currentOrderID}
              handleCancelOrder={this.handleCancelOrder}
              total={this.state.total}
            />
          </>
        );
      case "Progress":
        return (
          <>
            <HeaderBar
              changeCurrentPage={this.changeCurrentPage}
              currentPage={this.state.currentPage}
              handleCheckout={this.handleCheckout}
              modalStatus={this.state.modal}
              resetModal={this.resetModal}
              cartCount={this.state.cartCount}
            />
            <ProgressPage />
          </>
        );
      default:
        return;
    }
  }
}

export default App;
