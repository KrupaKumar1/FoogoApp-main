import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Color from '../../constant/Color';
import General from '../../constant/General';
import Display from '../../utils/Display';
import Separator from '../../components/Seperator';
import WelcomeCard from '../../components/WelcomeCard';
import Font from '../../constant/Font';


const PageStyle = (isActive: boolean) =>
  isActive
    ? styles.page
    : { ...styles.page, backgroundColor: Color.DEFAULT_GREY };

const Pagination = ({ index }) => {
  return (
    <View style={styles.paginationContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={PageStyle(true)} key={i} />
        ) : (
          <View style={PageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef<ScrollView>(null);

  const onViewRef = useRef(({ changed }: { changed: Array<any> }) => {
    setWelcomeListIndex(changed[0].index);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const pageScroll = () => {
    welcomeList?.current?.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.DEFAULT_WHITE}
      />
      <Separator extraProps={{}} height={StatusBar.currentHeight} />
      <Separator extraProps={{}} height={Display.setHeight(8)} />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={(item: any) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item }) => <WelcomeCard {...item} />}
        />
      </View>

      <Separator extraProps={{}} height={Display.setHeight(8)} />
      <Pagination index={welcomeListIndex} />
      <Separator extraProps={{}} height={Display.setHeight(8)} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginLeft: 10 }}
            onPress={() => welcomeList?.current?.scrollToEnd()}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pageScroll()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
  },
  text: {},
  paginationContainer: {
    flexDirection: 'row',
  },
  page: {
    width: 15,
    height: 8,
    borderRadius: 32,
    backgroundColor: Color.DEFAULT_GREEN,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Color.LIGHT_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 16,
    color: Color.DEFAULT_GREEN,
    fontFamily: Font.POPPINS_BOLD,
    lineHeight: 16 * 1.4,
  },
  getStartedButton: {
    fontSize: 16,
    backgroundColor: Color.DEFAULT_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  getStartedButtonText: {
    fontSize: 16,
    color: Color.DEFAULT_WHITE,
    fontFamily: Font.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
  },
});