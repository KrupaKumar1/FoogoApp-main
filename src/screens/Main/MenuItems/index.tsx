import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuItemCard from '../../../components/Main/MenuItems/MenuItemCard';
import Header from '../../../components/General/Header';
import Color from '../../../constant/Color';

const MenuItems = ({navigation}) => {
  const [selectedGroup, setSelectedGroup] = useState('All'); // Initialize with the default group

  const DATA = [
    // Your menu item data goes here
    {title: 'Item 1', content: 'Description 1', group: 'Appetizers'},
    {title: 'Item 2', content: 'Description 2', group: 'Main Course'},
    {title: 'Item 3', content: 'Description 3', group: 'Desserts'},
    {title: 'Item 4', content: 'Description 4', group: 'Biriyani'},
    // Add more menu items with different groups
  ];

  const filterData = () => {
    if (selectedGroup === 'All') {
      return DATA;
    } else {
      return DATA.filter(item => item.group === selectedGroup);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.menuText}>Menu Items</Text>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Icon name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.groupSelector}>
        <TouchableOpacity
          style={[
            styles.groupButton,
            selectedGroup === 'All' && styles.selectedGroup,
          ]}
          onPress={() => setSelectedGroup('All')}>
          <Text style={styles.groupButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.groupButton,
            selectedGroup === 'Appetizers' && styles.selectedGroup,
          ]}
          onPress={() => setSelectedGroup('Appetizers')}>
          <Text style={styles.groupButtonText}>Appetizers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.groupButton,
            selectedGroup === 'Main Course' && styles.selectedGroup,
          ]}
          onPress={() => setSelectedGroup('Main Course')}>
          <Text style={styles.groupButtonText}>Main Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.groupButton,
            selectedGroup === 'Desserts' && styles.selectedGroup,
          ]}
          onPress={() => setSelectedGroup('Desserts')}>
          <Text style={styles.groupButtonText}>Desserts</Text>
        </TouchableOpacity>
        {/* Add more TouchableOpacity for each menu group */}
      </View>
      <View style={styles.orderContainer}>
        <FlatList
          data={filterData()}
          renderItem={({item}) => (
            <MenuItemCard title={item.title} content={item.content} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DEFAULT_WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    paddingLeft: 15,
  },
  filterIconContainer: {
    marginLeft: 'auto',
  },
  groupSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  groupButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectedGroup: {
    backgroundColor: Color.PRIMARY, // Change the color for the selected tab
  },
  groupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.DEFAULT_BLACK, // Change text color for the tabs
  },
  orderContainer: {
    // flex: 1,
    // width: '100%',
    padding: 10,
  },
});

export default MenuItems;
