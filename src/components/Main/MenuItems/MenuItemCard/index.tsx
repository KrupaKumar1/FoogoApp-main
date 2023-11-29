import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

const MenuItemCard = ({title, content}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          style={styles.menuItemImage}
          source={{
            uri: 'https://images.freeimages.com/images/large-previews/b0b/fine-dining-food-presentation-1327952.jpg',
          }}
        />
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.buttonscontainer}>
            <Text style={styles.moreDetailsText}>{`More Details >`}</Text>
            <TouchableOpacity style={styles.roundedButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 130,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  menuItemImage: {
    height: null,
    width: 150,
  },
  itemDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 2,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  buttonscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreDetailsText: {
    fontSize: 13,
    color: '#333',
  },
  roundedButton: {
    backgroundColor: '#ff9500',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
});

export default MenuItemCard;
