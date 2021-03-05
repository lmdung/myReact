import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // tránh auto send data and reload page
    
    this.setState({loading : true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Le Dung',
        address: {
          street: 'Giai Phong',
          zipCode: '12345',
          country: 'VN'
        },
        email: 'test@123'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
      })
  } 
  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
        <Button 
          btnType="Success"
          clicked={this.orderHandler}>ORDER</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;