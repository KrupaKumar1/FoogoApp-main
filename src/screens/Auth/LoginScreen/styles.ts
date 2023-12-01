import {StyleSheet} from 'react-native';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import Display from '../../../utils/Display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DEFAULT_WHITE,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: Color.DARK_ONE,
  },
  title: {
    fontSize: 20,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Color.DARK_ONE,
  },
  content: {
    fontSize: 20,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Color.INACTIVE_GREY,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoImage: {
    height: 100,
    width: 100,
  },
  inputContainer: {
    backgroundColor: Color.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Color.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    fontFamily: Font.POPPINS_MEDIUM,
    height: Display.setHeight(6),
    textAlignVertical: 'center',
    padding: 0,
    color: Color.DEFAULT_BLACK,
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    marginTop: -8, // To provide a bit of spacing between the input and error text
    alignSelf: 'flex-start', // Align the error text to the left
  },
  forgotPasswordCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Color.DEFAULT_GREY,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Color.PRIMARY,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  signinButton: {
    backgroundColor: Color.PRIMARY,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  singinButtonText: {
    color: Color.DEFAULT_WHITE,
    fontSize: 18,
    lineHeight: 18 * 1.4,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Color.DEFAULT_BLACK,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  signUpText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: Color.PRIMARY,
    fontFamily: Font.POPPINS_MEDIUM,
    marginLeft: 5,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Color.DEFAULT_BLACK,
    fontFamily: Font.POPPINS_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
  },
  socialSignUpContainer: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    padiing: 5,
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: Color.DEFAULT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  googleButton: {
    backgroundColor: Color.DEFAULT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
  },
  signInButtonLogo: {
    width: 30,
    height: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
