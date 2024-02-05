import {GeneralSettings} from '../actions';
const initialState = {
  generalSettings: {},
  functionalityRules: {},
  recieveOrders: {},
  contactInformation: {},
  openingTimings: {},
  preparationTimings: {},
};
const GeneralSettingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GeneralSettings.types.GENERALSETTINGSEFFECTED:
      return {
        ...state,
        generalSettings: action.payload,
      };
    case GeneralSettings.types.FUNCTIONALITYRULES:
      return {
        ...state,
        functionalityRules: action.payload,
      };
    case GeneralSettings.types.RECIEVEORDERS:
      return {
        ...state,
        recieveOrders: action.payload,
      };
    case GeneralSettings.types.CONTACTINFORMATION:
      return {
        ...state,
        contactInformation: action.payload,
      };
    case GeneralSettings.types.OPENINGTIMINGS:
      return {
        ...state,
        openingTimings: action.payload,
      };
    case GeneralSettings.types.PREPARATIONTIMINGS:
      return {
        ...state,
        preparationTimings: action.payload,
      };

    default:
      return state;
  }
};

export default GeneralSettingsReducer;
