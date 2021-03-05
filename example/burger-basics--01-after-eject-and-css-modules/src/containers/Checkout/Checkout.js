import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  // componentDidMount() {  chạy sau render nên nếu ingredients null sẽ lỗi
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let params of query.entries()) {
      //  ["bacon", "2"]
      if (params[0] === "price") {
        price = +params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }
    this.setState({ingredients: ingredients, price: price});
    console.log(price)
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
          path={this.props.match.url + '/contact-data'} 
          render={() => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price}/>)} />
      </div>
    )
  }
};

export default Checkout;