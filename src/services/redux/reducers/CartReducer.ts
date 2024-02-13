import CartAction from '../actions/CartAction';

const initialState = {
  cartItems: [],
  orderId: null,
};

const CartReducer = (state = initialState, action: any, payload: any) => {
  switch (action.type) {
    case CartAction.types.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CartAction.types.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CartAction.types.REDUCE_QUANTITY:
      const {dataQuantityReduce} = action.payload;
      const objIndexQuantityReduce = state.cartItems.findIndex(
        obj => obj.id === dataQuantityReduce.id,
      );
      const updatedQuantity = Math.max(dataQuantityReduce.qty - 1, 1);
      // Create a new array with the updated quantity

      const updatedItemList = state.cartItems.map((item, index) =>
        index === objIndexQuantityReduce
          ? {...item, qty: updatedQuantity}
          : item,
      );

      return {
        ...state,
        cartItems: updatedItemList,
      };

    case CartAction.types.ITEMUPDATE_IN_MENUITEM:
      const {item} = action.payload;

      const itemobjIndex = state.cartItems.findIndex(
        (obj: any) => obj.responseOrder.id === item.responseOrder.id,
        //  &&
        // ((item.spicy && obj.data.customFieldListItem === item.spicy) ||
        //   (!item.spicy && !obj.data.customFieldListItem)) &&
        // (!item.subItem ||
        //   (obj.data.subItem && obj.data.subItem.id === item.subItem.id)) &&
        // (item.addons.length === 0 ||
        //   (obj.data.addons.length !== 0 &&
        //     compareArrays(obj.data.addons, item.addons)))
      );

      state.cartItems[itemobjIndex].qty += 1;
      state.cartItems[itemobjIndex].addonsamount1 =
        state.cartItems[itemobjIndex].addonsamount1 + item?.addonsamount1;
      return {
        ...state,

        cartItems: [...state.cartItems],

        // updatedResponse : data1.responseOrder
      };
    case CartAction.types.ORDERDETAILS_IN:
      return {
        ...state,

        cartItems: [...state.cartItems, action.payload],
      };

    case CartAction.types.GET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    default:
      return state;
  }
};

export default CartReducer;
