import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/action';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {

  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('https://lmdung-burger-default-rtdb.firebaseio.com/ingredients.json')
    //   .then((res) => {
    //     this.setState({ingredients: res.data})
    //   })
    //   .catch(err => {
    //     this.setState({error: true})
    //   })
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updateCount = oldCount + 1;
  //   const updateIngredient = {...this.state.ingredients};
  //   updateIngredient[type] = updateCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updateIngredient})
  //   this.updatePurchaseState(updateIngredient)
  // }
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updateCount = oldCount - 1;
  //   const updateIngredient = {...this.state.ingredients};
  //   updateIngredient[type] = updateCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updateIngredient})
  //   this.updatePurchaseState(updateIngredient)
  // }

  updatePurchaseState(ingredients) {
    // console.log(ingredients)
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({purchasable : sum > 0}) //true or false
    return sum > 0
    // console.log(sum)
  }
  // don't call this in traditional functions
  // purchaseHandler () {
  //   this.setState({purchasing : true})
  // }
  purchaseHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing : false})
  }

  purchaseContinueHandler = () => {
    // alert('You continue !')
    // let queryParams = [];
    // for(let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.props.price.toFixed(2))
    // let queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // })
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfor = {...this.props.ingredients};
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0; // true or false
    }
    // console.log(disabledInfor)
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner />
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfor}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}/>
        </Aux>
      )
      orderSummary = <OrderSummary 
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price}/>
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      // use shouldComponentUpdate in Modal to update the OrderSummary because OrderSummary wrapped by Modal
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingName: ingName}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));