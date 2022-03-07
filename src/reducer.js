/** @format */
import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTALS } from './actions';
//reducer

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === INCREASE) {
    const { cart } = state;
    const tempCart = cart.map((item) => {
      let newAmount = item.amount + 1;
      if (item.id === action.payload.id) return { ...item, amount: newAmount };
      return item;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === DECREASE) {
    const { cart } = state;
    const { id, amount } = action.payload;
    let tempCart = [];
    let tempAmount = amount - 1;
    if (amount > 1) {
      tempCart = cart.map((item) => {
        if (id === item.id) {
          return { ...item, amount: tempAmount };
        }
        return item;
      });
    } else {
      tempCart = cart.filter((item) => {
        return id !== item.id;
      });
    }
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    const tempCart = state.cart.filter((item) => {
      return item.id !== action.payload.id;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (acc, item) => {
        acc.total += item.amount * item.price;
        acc.amount += item.amount;
        return acc;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    return { ...state, total: parseFloat(total.toFixed(2)), amount };
  }

  return state;
};
