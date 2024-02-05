import {combineReducers} from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import GeneralSettingsReducer from './GeneralSettingsReducer';

export default combineReducers({
  generalState: GeneralReducer,
  cartState: CartReducer,
  generalSettingsState: GeneralSettingsReducer,
});
