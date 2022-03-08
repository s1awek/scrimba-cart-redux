/** @format */
import { CLEAR_CART, REMOVE, GET_TOTALS, TOGGLE_AMOUNT } from './actions';
// items
import cartItems from './cart-items';
// initial store
const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};
export const reducer = (state = initialStore, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_AMOUNT) {
    const tempCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        let newAmount = item.amount - 1;
        if (action.payload.type === 'inc') {
          newAmount = item.amount + 1;
        }
        return { ...item, amount: newAmount };
      }
      return item;
    });
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
