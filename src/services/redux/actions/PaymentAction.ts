const types = {
  GET_ORDER_DETAILS: 'GET_ORDER_DETAILS',
};

const getOrderDetails = (data: any) => {
  return {
    type: types.GET_ORDER_DETAILS,
    payload: data,
  };
};

export default {
  types,
  getOrderDetails,
};
