import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

import {NavigationProp} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Header from '../../../components/General/Header';
import Color from '../../../constant/Color';
import {styles} from './styles';
import OrderCard from '../../../components/Main/OrderDashboard/OrderCard';
import OrderBottomTabBar from '../../../components/Main/OrderDashboard/OrderBottomTab';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Separator from '../../../components/General/Seperator';
import {Alert} from 'react-native';
import API_CALL from '../../../services/Api';
import {useSelector} from 'react-redux';

interface Order {
  label: string;
  // Add other properties as needed
}

const OrderDashboard = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [loading, setLoading] = useState(true);
  const {token} = useSelector(state => state?.generalState);

  const [orderTypes, setOrderTypes] = useState<Order[]>([]);
  console.log('ORDERS', orderTypes);
  const [isFlatListScrolling, setIsFlatListScrolling] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const flatListRef = useRef(null);
  const onViewRef = useRef(({changed}: any) => {
    if (!isFlatListScrolling) {
      const visibleIndex = changed.length > 0 ? changed[0].index : 0;
      const selectedTabIndex = visibleIndex; // Use the visibleIndex directly
      setSelectedTab(selectedTabIndex);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const [DATA, setDATA] = useState([]);
  const handleTabPress = (index: number, orderList: Array) => {
    setSelectedTab(index);
    setDATA(orderList);
    // Ensure the index is within the valid range
    if (index >= 0 && index < orderTypes.length) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const getAllOrdersList = async () => {
    const bodyDetails = {
      orderId: 0,
      orderStatus: '',
      zipCode: '',
      modeOfPayment: '',
      transactionType: '',
      dateFilterKey: 't',
      deliveredBy: 0,
      fetchDataFrom: 0,
      startDate: null,
      endDate: null,
      status: 0,
      pageNumber: 0,
      pageSize: 0,
      customerName: '',
      approval: 0,
      sortBy: '',
      deliveryType: '',
      orderNumber: '',
      paymentStatusId: 0,
    };

    API_CALL({
      method: 'POST',
      url: 'Menu/GetOrders',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: bodyDetails,

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          const consolidatedOrders = [
            {items: data.data?.readyToDeliveryOrders, label: 'Recieved'},
            {items: data.data?.pendingOrders, label: 'Preparing'},
            {items: data.data?.completedOrders, label: 'Completed'},
          ];

          setOrderTypes(consolidatedOrders);
        } else {
          Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      },
    });
  };

  useEffect(() => {
    getAllOrdersList();
  }, [selectedTab]);

  const menuItemsRouteHandler = () => {
    navigation.navigate('MenuItems');
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, styles.transparentBackground]}>
        <ActivityIndicator size="large" color={Color.PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />
      <Separator extraProps={{}} height={StatusBar.currentHeight} />
      <SafeAreaView>
        <Header />
      </SafeAreaView>
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
        onPress={menuItemsRouteHandler}
        disabled={false}>
        <Text style={styles.buttonText}>+ New Order</Text>
      </TouchableOpacity>
      <View style={styles.ordersListContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          data={orderTypes}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          keyExtractor={item => item.label}
          renderItem={({item}) => (
            <ScrollView
              style={styles.orderContainer}
              showsVerticalScrollIndicator={false}>
              {DATA?.map(dataItem => (
                <TouchableOpacity
                  key={dataItem.orderNumber}
                  activeOpacity={0.7}
                  // Add any onPress functionality here
                >
                  <OrderCard
                    orderNumber={dataItem.orderNumber}
                    paid={dataItem.paymentStatus}
                    username={dataItem.orderType}
                    preparingTime={dataItem.status}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          onScroll={event => {
            setIsFlatListScrolling(event.nativeEvent.contentOffset.x !== 0);
          }}
        />
      </View>
      {orderTypes && (
        <OrderBottomTabBar
          orderTypes={orderTypes}
          selectedTab={selectedTab}
          handleTabPress={handleTabPress}
        />
      )}
    </SafeAreaProvider>
  );
};

export default OrderDashboard;
