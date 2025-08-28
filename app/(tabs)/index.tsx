// import React, { useState } from 'react';
// import { View } from 'react-native';
// import MapScreen from '.../../.../../.../../.../../components/MapScreen';
// import CategoryScreen from '.../../.../../.../../.../../components/CategoryScreen';


// type Screen = 'map' | 'category';

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>('map');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');

//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentScreen('category');
//   };

//   const handleBackToMap = () => {
//     setCurrentScreen('map');
//   };

//   const handleItemSelect = (item: any) => {
//     console.log('Item selected:', item);
//     // Handle item selection logic here
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {currentScreen === 'map' ? (
//         <MapScreen
//           onCategorySelect={handleCategorySelect}
//           onItemSelect={handleItemSelect}
//         />
//       ) : (
//         <CategoryScreen
//           categoryTitle="Phone & Accessories"
//           onItemPress={handleItemSelect}
//           onBackPress={handleBackToMap}
//         />
//       )}
//     </View>
//   );
// }

import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Filter } from "lucide-react-native";
import React, { useState } from 'react';
import SearchBar from "../../components/SearchBar";
import CategoryTabs from "../../components/CategoryTabs";
import ProductCard from "../../components/ProductCard";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('All');

  const products = [
    {
      title: "Item title",
      price: "5000 DA", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      distance: "1.5 km",
      tag: "Exchange",
      tagColor: "#3B82F6"
    },
    {
      title: "Item title",
      price: "5000 DA", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      distance: "1.5 km",
      tag: "Exchange",
      tagColor: "#3B82F6"
    },
    {
      title: "Item title",
      price: "5000 DA", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      distance: "1.5 km",
      tag: "Exchange",
      tagColor: "#3B82F6"
    },
    {
      title: "Item title",
      price: "5000 DA", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      distance: "1.5 km",
      tag: "Exchange",
      tagColor: "#3B82F6"
    },
    {
      title: "Item title",
      price: "5000 DA", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      distance: "1.5 km",
      tag: "offered",
      tagColor: "#3B82F6"
    },
    // ... more products
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header with teal gradient */}
        <View style={{ backgroundColor: "#14B8A6", paddingTop: 20, paddingBottom: 20 }}>
          <SearchBar />
          <CategoryTabs onCategoryPress={(cat, idx) => {
            if (idx === 2) {
              // Navigate to Phone & Accessories
            }
          }} />
        </View>

        {/* All items section */}
        <View style={{ 
          backgroundColor: "white", 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          paddingHorizontal: 16, 
          paddingTop: 24,
          marginTop: -10,
          flex: 1 
        }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1F2937" }}>All items</Text>
            <Filter size={20} color="#6B7280" />
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", marginBottom: 16, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }}>
            {['All', 'offered', 'Asked'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  marginRight: 24,
                  borderBottomWidth: activeTab === tab ? 2 : 0,
                  borderBottomColor: "#14B8A6"
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeTab === tab ? "#14B8A6" : "#6B7280",
                  fontWeight: "500"
                }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Products Grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}