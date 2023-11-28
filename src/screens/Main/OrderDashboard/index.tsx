import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

import {NavigationProp} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Header from '../../../components/General/Header';
import Separator from '../../../components/General/Seperator';
import Color from '../../../constant/Color';
import {styles} from './styles';
import OrderCard from '../../../components/Main/OrderDashboard/OrderCard';
import {TouchableNativeFeedback} from 'react-native';
import {Platform} from 'react-native';
import OrderBottomTabBar from '../../../components/Main/OrderDashboard/OrderBottomTab';

const sampleData = [
  {
    orderNumber: '2023-05-001',
    paid: 'Paid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-002',
    paid: 'Unpaid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-003',
    paid: 'Paid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-004',
    paid: 'Unpaid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-005',
    paid: 'Unpaid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-006',
    paid: 'Unpaid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-007',
    paid: 'Paid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
  {
    orderNumber: '2023-05-008',
    paid: 'Unpaid',
    username: 'Krupa Kumar',
    preparingTime: '20 min',
  },
];

const OrderDashboard = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [loading, setLoading] = useState(true);

  const [DATA, setDATA] = useState<
    {
      orderNumber: string;
      paid: string;
      username: string;
      preparingTime: string;
    }[]
  >([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setDATA(sampleData);
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  const handleButtonPress = () => {
    // Your button press logic here
    navigation.navigate('MenuItems');
  };

  if (loading) {
    // Show loader while data is being fetched
    return (
      <View style={[styles.loaderContainer, styles.transparentBackground]}>
        <ActivityIndicator size="large" color={Color.PRIMARY} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Color.PRIMARY}
          translucent
        />
        {/* <Separator extraProps={{}} height={StatusBar.currentHeight} /> */}
      </SafeAreaView>
      <Header />
      <View style={styles.header}>
        <Text style={styles.menuText}>Orders</Text>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <SearchIcon
              style={styles.searchIcon}
              name="search"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Icon name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.newOrderButton, false && styles.disabled]}
        onPress={handleButtonPress}
        disabled={false}>
        <Text style={styles.buttonText}>+ New Order</Text>
      </TouchableOpacity>
      <View style={styles.ordersListContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          data={[1, 2, 3]} // Assuming you want to repeat the content three times
          keyExtractor={item => item.toString()}
          renderItem={({section}) => (
            <View style={styles.orderContainer}>
              <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                keyExtractor={(section, index) => index.toString()}
                renderItem={({item}) =>
                  Platform.OS === 'android' ? (
                    <TouchableNativeFeedback
                      // onPress={() => handleCardPress(item)}
                      background={TouchableNativeFeedback.SelectableBackground()} // You can customize this
                    >
                      <View>
                        <OrderCard
                          orderNumber={item.orderNumber}
                          paid={item.paid}
                          username={item.username}
                          preparingTime={item.preparingTime}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  ) : (
                    <TouchableOpacity
                      // onPress={() => handleCardPress(item)}
                      activeOpacity={0.7} // Adjust the opacity as needed
                    >
                      <OrderCard
                        orderNumber={item.orderNumber}
                        paid={item.paid}
                        username={item.username}
                        preparingTime={item.preparingTime}
                      />
                    </TouchableOpacity>
                  )
                }
              />
            </View>
          )}
        />
      </View>
      {/*Recieved */}
      {/* Preparing*/}
      {/* Completed */}
      <OrderBottomTabBar />
    </View>
  );
};

export default OrderDashboard;
