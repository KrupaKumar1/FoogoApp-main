const types = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  CUSTOMIZATION_IN: 'CUSTOMIZATION_IN',
  ADDITEM_IN: 'ADDITEM_IN',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  ORDERDETAILS_IN: 'ORDERDETAILS_IN',
  ITEMUPDATE_IN_MENUITEM: 'ITEMUPDATE_IN_MENUITEM',
  GET_ORDER_ID: 'GET_ORDER_ID',
  REDUCE_QUANTITY:"REDUCE_QUANTITY",
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
 const additemIn = (data:any) => {
  return {
    type: types.ADDITEM_IN,
    payload: data,
  };
};
 const customizationIn = (data:any) => {
  return {
    type: types.CUSTOMIZATION_IN,
    payload: data,
  };
};
 const reduceQuantity = (qty) => {
  return {
    type: types.REDUCE_QUANTITY,
    payload: {
      dataQuantityReduce: qty,
    },
  };
};
const sameitemupdateIn = (qty: any) => {
  return {
    type: types.ITEMUPDATE_IN_MENUITEM,
    payload: {
      item: qty,
    },
  };
};
const orderdetailsIn = (data: any) => {
  return {
    type: types.ORDERDETAILS_IN,
    payload: {...data,cartUniqueId:new Date().getTime().toString()
    },
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
  additemIn,
  customizationIn,
  reduceQuantity,
  sameitemupdateIn,
  orderdetailsIn,
  getOrderId,
};
