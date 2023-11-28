import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../../constant/Color';
import Separator from '../../../components/General/Seperator';

import ToggleButton from '../../../components/General/ToggleButton';
import Images from '../../../constant/Images';
import {styles} from './styles';

const LoginScreen = ({navigation}) => {
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
      {/* <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Log In</Text>
      </View> */}
      <Separator extraProps={{}} height={30} />
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://verasquare.in/0daf71ab0d56753aaec0c776aabb0c08.png',
          }}
          style={styles.LogoImage}
          resizeMode="contain"
        />
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
            style={{marginRight: 10}}
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
            style={{marginRight: 10}}
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
            style={{marginRight: 10}}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <View style={styles.forgotPasswordCOntainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </View>
      <TouchableOpacity style={styles.signinButton}>
        <Text style={styles.singinButtonText}>Log In</Text>
      </TouchableOpacity>
      {/* <View style={styles.signUpContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('Signup')}>
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
      </View> */}
    </View>
  );
};

export default LoginScreen;
