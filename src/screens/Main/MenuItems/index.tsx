import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../../components/General/Header';
import Color from '../../../constant/Color';
import API_CALL from '../../../services/Api';
import {useSelector} from 'react-redux';
import MenuCard from '../../../components/Main/MenuItems/MenuCard';

interface RootState {
  generalState: {
    token: string;
    // other properties
  };
}

const MenuItems = ({navigation}: {navigation: any}) => {
  const [selectedGroupId, setSelectedGroupId] = useState(10); // Initialize with the default group
  const {token} = useSelector((state: RootState) => state?.generalState ?? {});

  const DATA = [
    // Your menu item data goes here
    {title: 'Item 1', content: 'Description 1', group: 'Appetizers'},
    {title: 'Item 2', content: 'Description 2', group: 'Main Course'},
    {title: 'Item 3', content: 'Description 3', group: 'Desserts'},
    {title: 'Item 4', content: 'Description 4', group: 'Biriyani'},
    // Add more menu items with different groups
  ];

  const [menuGroups, setMenuGroups] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  console.log('ITEMS', menuItems);

  const filters = [
    {key: 'bestseller', label: 'Bestseller'},
    {key: 'veg', label: 'Veg'},
    {key: 'nonVeg', label: 'Non-Veg'},
  ];

  const handleFilterPress = (filterKey: string) => {
    console.log(`${filterKey} pressed`);
    // Implement your filter logic here
  };

  /**Group Names */
  const getGroupNames = () => {
    API_CALL({
      method: 'GET',
      url: 'Menu/GetMenuGroups',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          const menuGroupData = data.data;
          const sortedMenuGroup = menuGroupData.sort(
            (a: any, b: any) =>
              Number(a.displayIndex) - Number(b.displayIndex) ||
              a.name.localeCompare(b.name),
          );
          setMenuGroups([
            {
              id: 10,
              name: 'All',
              isGroupAvailableNow: true,
              isPOS: true,
            },
            ...sortedMenuGroup,
          ]);
          setSelectedGroupId;
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

  /**Group Items */
  const getGroupItemsAPI = (menuId: any) => {
    setSelectedGroupId(menuId);
    const paramsOnj = {
      groupId: menuId,
    };
    API_CALL({
      method: 'GET',
      url: 'Menu/GetActiveMenuItems',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: paramsOnj,

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          setMenuItems(data.data);
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
    getGroupNames();
  }, []);

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
      <View style={styles.groupSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {menuGroups?.map((menuGroup: any) => (
            <TouchableOpacity
              key={menuGroup.id}
              style={[
                styles.groupButton,
                selectedGroupId === menuGroup.id && styles.selectedGroup,
              ]}
              // onPress={() => setSelectedGroupId(menuGroup.id)}
              onPress={() => getGroupItemsAPI(menuGroup.id)}>
              <Text style={styles.groupButtonText}>{menuGroup.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={styles.filterButton}
              onPress={() => handleFilterPress(filter.key)}>
              <Text>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.orderContainer}>
        <FlatList
          data={menuItems}
          renderItem={({item}) => <MenuCard itemDetails={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  groupSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%', // Set the desired fixed height
    padding: 5,
    paddingVertical: 10,
  },

  groupSelector: {
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5,
  },
  orderContainer: {
    flex: 1,
    width: '100%',
  },
});

export default MenuItems;
