const types = {
  CART_TOTALS: 'CART_TOTALS',
  APPLY_COUPON: 'APPLY_COUPON',
};

const applyCoupon = (couponCode: any) => {
  return {
    type: types.APPLY_COUPON,
    payload: couponCode,
  };
};

const updateCartTotals = (cartTotals: any) => {
  return {
    type: types.CART_TOTALS,
    payload: cartTotals,
  };
};

export default {
  applyCoupon,
  types,
  updateCartTotals,
};
