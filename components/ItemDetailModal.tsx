import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ItemDetail {
  id: string;
  title: string;
  price: string;
  distance: string;
  description?: string;
  isShippingAvailable?: boolean;
  seller?: {
    name: string;
    rating: number;
    reviews: number;
  };
  images: string[];
}

interface ItemDetailModalProps {
  visible: boolean;
  item: ItemDetail | null;
  onClose: () => void;
  onContact: () => void;
  onFavorite: () => void;
}

const { height } = Dimensions.get('window');

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  visible,
  item,
  onClose,
  onContact,
  onFavorite,
}) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-down" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={onFavorite}>
              <Ionicons name="heart-outline" size={24} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1">
          {/* Image Gallery */}
          <View className="h-64 bg-gray-200 relative">
            {/* Image placeholder */}
            <View className="flex-1 bg-yellow-400 items-center justify-center">
              <View className="w-24 h-24 bg-black rounded-full items-center justify-center">
                <Ionicons name="headset" size={40} color="white" />
              </View>
            </View>
            
            {/* Image indicators */}
            <View className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <View className="flex-row space-x-2">
                <View className="w-2 h-2 bg-white rounded-full" />
                <View className="w-2 h-2 bg-white/50 rounded-full" />
                <View className="w-2 h-2 bg-white/50 rounded-full" />
              </View>
            </View>
          </View>

          {/* Item Details */}
          <View className="p-4">
            <View className="flex-row items-start justify-between mb-2">
              <Text className="text-2xl font-bold text-gray-900">{item.price}</Text>
              <View className="bg-green-500 px-2 py-1 rounded">
                <Text className="text-white text-xs font-semibold">€15</Text>
              </View>
            </View>

            <Text className="text-lg text-gray-700 mb-3">{item.title}</Text>

            {/* Location and Shipping */}
            <View className="flex-row items-center mb-4">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="text-gray-500 ml-1">{item.distance}</Text>
              {item.isShippingAvailable && (
                <>
                  <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                  <Ionicons name="cube-outline" size={16} color="#10b981" />
                  <Text className="text-green-500 ml-1">Shipping available</Text>
                </>
              )}
            </View>

            {/* Seller Info */}
            {item.seller && (
              <View className="bg-gray-50 rounded-lg p-4 mb-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center">
                      <Ionicons name="person" size={20} color="#6b7280" />
                    </View>
                    <View className="ml-3">
                      <Text className="font-semibold text-gray-900">{item.seller.name}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {item.seller.rating} • {item.seller.reviews} reviews
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
                    <Text className="text-white font-semibold">Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Description */}
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-2">Description</Text>
              <Text className="text-gray-700 leading-6">
                {item.description || "High-quality wireless headphones in excellent condition. Perfect sound quality with noise cancellation feature. Barely used, comes with original packaging and accessories."}
              </Text>
            </View>

            {/* Safety Tips */}
            <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <View className="flex-row items-center mb-2">
                <Ionicons name="shield-checkmark" size={20} color="#3b82f6" />
                <Text className="text-blue-800 font-semibold ml-2">Safety Tips</Text>
              </View>
              <Text className="text-blue-700 text-sm">
                Meet in a safe, public location. Check the item before paying. Never share personal financial information.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View className="border-t border-gray-200 p-4">
          <View className="flex-row space-x-3">
            <TouchableOpacity 
              className="flex-1 bg-gray-100 py-4 rounded-lg items-center"
              onPress={onContact}
            >
              <Text className="font-semibold text-gray-800">Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-green-500 py-4 rounded-lg items-center"
              onPress={onContact}
            >
              <Text className="font-semibold text-white">Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gray-100 px-4 py-4 rounded-lg">
              <Ionicons name="chatbubble-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemDetailModal;