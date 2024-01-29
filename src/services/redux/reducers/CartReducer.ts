import CartAction from '../actions/CartAction';

const initialState = {
  cartItems: [],
};

const CartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CartAction.types.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CartAction.types.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default CartReducer;
