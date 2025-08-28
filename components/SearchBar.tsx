import { View, TextInput, Text } from "react-native";
import { Search, MapPin } from "lucide-react-native";

export default function SearchBar({ placeholder = "Search LAVA", showLocation = true }) {
  return (
    <View style={{ 
      flexDirection: "row", 
      alignItems: "center", 
      padding: 12, 
      backgroundColor: "white",
      borderRadius: 25,
      marginHorizontal: 16,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <Search size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
      <TextInput
        placeholder={placeholder}
        style={{ flex: 1, fontSize: 14, color: '#374151' }}
        placeholderTextColor="#9CA3AF"
      />
      {showLocation && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MapPin size={16} color="white" style={{ marginRight: 4 }} />
          <Text style={{ fontWeight: "600", color: "white", fontSize: 14 }}>Washington</Text>
        </View>
      )}
    </View>
  );
}