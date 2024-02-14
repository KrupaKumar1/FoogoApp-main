const types = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
};

const getOrderDetails = (data: any) => {
  return {
    type: types.GET_ORDER_DETAILS,
    payload: data,
  };
};

const paymentMethod = (paymentType: string) => {
  return {
    type: types.SET_PAYMENT_METHOD,
    payload: paymentType,
  };
};

export default {
  types,
  getOrderDetails,
  paymentMethod,
};
