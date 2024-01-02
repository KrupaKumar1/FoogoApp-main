import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Platform,
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
  const [isFlatListScrolling, setIsFlatListScrolling] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Tab1');
  const flatListRef = useRef(null);

  const onViewRef = useRef(({changed}) => {
    if (!isFlatListScrolling) {
      const visibleIndex = changed.length > 0 ? changed[0].index : 0;
      const selectedTabIndex = `Tab${visibleIndex + 1}`;
      setSelectedTab(selectedTabIndex);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const handleTabPress = tab => {
    setSelectedTab(tab);
    flatListRef.current.scrollToIndex({
      animated: true,
      index: parseInt(tab.replace('Tab', '')) - 1,
    });
  };

  const [DATA, setDATA] = useState<
    {
      orderNumber: string;
      paid: string;
      username: string;
      preparingTime: string;
    }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      setDATA(sampleData);
      setLoading(false);
    }, 2000);
  }, []);

  const handleButtonPress = () => {
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
        onPress={handleButtonPress}
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
          data={[1, 2, 3]}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <ScrollView
              style={styles.orderContainer}
              showsVerticalScrollIndicator={false}>
              {DATA.map(dataItem => (
                <TouchableOpacity
                  key={dataItem.orderNumber}
                  activeOpacity={0.7}
                  // Add any onPress functionality here
                >
                  <OrderCard
                    orderNumber={dataItem.orderNumber}
                    paid={dataItem.paid}
                    username={dataItem.username}
                    preparingTime={dataItem.preparingTime}
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

      <OrderBottomTabBar
        selectedTab={selectedTab}
        handleTabPress={handleTabPress}
      />
    </SafeAreaProvider>
  );
};

export default OrderDashboard;
