import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
interface ItemModalProps {
  isVisible: boolean;
  closeModal: () => void;
  
}
const CancelModal = ({isVisible,closeModal}:ItemModalProps) => {
  return (
     <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}>
     <View>
      <Text>index</Text>
    </View>
      </Modal>
   
  )
}

export default CancelModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 10,
  },
})