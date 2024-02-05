import {Dimensions, PixelRatio} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Responsive width
export const responsiveWidth = (percentage: any) => wp(percentage);

// Responsive height
export const responsiveHeight = (percentage: any) => hp(percentage);

// Responsive font size
export const responsiveFontSize = (fontSize: any) =>
  PixelRatio.getFontScale() * fontSize;

// Scale font based on screen size
export const scaleFont = (size: any) => size * (screenWidth / 375); // Standard width for scaling

// Responsive margin and padding
export const responsiveMargin = (margin: any) => scaleFont(margin);
export const responsivePadding = (padding: any) => scaleFont(padding);

// Add more utility functions as needed
