import {StyleSheet} from 'react-native';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import Display from '../../../utils/Display';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY2,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
    marginBottom: 5,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: Font.POPPINS_BOLD,
    paddingLeft: 15,
  },
  mainSection: {
    flexDirection: 'column',
    padding: 12,
  },
  mainHeader: {
    fontSize: 16,
    fontFamily: Font.POPPINS_REGULAR,
    color: Color.DEFAULT_BLACK,
  },
  selectPaymentCard: {
    marginTop: 50,
  },
  cardSection: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderRadius: 30,
    borderBottomColor: Color.LIGHT_GREY,
    backgroundColor: Color.DEFAULT_GREEN,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Font.POPPINS_REGULAR,
    color: Color.DEFAULT_BLACK,
    marginRight: 10,
  },
  selectedOptiontext: {
    color: Color.DEFAULT_WHITE,
  },
  selectedOption: {
    backgroundColor: Color.PRIMARY,
  },
  placeOrderButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Display.setHeight(7),
    backgroundColor: Color.PRIMARY,
    borderRadius: 30,
    margin: 40,
  },
  placeOrderButton: {
    color: Color.DEFAULT_WHITE,
    fontFamily: Font.POPPINS_BOLD,
  },
});
