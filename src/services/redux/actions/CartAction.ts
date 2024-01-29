const types = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
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

export default {
  addItemToCart,
  types,
  removeItems,
};
