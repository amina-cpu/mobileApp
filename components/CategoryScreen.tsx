import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryItem {
  id: string;
  title: string;
  price: string;
  distance: string;
  isExchange?: boolean;
  isAsked?: boolean;
  isNew?: boolean;
  isShippingAvailable?: boolean;
  image: string;
}

interface CategoryScreenProps {
  categoryTitle?: string;
  onItemPress?: (item: CategoryItem) => void;
  onBackPress?: () => void;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({
  categoryTitle = "Phone & Accessories",
  onItemPress,
  onBackPress,
}) => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');

  const subCategories = [
    { id: 'smartphones', name: 'Smartphones', icon: 'phone-portrait-outline' },
    { id: 'mobile', name: 'Mobile phones', icon: 'phone-portrait-outline' },
    { id: 'tablets', name: 'Tablets', icon: 'tablet-portrait-outline' },
    { id: 'fixed', name: 'Fixed line', icon: 'call-outline' },
  ];

  const mockItems: CategoryItem[] = [
    {
      id: '1',
      title: 'Item title',
      price: '€15',
      distance: '1.5 km',
      isShippingAvailable: true,
      image: 'headphones'
    },
    {
      id: '2',
      title: 'Item title',
      price: '€15',
      distance: '1.5 km',
      isShippingAvailable: true,
      image: 'headphones'
    },
    {
      id: '3',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'walker'
    },
    {
      id: '4',
      title: 'Item title',
      price: '- DA',
      distance: '1.5 km',
      isNew: true,
      image: 'truck'
    },
    {
      id: '5',
      title: 'Item title',
      price: '155 ML',
      distance: '1.5 km',
      image: 'car'
    },
    {
      id: '6',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'chair'
    },
    {
      id: '7',
      title: 'Item title',
      price: '50000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'computer'
    },
    {
      id: '8',
      title: 'Item title',
      price: '20 000 DA',
      distance: '1.5 km',
      isAsked: true,
      image: 'dog'
    },
  ];

  const tabs = ['All', 'offered', 'Asked'];
  const filters = ['All', 'Buy', 'Rent', 'Exchange'];

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg mb-3 overflow-hidden shadow-sm"
      onPress={() => onItemPress?.(item)}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <View className="relative">
        {/* Image placeholder */}
        <View className="h-32 bg-gray-200 rounded-t-lg" />
        
        {/* Badges */}
        <View className="absolute top-2 left-2">
          {item.isExchange && (
            <View className="bg-blue-500 px-2 py-1 rounded">
              <Text className="text-white text-xs font-semibold">Exchange</Text>
            </View>
          )}
          {item.isNew && (
            <View className="bg-orange-500 px-2 py-1 rounded">
              <Text className="text-white text-xs font-semibold">New</Text>
            </View>
          )}
          {item.isAsked && (
            <View className="bg-black px-2 py-1 rounded">
              <Text className="text-white text-xs font-semibold">Asked</Text>
            </View>
          )}
        </View>

        {/* Heart icon */}
        <TouchableOpacity className="absolute top-2 right-2">
          <Ionicons name="heart-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className="font-semibold text-base mb-1">{item.price}</Text>
        <Text className="text-gray-600 mb-2">{item.title}</Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-gray-500 text-sm ml-1">{item.distance}</Text>
          </View>
          
          {item.isShippingAvailable && (
            <View className="flex-row items-center">
              <Ionicons name="cube-outline" size={14} color="#10b981" />
              <Text className="text-green-500 text-xs ml-1">Shipping available</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="bg-green-500 px-4 py-3">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              placeholder="Search LAVA"
              placeholderTextColor="rgba(255,255,255,0.8)"
              className="flex-1 ml-2 text-white"
            />
          </View>
          <View className="flex-row items-center ml-3">
            <Ionicons name="location" size={16} color="white" />
            <Text className="text-white text-sm ml-1">Washington</Text>
          </View>
        </View>

        {/* Category Icons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-white rounded-lg items-center justify-center">
                <Ionicons name="home-outline" size={24} color="#10b981" />
              </View>
              <Text className="text-white text-xs mt-1">Home &</Text>
              <Text className="text-white text-xs">Furniture</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-white rounded-lg items-center justify-center">
                <Ionicons name="business-outline" size={24} color="#10b981" />
              </View>
              <Text className="text-white text-xs mt-1">Real Estate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-white rounded-lg items-center justify-center">
                <Ionicons name="phone-portrait-outline" size={24} color="#10b981" />
              </View>
              <Text className="text-white text-xs mt-1">Phone and</Text>
              <Text className="text-white text-xs">Accessories</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-white rounded-lg items-center justify-center">
                <Ionicons name="laptop-outline" size={24} color="#10b981" />
              </View>
              <Text className="text-white text-xs mt-1">Computers</Text>
              <Text className="text-white text-xs">& Accessories</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Category Detail Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center mb-3">
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1 mx-3">
            <View className="bg-gray-100 rounded-lg px-3 py-2 flex-row items-center">
              <Ionicons name="search" size={18} color="#6b7280" />
              <TextInput
                placeholder="Search in this category"
                placeholderTextColor="#6b7280"
                className="flex-1 ml-2 text-gray-800"
              />
            </View>
          </View>
        </View>

        <Text className="text-lg font-semibold mb-3">{categoryTitle}</Text>

        {/* Sub Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          <View className="flex-row space-x-3">
            {subCategories.map((cat) => (
              <TouchableOpacity key={cat.id} className="items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
                  <Ionicons name={cat.icon as any} size={24} color="#6b7280" />
                </View>
                <Text className="text-gray-600 text-xs mt-1 text-center w-16">
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Location and Filter */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#10b981" />
            <Text className="text-green-500 ml-1">Washington : 30 KM +</Text>
            <Ionicons name="cube-outline" size={16} color="#10b981" ml={2} />
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity>
              <Ionicons name="swap-vertical" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row mb-3">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`px-4 py-2 mr-3 rounded-full border ${
                activeTab === tab 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 bg-white'
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={
                activeTab === tab ? 'text-green-500' : 'text-gray-600'
              }>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`px-3 py-1 rounded-full border ${
                  activeFilter === filter 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300 bg-white'
                }`}
                onPress={() => setActiveFilter(filter)}
              >
                <Text className={
                  activeFilter === filter ? 'text-white' : 'text-gray-600'
                }>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Items List */}
      <FlatList
        data={mockItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row justify-around items-center py-3">
        <TouchableOpacity className="items-center">
          <Ionicons name="home-outline" size={24} color="#6b7280" />
          <Text className="text-gray-500 text-xs mt-1">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="map-outline" size={24} color="#6b7280" />
          <Text className="text-gray-500 text-xs mt-1">Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="add-circle" size={32} color="#10b981" />
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="mail-outline" size={24} color="#6b7280" />
          <Text className="text-gray-500 text-xs mt-1">Inbox</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center">
          <Ionicons name="person-outline" size={24} color="#6b7280" />
          <Text className="text-gray-500 text-xs mt-1">You</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;