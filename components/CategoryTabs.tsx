import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";

const categories = [
  {
    name: "Home &\nFurniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop"
  },
  {
    name: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop"
  },
  {
    name: "Phone and\nAccessories",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop"
  },
  {
    name: "Computers\nAccessories",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop"
  }
];

export default function CategoryTabs({ onCategoryPress }) {
  return (
    <View style={{ 
      flexDirection: "row", 
      justifyContent: "space-between", 
      paddingHorizontal: 16,
      marginBottom: 20 
    }}>
      {categories.map((cat, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onCategoryPress && onCategoryPress(cat, idx)}
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 12,
            alignItems: "center",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            width: "22%"
          }}
        >
          <View style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 8, 
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
            fontWeight: "500",
            lineHeight: 12 
          }}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}