import { View, Text, TouchableOpacity, Image } from "react-native";

const phoneCategories = [
  {
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop"
  },
  {
    name: "Mobile phones",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=80&h=80&fit=crop"
  },
  {
    name: "Tablets", 
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop"
  },
  {
    name: "Fixed",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=80&h=80&fit=crop"
  }
];

export default function SubCategoryTabs() {
  return (
    <View style={{ 
      flexDirection: "row", 
      justifyContent: "space-between", 
      paddingHorizontal: 16,
      marginBottom: 24 
    }}>
      {phoneCategories.map((cat, idx) => (
        <View key={idx} style={{ alignItems: "center", width: "22%" }}>
          <View style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 24, 
            overflow: "hidden", 
            marginBottom: 8 
          }}>
            <Image 
              source={{ uri: cat.image }} 
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <Text style={{ 
            fontSize: 10, 
            textAlign: "center", 
            color: "#374151", 
            fontWeight: "500" 
          }}>
            {cat.name}
          </Text>
        </View>
      ))}
    </View>
  );
}