const types = {
  GENERALSETTINGSEFFECTED: 'GENERALSETTINGSEFFECTED',
  FUNCTIONALITYRULES: 'FUNCTIONALITYRULES',
  RECIEVEORDERS: 'RECIEVEORDERS',
  CONTACTINFORMATION: 'CONTACTINFORMATION',
  OPENINGTIMINGS: 'OPENINGTIMINGS',
  PREPARATIONTIMINGS: 'PREPARATIONTIMINGS',
};

const generalEffectedArea = (settings: any) => {
  return {
    type: types.GENERALSETTINGSEFFECTED,
    payload: settings,
  };
};

export default {
  generalEffectedArea,
  types,
};
