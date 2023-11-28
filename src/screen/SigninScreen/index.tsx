import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';


import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../constant/Color';
import Separator from '../../components/Seperator';
import Font from '../../constant/Font';
import Display from '../../utils/Display';
import ToggleButton from '../../components/ToggleButton';
import Images from '../../constant/Images';

const SignInScreen = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Color.DEFAULT_WHITE}
          translucent
        />
        <Separator extraProps={{}} height={StatusBar.currentHeight} />
      </SafeAreaView>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>
        Enter your username and password, and enjoy ordering food
      </Text>
      <Separator extraProps={{}} height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Color.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="username"
            placeholderTextColor={Color.DEFAULT_GREY}
            selectionColor={Color.DEFAULT_GREY}
            style={styles.inputText}
          />
        </View>
      </View>
      <Separator extraProps={{}} height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Color.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={!isPasswordShow}
            placeholder="password"
            placeholderTextColor={Color.DEFAULT_GREY}
            selectionColor={Color.DEFAULT_GREY}
            style={styles.inputText}
          />
          <Feather
            name={!isPasswordShow ? 'eye-off' : 'eye'}
            size={22}
            color={Color.DEFAULT_GREY}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <View style={styles.forgotPasswordCOntainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text style={styles.forgotPasswordText}>ForgotPassword</Text>
      </View>
      <TouchableOpacity style={styles.signinButton}>
        <Text style={styles.singinButtonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
        </Text>
      </View>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.socialSignUpContainer}>
        <TouchableOpacity style={styles.facebookButton}>
          <Image style={styles.signInButtonLogo} source={Images.FACEBOOK} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Image style={styles.signInButtonLogo} source={Images.GOOGLE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
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
  },
  title: {
    fontSize: 20,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
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
    color: Color.DEFAULT_GREEN,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  signinButton: {
    backgroundColor: Color.DEFAULT_GREEN,
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
    color: Color.DEFAULT_GREEN,
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