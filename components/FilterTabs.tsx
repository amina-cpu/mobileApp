import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = ["All", "Buy", "Rent", "Exchange"];
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={{ marginBottom: 24 }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onFilterChange(filter)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: activeFilter === filter ? "#D1FAE5" : "white",
            borderWidth: 1,
            borderColor: activeFilter === filter ? "#14B8A6" : "#D1D5DB",
            marginRight: 8,
          }}
        >
          <Text style={{
            fontSize: 12,
            color: activeFilter === filter ? "#047857" : "#6B7280",
            fontWeight: "500",
          }}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}