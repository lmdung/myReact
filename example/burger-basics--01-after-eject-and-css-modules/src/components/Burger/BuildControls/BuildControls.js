import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const control = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {control.map(ctr => (
      <BuildControl 
        key={ctr.label} 
        label={ctr.label}
        added={() => props.ingredientAdded(ctr.type)}
        removed={() => props.ingredientRemoved(ctr.type)}
        disabled={props.disabled[ctr.type]}/>
    ))}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>ORDER NOW</button>
  </div>
)

export default buildControls;
