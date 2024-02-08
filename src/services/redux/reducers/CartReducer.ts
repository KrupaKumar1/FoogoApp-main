import CartAction from '../actions/CartAction';

const initialState = {
  cartItems: [],
};

const CartReducer = (state = initialState, action: any,payload:any) => {
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

      case CartAction.types.ITEMUPDATE_IN_MENUITEM:
      const { item } = action.payload;
 
      const itemobjIndex = state.cartItems.findIndex(
        (obj:any) => obj.responseOrder.id === item.responseOrder.id
        //  &&
        // ((item.spicy && obj.data.customFieldListItem === item.spicy) ||
        //   (!item.spicy && !obj.data.customFieldListItem)) &&
        // (!item.subItem ||
        //   (obj.data.subItem && obj.data.subItem.id === item.subItem.id)) &&
        // (item.addons.length === 0 ||
        //   (obj.data.addons.length !== 0 &&
        //     compareArrays(obj.data.addons, item.addons)))
      );
 
      state.cartItems[itemobjIndex].qty += item.qty;
      state.cartItems[itemobjIndex].addonsamount1 =
        state.cartItems[itemobjIndex].addonsamount1 + item?.addonsamount1;
      return {
        ...state,
        
        cartItems: [...state.cartItems],
       
 
        // updatedResponse : data1.responseOrder
      };
      case CartAction.types.ORDERDETAILS_IN:
      const { id, data } =  action.payload;
      return {
        ...state,
 
        cartItems: [
          ...state.cartItems,
          {
            id: id,
            data: data,
          },
        ],
      
      };

    default:
      return state;
  }
};

export default CartReducer;
