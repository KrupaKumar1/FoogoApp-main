import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';

interface OrderCardProps {
  orderNumber: string;
  paid: string;
  username: string;
  preparingTime: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  paid,
  username,
  preparingTime,
}) => {
  const getStatusStyle = () => {
    return paid === 'Paid' ? styles.paidStatus : styles.unpaidStatus;
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.bold}>{orderNumber}</Text>
          <View style={getStatusStyle()}>
            <Text style={styles.statusText}>
              {paid === 'Paid' ? 'Paid' : 'Unpaid'}
            </Text>
          </View>
          <Text style={styles.preparingTimeLabel}>$10.00</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.preparingTimeValue}>{preparingTime}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Delay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Ready</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.1)', // Adjust the alpha value as needed
      },
      android: {
        elevation: 2,
      },
    }),
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    flexDirection: 'column', // Changed to column to stack content vertically
    backgroundColor: 'white',
    padding: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  orderNumber: {
    marginBottom: 10,
  },
  paidStatus: {
    backgroundColor: '#39e600',
    width: 80,
    height: 25,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  unpaidStatus: {
    backgroundColor: 'red',
    padding: 5,
    width: 80,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
  },
  username: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  preparingTimeLabel: {
    fontWeight: 'bold',
  },
  preparingTimeValue: {
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default OrderCard;
