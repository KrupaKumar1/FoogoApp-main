import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';

interface OrderCardProps {
  orderNumber: string;
  paid: string;
  username: string;
  preparingTime: string;
  orderDetails: Object;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderDetails,
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
        <View style={styles.header}>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
          <View style={getStatusStyle()}>
            <Text style={styles.statusText}>
              {paid === 'Paid' ? 'Paid' : 'Unpaid'}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.preparingTime}>{preparingTime}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ready</Text>
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
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      android: {
        elevation: 2,
      },
    }),
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paidStatus: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  unpaidStatus: {
    backgroundColor: '#FF5252',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preparingTime: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderCard;
