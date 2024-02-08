import CouponsAction from '../actions/CouponsAction';

const initialState = {
  totalAmounts: {},
  couponDetails: {},
};

const CouponReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CouponsAction.types.APPLY_COUPON:
      return {
        ...state,
        couponDetails: action.payload,
      };
    case CouponsAction.types.CART_TOTALS:
      return {
        ...state,
        totalAmounts: action.payload,
      };
    default:
      return state;
  }
};

export default CouponReducer;
