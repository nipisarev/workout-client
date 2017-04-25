import React, {Component} from 'react';
import {connect} from 'react-redux';
import {action} from '../../actions/itemActions';

import Button from "react-toolbox/lib/button";

export class Item extends Component {
  render() {
    return (
      <div>
        <div>{this.props.vote.rating}</div>
        <Button onClick={this.props.onIncrement}>+</Button>
        <Button onClick={this.props.onDecrement}>-</Button>
        <Button onClick={this.props.onReset}>reset</Button>
      </div>
    );
  }
}


export const ItemContainer = connect(
  (state) => state,
  (dispatch) => {
    return ({
      onIncrement: () => dispatch({type: action.INCREMENT}),
      onDecrement: () => dispatch({type: action.DECREMENT}),
      onReset: () => dispatch({type: action.RESET})
    })
  }
)(Item);
