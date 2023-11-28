import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const setHeight = (h: any) => (height / 100) * h;

const setWidth = (w: any) => (width / 100) * w;

export default { setHeight, setWidth };