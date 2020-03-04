import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContacData/ContacData";

class Checkout extends Component {
  state = {
    ingridients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingridients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad, '1']
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingridients[param[0]] = Number(param[1]);
      }
    }
    this.setState({ ingridients: ingridients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.state.ingridients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingridients={this.state.ingridients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
        />
      </div>
    );
  }
}

export default Checkout;
