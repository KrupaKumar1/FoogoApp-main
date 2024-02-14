import {PaymentAction} from '../actions';

const initialState = {
  orderDetails: {},
};

const PaymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PaymentAction.types.GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };

    default:
      return state;
  }
};

export default PaymentReducer;
