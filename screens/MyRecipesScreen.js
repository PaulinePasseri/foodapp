import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { recipes } from "../data/recipes";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function MyRecipesScreen() {
  const navigation = useNavigation();

  const favorites = useSelector((state) => state.favorites.value);
  const bookmarkedRecipes = recipes.filter((recipe) =>
  favorites.some((bookmark) => bookmark.recipeId === recipe.id)
);

  const handleShowRecipe = (recipe) => {
    navigation.navigate("Recipe", {
      recipeId: recipe.id,
    });
  };
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleShowRecipe(item)}>
      <View
        style={{
          backgroundColor: item.color,
          height: 200,
          width: "47%",
          marginVertical: 10,
          padding: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 25,
        }}
      >
        <Image
          style={styles.image}
          source={item.image}
          resizeMode="contain"
          accessibilityLabel={`Image of ${item.name}`}
        />
        <View style={styles.textContainer}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <Text style={styles.recipeDesc}>{item.desc}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The best ones</Text>
      <FlatList
        style={styles.list}
        data={bookmarkedRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#685376",
    fontFamily: "serif",
    fontWeight: "700",
  },
  subtitle: {
    color: "lightgrey",
    marginBottom: 30,
  },
  image: {
    height: "60%",
    width: "100%",
  },
  textContainer: {
    alignItems: "flex-end",
  },
  recipeName: {
    fontSize: 13,
    textAlign: "right",
    fontWeight: "600",
    color: "#685376",
  },
  recipeDesc: {
    fontSize: 11,
    textAlign: "right",
    color: "#685376",
  },
  list: {
    marginBottom: 30,
  },
});
