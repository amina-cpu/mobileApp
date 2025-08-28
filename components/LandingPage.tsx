import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LandingPageProps {
  onItemPress?: (item: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onItemPress }) => {
  const [searchText, setSearchText] = useState('');

  const mockItems = [
    {
      id: '1',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'walker',
      backgroundColor: '#fbbf24' // yellow
    },
    {
      id: '2',
      title: 'Item title',
      price: '- DA',
      distance: '1.5 km',
      isNew: true,
      image: 'truck',
      backgroundColor: '#3b82f6' // blue
    },
    {
      id: '3',
      title: 'Item title',
      price: '155 ML',
      distance: '1.5 km',
      image: 'car',
      backgroundColor: '#1e40af' // dark blue
    },
    {
      id: '4',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'chair',
      backgroundColor: '#8b5cf6' // purple
    },
    {
      id: '5',
      title: 'Item title',
      price: '50000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'computer',
      backgroundColor: '#1f2937' // dark gray
    },
    {
      id: '6',
      title: 'Item title',
      price: '20 000 DA',
      distance: '1.5 km',
      isAsked: true,
      image: 'dog',
      backgroundColor: '#16a34a' // green
    },
    {
      id: '7',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'basketball',
      backgroundColor: '#dc2626' // red
    },
    {
      id: '8',
      title: 'Item title',
      price: '- DA',
      distance: '1.5 km',
      image: 'laptop',
      backgroundColor: '#374151' // gray
    },
    {
      id: '9',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isExchange: true,
      image: 'phone',
      backgroundColor: '#059669' // emerald
    },
    {
      id: '10',
      title: 'Item title',
      price: '- DA',
      distance: '1.5 km',
      isAsked: true,
      image: 'headphones',
      backgroundColor: '#fbbf24' // yellow
    },
    {
      id: '11',
      title: 'Item title',
      price: '3000 DA',
      distance: '1.5 km',
      isNew: true,
      image: 'tools',
      backgroundColor: '#0891b2' // cyan
    },
    {
      id: '12',
      title: 'Item title',
      price: '1.2 MLYAR',
      distance: '1.5 km',
      image: 'house',
      backgroundColor: '#16a34a' // green
    },
    {
      id: '13',
      title: 'Item title',
      price: '5000 DA',
      distance: '1.5 km',
      isNew: true,
      image: 'house2',
      backgroundColor: '#22c55e' // light green
    },
    {
      id: '14',
      title: 'Item title',
      price: '980 MLYON',
      distance: '1.5 km',
      isAsked: true,
      image: 'car2',
      backgroundColor: '#e5e7eb' // light gray
    },
  ];

  const categories = [
    { id: 'home', name: 'Home &\nFurniture', icon: 'home-outline', color: '#10b981' },
    { id: 'realestate', name: 'Real Estate', icon: 'business-outline', color: '#10b981' },
    { id: 'phone', name: 'Phone and\nAccessories', icon: 'phone-portrait-outline', color: '#10b981' },
    { id: 'computers', name: 'Computers\n& Accessories', icon: 'laptop-outline', color: '#10b981' },
  ];

  const tabs = ['All', 'offered', 'Asked'];

  const renderItem = (item: any, index: number) => (
    <TouchableOpacity 
      key={item.id}
      className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden"
      onPress={() => onItemPress?.(item)}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="relative">
        {/* Image Container */}
        <View 
          className="h-32 items-center justify-center"
          style={{ backgroundColor: item.backgroundColor }}
        >
          {/* Placeholder for item image - you can replace with actual images */}
          <View className="w-16 h-16 bg-black/20 rounded-lg" />
        </View>
        
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
          <Ionicons name="heart-outline" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className="font-bold text-base mb-1">{item.price}</Text>
        <Text className="text-gray-600 text-sm mb-2">{item.title}</Text>
        
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={12} color="#6b7280" />
          <Text className="text-gray-500 text-xs ml-1">{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#10b981" />
      
      {/* Header */}
      <View className="bg-green-500 px-4 pb-4">
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <View className="flex-row items-center flex-1">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              placeholder="Search LAVA"
              placeholderTextColor="rgba(255,255,255,0.8)"
              className="flex-1 ml-3 text-white text-base"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View className="flex-row items-center ml-4">
            <Ionicons name="location" size={16} color="white" />
            <Text className="text-white text-sm ml-1 font-medium">Washington</Text>
          </View>
        </View>

        {/* Category Icons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-6">
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} className="items-center">
                <View className="w-14 h-14 bg-white rounded-xl items-center justify-center mb-2">
                  <Ionicons name={cat.icon as any} size={26} color={cat.color} />
                </View>
                <Text className="text-white text-xs text-center leading-3 w-16">
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <View className="flex-1 px-4">
        {/* All items section */}
        <View className="mt-6 mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">All items</Text>
          
          {/* Tabs */}
          <View className="flex-row mb-4">
            {tabs.map((tab, index) => (
              <View key={tab} className="flex-row items-center">
                <Text 
                  className={`text-base ${
                    index === 0 ? 'text-green-500 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
                {index < tabs.length - 1 && (
                  <View className="w-px h-4 bg-gray-300 mx-4" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Items Grid */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-row flex-wrap justify-between pb-20">
            {mockItems.map((item, index) => renderItem(item, index))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="flex-row justify-around items-center py-3">
          <TouchableOpacity className="items-center">
            <Ionicons name="home" size={24} color="#10b981" />
            <Text className="text-green-500 text-xs mt-1 font-medium">Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center">
            <Ionicons name="map-outline" size={24} color="#6b7280" />
            <Text className="text-gray-500 text-xs mt-1">Map</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center">
              <Ionicons name="add" size={28} color="white" />
            </View>
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
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;