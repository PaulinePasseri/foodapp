import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.homeImage}
          source={require("../assets/images/home.jpg")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>FoodApp</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('DrawerNavigator')} hitSlop={20}>
          <Text style={styles.buttonText}>Let's go!  </Text>
          <FontAwesome name={'arrow-right'} size={20} color={'#fff'} />
        </Pressable> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6D5D89",
  },
  imageContainer: {
    height: '75%',
    borderBottomLeftRadius: '15%',
    overflow: 'hidden',
  },
  homeImage: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 70,
    color: '#fff',
    fontWeight: 700,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});
