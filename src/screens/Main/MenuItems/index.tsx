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
import SkeletonForMenuCard from '../../../components/Main/MenuItems/SkeletonForMenuCard';
import ViewCart from '../../../components/Main/MenuItems/ViewCart';
import {Colors} from '../../../CSS/GlobalStyles';
import Font from '../../../constant/Font';

interface RootState {
  generalState: {
    token: string;
    // other properties
  };
}

const MenuItems = ({navigation}: {navigation: any}) => {
  const [selectedGroupId, setSelectedGroupId] = useState(10); // Initialize with the default group
  const {token} = useSelector((state: RootState) => state?.generalState ?? {});
  const {cartItems} = useSelector(state => state?.cartState);

  const [menuGroups, setMenuGroups] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  //console.log('CARTITEMS', cartItems);
  const [itemsLoading, setItemsLoading] = useState(true);

  const filters = [
    {key: 'bestseller', label: 'Bestseller'},
    {key: 'veg', label: 'Veg'},
    {key: 'nonVeg', label: 'Non-Veg'},
  ];

  const handleFilterPress = (filterKey: string) => {
    console.log(`${filterKey} pressed`);
    // Implement your filter logic here
  };

  /**Quantity set Handler */
  const cardQtySetHandler = () => {
    const itemQtyMap: {[key: string]: number} = {};

    cartItems?.forEach((listItem: any) => {
      const itemName = listItem.item;
      // Check if the item is already in the map
      if (itemQtyMap.hasOwnProperty(itemName)) {
        // If yes, update the quantity
        itemQtyMap[itemName] += listItem.qty;
      } else {
        // If no, add the item to the map with its quantity
        itemQtyMap[itemName] = listItem.qty;
      }
    });

    // Now update the menuItemforGrpoup based on the itemQtyMap
    const dataList = [...menuItems];
    dataList.forEach((apiItem: any) => {
      const itemName = apiItem.name;

      if (itemQtyMap.hasOwnProperty(itemName)) {
        // If the item exists in the map, update the quantity
        apiItem.quantity = itemQtyMap[itemName];
      } else {
        apiItem.quantity = null;
      }
    });

    setMenuItems(dataList);
  };

  /**Group Items */
  const getGroupItemsAPI = (menuId: any) => {
    setSelectedGroupId(menuId);
    // setItemsLoading(true);
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
          const menuItemsForQty = data.data;
          const itemQtyMap: {[key: string]: number} = {};

          cartItems?.forEach((listItem: any) => {
            const itemName = listItem.item;
            // Check if the item is already in the map
            if (itemQtyMap.hasOwnProperty(itemName)) {
              // If yes, update the quantity
              itemQtyMap[itemName] += listItem.qty;
            } else {
              // If no, add the item to the map with its quantity
              itemQtyMap[itemName] = listItem.qty;
            }
          });

          // Now update the menuItemforGrpoup based on the itemQtyMap
          const dataList = [...menuItemsForQty];
          dataList.forEach((apiItem: any) => {
            const itemName = apiItem.name;

            if (itemQtyMap.hasOwnProperty(itemName)) {
              // If the item exists in the map, update the quantity
              apiItem.quantity = itemQtyMap[itemName];
            }
          });

          setMenuItems(dataList);
        } else {
          Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
        setItemsLoading(false);
      },
    });
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

  useEffect(() => {
    getGroupNames();
  }, []);

  useEffect(() => {
    cardQtySetHandler();
  }, [cartItems]);

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
          <TouchableOpacity>
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
              <Text style={styles.filterText}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.orderContainer}>
        {itemsLoading ? (
          // Render Skeleton Cards dynamically based on the length of menuItems array
          Array.from({length: 5}, (_, index) => (
            <SkeletonForMenuCard key={index} />
          ))
        ) : (
          <FlatList
            data={menuItems}
            renderItem={({item}) => <MenuCard itemDetails={item} />}
          />
        )}
      </View>
      {cartItems?.length > 0 && (
        <ViewCart
          navigation={navigation}
          cardQtySetHandler={cardQtySetHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhitesmoke_100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
  },
  menuText: {
    fontSize: 20,
    paddingLeft: 15,
    fontFamily: Font.POPPINS_BOLD, // Use appropriate Poppins font from your constants
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
    fontFamily: Font.POPPINS_BOLD, // Use appropriate Poppins font from your constants
  },
  selectedGroup: {
    borderColor: Color.PRIMARY,
    borderBottomWidth: 2,
    // Change the color for the selected tab
  },
  groupButtonText: {
    fontSize: 16,
    color: Color.DEFAULT_BLACK, // Change text color for the tabs
    fontFamily: Font.POPPINS_SEMI_BOLD, // Use appropriate Poppins font from your constants
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    marginHorizontal: 5,
  },
  filterText: {
    color: Color.DEFAULT_BLACK,
    fontFamily: Font.POPPINS_REGULAR, // Use appropriate Poppins font from your constants
  },
  orderContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Color.LIGHT_GREY2,
  },
});

export default MenuItems;
