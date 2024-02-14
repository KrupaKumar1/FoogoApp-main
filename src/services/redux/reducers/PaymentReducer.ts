import {PaymentAction} from '../actions';

const initialState = {
  orderDetails: {},
  paymentMethod: '',
};

const PaymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PaymentAction.types.GET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };

    case PaymentAction.types.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

export default PaymentReducer;
