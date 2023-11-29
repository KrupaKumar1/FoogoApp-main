import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuItemCard from '../../../components/Main/MenuItems/MenuItemCard';
import Header from '../../../components/General/Header';

const DATA = [
  {
    title: 'Chicken Burger',
    content: 'Chicken burger with Extra Cheese',
  },
  {
    title: 'Paneer Biriyani',
    content: 'Paneer Biriyani with Extra Onions',
  },
  {
    title: 'Mutton Bitiyani',
    content: 'Mutton Bitiyani with Extra Rita',
  },
  {
    title: 'Chicken Tandoori',
    content: 'Extra Spicy',
  },
  {
    title: 'Chicken Tikka',
    content: 'Chicken Tikka Extra Spicy',
  },
  {
    title: 'Paneer Biriyani',
    content: 'Paneer Biriyani with Extra Onions',
  },
  {
    title: 'Paneer Biriyani',
    content: 'Paneer Biriyani with Extra Onions',
  },
  {
    title: 'Paneer Biriyani',
    content: 'Paneer Biriyani with Extra Onions',
  },
  {
    title: 'Paneer Biriyani',
    content: 'Paneer Biriyani with Extra Onions',
  },
];

const MenuItems = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.menuText}>Menu Items</Text>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Icon name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.orderContainer}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <MenuItemCard title={item.title} content={item.content} />
          )}
        />
      </View>
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  menuText: {
    fontSize: 20,
    paddingLeft: 15,
  },
  filterIconContainer: {
    marginLeft: 'auto',
  },
  orderContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
});
