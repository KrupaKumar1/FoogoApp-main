import {combineReducers} from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import GeneralSettingsReducer from './GeneralSettingsReducer';
import CouponReducer from './CouponReducer';
import PaymentReducer from './PaymentReducer';

export default combineReducers({
  generalState: GeneralReducer,
  cartState: CartReducer,
  generalSettingsState: GeneralSettingsReducer,
  appliedCouponState: CouponReducer,
  paymentState: PaymentReducer,
});
