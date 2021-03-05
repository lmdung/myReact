import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        
        console.log(fetchedOrders);
        this.setState({loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
      })
  }
  render() {
    return(
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);