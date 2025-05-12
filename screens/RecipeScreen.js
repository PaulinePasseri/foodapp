import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { recipes } from "../data/recipes";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/favorites";

export default function RecipeScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const navigation = useNavigation();
  const route = useRoute();
  const currentRecipe = recipes.find(
    (recipe) => recipe.id === route.params.recipeId
  );
  const isBookmarked = favorites.some(
    (elem) => elem.recipeId === currentRecipe.id
  );

  const [count, setCount] = useState(currentRecipe.servingNb);

  const handleAddServing = () => {
    setCount(count + 1);
  };

  const handleRemoveServing = () => {
    if (count === 1) {
      setCount(count);
    } else {
      setCount(count - 1);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark({ recipeId: currentRecipe.id }));
    } else {
      dispatch(addBookmark({ recipeId: currentRecipe.id }));
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: currentRecipe.color,
          height: "35%",
          width: "100%",
          padding: 20,
          borderBottomLeftRadius: 100,
          zIndex: 2,
        }}
      >
        <Pressable onPress={() => navigation.goBack()} hitSlop={20}>
          <FontAwesome5 name="arrow-left" size={20} />
        </Pressable>
        <Image
          source={currentRecipe.image}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel={`Image of ${currentRecipe.name}`}
        />
        <Pressable
          style={styles.bookmarkContainer}
          onPress={() => handleBookmark()}
          hitSlop={20}
        >
          <FontAwesome5
            name="bookmark"
            size={20}
            style={styles.bookmark}
            solid={isBookmarked}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <View style={styles.iconsContainer}>
          <View>
            <FontAwesome5
              name="star"
              size={20}
              color={currentRecipe.color}
              style={{ textAlign: "center" }}
            />
            <Text style={styles.icon}>{currentRecipe.level}</Text>
          </View>
          <View>
            <FontAwesome5
              name="clock"
              size={20}
              color={currentRecipe.color}
              style={{ textAlign: "center" }}
            />
            <Text style={styles.icon}>{currentRecipe.time}</Text>
          </View>
          <View>
            <FontAwesome5
              name="star"
              size={20}
              color={currentRecipe.color}
              style={{ textAlign: "center" }}
            />
            <Text style={styles.icon}>{currentRecipe.rating}</Text>
          </View>
        </View>
        <Text style={styles.name}>{currentRecipe.name}</Text>
        <Text>{currentRecipe.longDesc}</Text>
        <View style={styles.ingredientsContainer}>
          <View>
            <Text style={styles.title}>Ingredients</Text>
            <Text style={{ color: "grey" }}>How many servings?</Text>
          </View>
          <View style={styles.servings}>
            <Pressable onPress={() => handleRemoveServing()} hitSlop={20}>
              <Text style={styles.servingsText}>-</Text>
            </Pressable>
            <Text style={styles.servingsText}>{count}</Text>
            <Pressable onPress={() => handleAddServing()} hitSlop={20}>
              <Text style={styles.servingsText}>+</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {currentRecipe.ingredients.map((data, index) => {
            return (
              <View key={index} style={styles.ingredient}>
                <Text style={styles.ingredientText}>{data.name}</Text>
                <Text style={styles.ingredientText}>
                  {data.amount * count} {data.unit}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={currentRecipe.color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    marginTop: -60, 
    zIndex: 1,
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 80,
  },
  name: {
    fontSize: 30,
    fontFamily: "serif",
    marginTop: 20,
  },
  icon: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  ingredientsContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  servings: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    padding: 10,
    width: 120,
    justifyContent: "space-around",
    borderRadius: 20,
  },
  servingsText: {
    fontSize: 16,
    fontWeight: "600",
  },
  ingredient: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  ingredientText: {
    color: "grey",
  },
  scroll: {
    marginTop: 15,
    maxHeight: "50%",
  },
  bookmark: {
    color: "#fff",
    fontSize: 18,
  },
  bookmarkContainer: {
    backgroundColor: "#6D5D89",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -30,
    right: 10,
    borderRadius: "50%",
  },
});
