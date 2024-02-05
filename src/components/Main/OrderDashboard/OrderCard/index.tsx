import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Color from '../../../../constant/Color';
import {
  Border,
  Colors,
  FontFamily,
  FontSize,
} from '../../../../CSS/GlobalStyles';
import Font from '../../../../constant/Font';
import moment  from "moment";

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

    const TableNames =
    Array.isArray(orderDetails?.tableId) && orderDetails?.tableId != null
      ? orderDetails?.tableId?.replace(/,/g, ", ")
      : orderDetails?.tableId;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderInfoText}>{orderNumber}</Text>

          <View style={getStatusStyle()}>
            <Text style={styles.statusText}>
              {paid === 'Paid' ? 'Paid' : 'Unpaid'}
            </Text>
          </View>
          <Text style={styles.orderInfoText}>
            ${parseFloat(orderDetails?.grandTotal).toFixed(2)}
          </Text>
        </View>
        <View style={styles.orderDetailsSection}>
          <View style={styles.section}>
            <Text style={styles.username}>{orderDetails?.customerName}</Text>
            <Text
              style={
                styles.orderType
              }>{`${orderDetails?.orderSource},${username}`}</Text>
              {orderDetails?.orderType==="Dine-In" &&
              <>
               <Text style={styles.preparingTime}> {orderDetails?.numberOfPeople} , {TableNames}  </Text>
               
               </>
               
              }
           
          </View>
          <View style={styles.section}>
            <Text style={styles.preparingTime}>
              <Text style={styles.orderInfoText}> {moment(orderDetails?.createdDate).format("HH:mm")}</Text>
              {', Recieved'}
            </Text>
            <Text style={styles.preparingTime}>
              <Text style={styles.orderInfoText}>{moment(orderDetails?.estimatedDeliveryOrPickupTime).format("HH:mm")}</Text>
              {', Ready To Pick'}
            </Text>
          </View>
        </View>
      </View>
      {orderDetails?.paymentStatus === "Paid" && orderDetails?.status ==="OrderPreparedReadyForDelivery" &&
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Deliver</Text>
        </TouchableOpacity>
      
      </View>
}
 {orderDetails?.paymentStatus === "Paid" && orderDetails?.status ==="Preparing" &&
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Delay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Ready</Text>
        </TouchableOpacity>
      
      </View>
}
 {orderDetails?.paymentStatus !== "Paid" && orderDetails?.status ==="Preparing" &&
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Delay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Ready</Text>
        </TouchableOpacity>
      </View>
}
{orderDetails?.paymentStatus !== "Paid" && orderDetails?.status ==="OrderPreparedReadyForDelivery" &&
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.actionButtonText}>Pay</Text>
        </TouchableOpacity>
     
      </View>
}
    </View>

  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 160,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.colorWhitesmoke_100,
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
  orderInfoText: {
    fontFamily: Font.POPPINS_BOLD,
    fontSize: FontSize.size_base,
    fontWeight: '500',
    color: Colors.colorBlack,
    textTransform: 'capitalize',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  orderDetailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderType: {
    fontSize: 16,
  },
  preparingTime: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRightWidth: 1,
    borderRightColor: Color.DEFAULT_GREY,
    backgroundColor: '#f7f7f7',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    textTransform: 'capitalize',
    fontFamily: FontFamily.poppinsLight,
    fontSize: FontSize.size_sm,
    color: Colors.colorBlack,
  },
});

export default OrderCard;
