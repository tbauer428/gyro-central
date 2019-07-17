import React from "react";
import "./App.css";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderID: "",
      currentOrderContents: [],
      data: [],
      currentPage: "LandingPage"
    };
  }

  componentDidMount = () => {
    this.loadOrders();
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

  addItemToOrder = (item, quantity) => {
    this.setState({
      currentOrderContents: [
        ...this.state.currentOrderContents,
        {
          ...item,
          quantity
        }
      ]
    });
  };

  render() {
    switch (this.state.currentPage) {
      case "LandingPage":
        return <LandingPage addOrder={this.addOrder} />;
      case "Menu":
        return <Menu submit={this.addItemToOrder} />;
      default:
        return;
    }
  }
}

export default App;
