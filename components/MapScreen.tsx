import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MapScreenProps {
  onCategorySelect?: (category: string) => void;
  onItemSelect?: (item: any) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ onCategorySelect, onItemSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const categories = [
    { id: 'home', name: 'Home & Furniture', icon: 'home-outline' },
    { id: 'realestate', name: 'Real Estate', icon: 'business-outline' },
    { id: 'transport', name: 'Transport & Accessories', icon: 'car-outline' },
    { id: 'computers', name: 'Computers & Accessories', icon: 'laptop-outline' },
    { id: 'cars', name: 'Cars & Vehicles', icon: 'car-sport-outline' },
    { id: 'clothing', name: 'Clothing & Fashion', icon: 'shirt-outline' },
    { id: 'repair', name: 'Repair parts', icon: 'construct-outline' },
    { id: 'boat', name: 'Boat parts', icon: 'boat-outline' },
  ];

  const mapItems = [
    { id: 1, type: 'repair', position: { top: 120, left: 80 } },
    { id: 2, type: 'home', position: { top: 140, left: 200 } },
    { id: 3, type: 'car', position: { top: 180, left: 150 } },
    { id: 4, type: 'electronics', position: { top: 220, left: 100 } },
    { id: 5, type: 'clothing', position: { top: 160, left: 250 } },
    { id: 6, type: 'realestate', position: { top: 200, left: 180 } },
    { id: 7, type: 'transport', position: { top: 140, left: 120 } },
    { id: 8, type: 'computers', position: { top: 190, left: 220 } },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Header */}
      <View className="bg-slate-800 px-4 py-3">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#10b981" />
            <Text className="text-white ml-2 text-base font-medium">
              Washington, District of Columbia (2022)
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-slate-700 rounded-lg px-3 py-2 flex-row items-center mb-3">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Boat parts"
            placeholderTextColor="#94a3b8"
            className="flex-1 ml-2 text-white"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <Ionicons name="options-outline" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Filter Tags */}
        <View className="flex-row items-center space-x-2">
          <View className="bg-green-500 px-3 py-1 rounded-full">
            <Text className="text-white text-sm">All items</Text>
          </View>
          <View className="bg-slate-600 px-3 py-1 rounded-full">
            <Text className="text-white text-sm">Boat parts</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="add" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Container */}
      <View className="flex-1 relative bg-slate-700">
        {/* Map Background */}
        <View className="absolute inset-0 bg-slate-600 rounded-t-3xl">
          {/* Map Items */}
          {mapItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="absolute w-8 h-8 bg-white rounded-lg items-center justify-center shadow-lg"
              style={{ 
                top: item.position.top, 
                left: item.position.left,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => onItemSelect?.(item)}
            >
              <View className="w-6 h-6 bg-blue-500 rounded" />
            </TouchableOpacity>
          ))}

          {/* Zoom Circle */}
          <View className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <View className="w-64 h-64 border-2 border-slate-400 rounded-full border-dashed opacity-50" />
          </View>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity 
          className="absolute bottom-20 right-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Ionicons name="locate" size={24} color="#1e293b" />
        </TouchableOpacity>

        {/* Location Button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-4 w-12 h-12 bg-green-500 rounded-full items-center justify-center shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text className="text-white text-lg font-bold">Y</Text>
        </TouchableOpacity>
      </View>

      {/* Category Sidebar */}
      {selectedCategory && (
        <View className="absolute right-0 top-32 bottom-16 w-72 bg-white rounded-l-2xl shadow-xl">
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Category</Text>
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="flex-row items-center p-3 border-b border-gray-200"
                  onPress={() => onCategorySelect?.(category.id)}
                >
                  <Ionicons name={category.icon as any} size={24} color="#64748b" />
                  <Text className="ml-3 text-base">{category.name}</Text>
                  <View className="ml-auto">
                    <Ionicons name="chevron-forward" size={20} color="#64748b" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <View className="bg-slate-800 flex-row justify-around items-center py-3">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#10b981" />
          <Text className="text-green-500 text-xs mt-1">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="location-outline" size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-xs mt-1">Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="add-circle" size={32} color="#10b981" />
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="mail-outline" size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-xs mt-1">Inbox</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="person-outline" size={24} color="#94a3b8" />
          <Text className="text-slate-400 text-xs mt-1">You</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;