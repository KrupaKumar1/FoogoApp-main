const types = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  CUSTOMIZATION_IN : "CUSTOMIZATION_IN",
  ADDITEM_IN : "ADDITEM_IN",
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  ORDERDETAILS_IN : "ORDERDETAILS_IN",
  ITEMUPDATE_IN_MENUITEM :"ITEMUPDATE_IN_MENUITEM",
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
//  const additemIn = (data:any) => {
//   return {
//     type: types.ADDITEM_IN,
//     payload: data,
//   };
// };
//  const customizationIn = (data:any) => {
//   return {
//     type: types.CUSTOMIZATION_IN,
//     payload: data,
//   };
// };
 const sameitemupdateIn = (qty:any) => {
  return {
    type: types.ITEMUPDATE_IN_MENUITEM,
    payload: {
      item: qty,
    },
  };
};
 const orderdetailsIn = (data:any) => {
  return {
    type: types.ORDERDETAILS_IN,
    payload: {
      id: Math.random(),
      data: data,
    },
  };
};


export default {
  addItemToCart,
  types,
  removeItems,
  additemIn,
  customizationIn,
  sameitemupdateIn,
  orderdetailsIn,
};
