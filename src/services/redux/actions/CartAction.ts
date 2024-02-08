const types = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  GET_ORDER_ID: 'GET_ORDER_ID',
};

const addItemToCart = (cartItem: any) => {
  return {
    type: types.ADD_ITEM_TO_CART,
    payload: cartItem,
  };
};

const removeItems = () => {
  return {
    type: types.REMOVE_ITEM_FROM_CART,
    payload: [],
  };
};

const getOrderId = (orderId: any) => {
  return {
    type: types.GET_ORDER_ID,
    payload: orderId,
  };
};

export default {
  addItemToCart,
  types,
  removeItems,
  getOrderId,
};
