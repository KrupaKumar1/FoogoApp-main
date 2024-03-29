import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../../constant/Color';
import Separator from '../../../components/General/Seperator';
import ToggleButton from '../../../components/General/ToggleButton';
import {styles} from './styles';
import axios from 'axios';
import API_CALL from '../../../services/Api';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralAction} from '../../../services/redux/actions';
import StorageService from '../../../services/StorageService';

const locationApi: string = 'https://geolocation-db.com/json/';

const LoginScreen = ({navigation}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      // .matches(
      //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]/,
      //   'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      // )
      .required('Password is required'),
  });

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${locationApi}`);
      const dataip = res.data.IPv4;
      dispatch(GeneralAction.setUserIp(dataip));
    };
    getData();
  }, []);

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const handleEmailLogin = async (values: LoginFormValues) => {
    // Handle your email/password authentication logic
    const userId = values.email.trim();
    const password = values.password.trim();
    const lastLoginIP = '106.216.206.65';
    const isIPNotSame = true;
    const para: {
      userId: string;
      password: string;
      lastLoginIP: string;
      isIPNotSame: boolean;
    } = {
      userId,
      password,
      lastLoginIP,
      isIPNotSame,
    };

    API_CALL({
      method: 'post',
      url: 'Auth/Authenticate',
      data: para,
      headerConfig: {
        'Content-Type': 'application/json',
      },

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          if (data.successMessage === 'Success' && data.data.isActive) {
            dispatch(GeneralAction.setToken(`${data.data.userToken}`));
            dispatch(GeneralAction.setUserDetails(data.data));
            StorageService.setToken(data.data.userToken);
          } else {
            Alert.alert(
              'Error',
              data.errorMessage,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
        }
      },
    });
  };

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
      <Formik
        initialValues={{
          email: 'kk41495@gmail.com',
          password: 'Admin@123',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleEmailLogin(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                <Feather
                  name="user"
                  size={22}
                  color={Color.DEFAULT_GREY}
                  style={{marginRight: 10}}
                />
                <TextInput
                  placeholderTextColor={Color.DEFAULT_GREY}
                  selectionColor={Color.DEFAULT_GREY}
                  style={styles.inputText}
                  placeholder="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
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
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <Feather
                  name={!isPasswordShow ? 'eye-off' : 'eye'}
                  size={22}
                  color={Color.DEFAULT_GREY}
                  style={{marginRight: 10}}
                  onPress={() => setIsPasswordShow(!isPasswordShow)}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.forgotPasswordCOntainer}>
              <View style={styles.toggleContainer}>
                <ToggleButton size={0.5} />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </View>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={() => handleSubmit()}>
              <Text style={styles.singinButtonText}>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
