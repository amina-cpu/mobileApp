import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Filter, ArrowLeft, Search, MapPin } from "lucide-react-native";
import React, { useState } from 'react';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import ProductCard from "../components/ProductCard";
import FilterTabs from "../components/FilterTabs";

export default function CategoryDetailsPage() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');

  const mockProducts = {
    'Real Estate': [
      {
        title: "House for Sale",
        price: "155 ML",
        image: "https://images.unsplash.com/photo-1600585154340-9daf4d9fd77c?w=300&h=200&fit=crop",
        distance: "2.1 km",
        tag: "For Sale",
        tagColor: "#EF4444"
      },
      {
        title: "Apartment for Rent",
        price: "10,000 DA/mo",
        image: "https://images.unsplash.com/photo-1522050212171-61b01db24574?w=300&h=200&fit=crop",
        distance: "500 m",
        tag: "Rent",
        tagColor: "#F59E0B"
      }
    ],
    'Phone and Accessories': [
      {
        title: "Headphones",
        price: "15,000 DA",
        image: "https://images.unsplash.com/photo-1546435770-a3e433036e87?w=300&h=200&fit=crop",
        distance: "1.5 km",
        tag: "Offered",
        tagColor: "#14B8A6"
      },
      {
        title: "Wireless Mouse",
        price: "5,000 DA",
        image: "https://images.unsplash.com/photo-1546435770-a3e433036e87?w=300&h=200&fit=crop",
        distance: "1.5 km",
        tag: "Offered",
        tagColor: "#14B8A6"
      },
    ],
    'Computers Accessories': [
      {
        title: "Keyboard",
        price: "20,000 DA",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
        distance: "2.5 km",
        tag: "Offered",
        tagColor: "#14B8A6"
      },
    ]
  };

  const products = mockProducts[category] || [];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D1FAE5" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={{ flex: 1 }}>
        {/* Header Section */}
        <View style={{ backgroundColor: "#14B8A6", paddingTop: 20, paddingBottom: 20, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 12,
              flex: 1
            }}>
              <Search size={20} color="#6B7280" style={{ marginRight: 8 }} />
              <Text style={{ flex: 1, color: "#6B7280" }}>Search in this category</Text>
            </View>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginTop: 10 }}>{category}</Text>

          {/* Sub-categories row for Phone & Accessories */}
          {category === 'Phone and Accessories' && (
            <ScrollView horizontal style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: 'center', marginRight: 16 }}>
                  <Image source={{ uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop" }} style={{ width: 60, height: 60, borderRadius: 12, marginBottom: 4 }} />
                  <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>Smartphones</Text>
                </View>
                <View style={{ alignItems: 'center', marginRight: 16 }}>
                  <Image source={{ uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop" }} style={{ width: 60, height: 60, borderRadius: 12, marginBottom: 4 }} />
                  <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>Mobile phones</Text>
                </View>
                <View style={{ alignItems: 'center', marginRight: 16 }}>
                  <Image source={{ uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop" }} style={{ width: 60, height: 60, borderRadius: 12, marginBottom: 4 }} />
                  <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>Tablets</Text>
                </View>
              </View>
            </ScrollView>
          )}

          {/* Location row */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 16 }}>
            <MapPin size={16} color="white" />
            <Text style={{ color: "white", marginLeft: 8 }}>Washington : 30 Klm+</Text>
          </View>
        </View>

        {/* Product List Section */}
        <View style={{ 
          backgroundColor: "white", 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          paddingHorizontal: 16, 
          paddingTop: 24,
          marginTop: 10,
          flex: 1 
        }}>
          {/* Tabs */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1F2937" }}>All items</Text>
            <Filter size={20} color="#6B7280" />
          </View>

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

          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} options={["All", "Buy", "Rent", "Exchange"]} />

          {/* Products Grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {filteredProducts.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
