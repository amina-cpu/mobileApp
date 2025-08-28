import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart, MapPin } from "lucide-react-native";

interface ProductProps {
  title: string;
  price: string;
  image: string;
  distance: string;
  tag?: string;
  tagColor?: string;
  liked?: boolean;
  shipping?: boolean;
}

export default function ProductCard({ 
  title, 
  price, 
  image, 
  distance, 
  tag, 
  tagColor = "#3B82F6", 
  liked = false,
  shipping = false 
}: ProductProps) {
  return (
    <View style={{ 
      backgroundColor: "white", 
      borderRadius: 12, 
      overflow: "hidden", 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 12,
      width: "48%" 
    }}>
      <View style={{ position: "relative" }}>
        <Image 
          source={{ uri: image }} 
          style={{ width: "100%", height: 120 }} 
          resizeMode="cover" 
        />
        
        {tag && (
          <View style={{ 
            position: "absolute", 
            top: 6, 
            right: 6, 
            backgroundColor: tagColor, 
            paddingHorizontal: 6, 
            paddingVertical: 2, 
            borderRadius: 4 
          }}>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "600" }}>{tag}</Text>
          </View>
        )}
        
        <TouchableOpacity style={{ 
          position: "absolute", 
          top: 6, 
          left: 6, 
          backgroundColor: "white", 
          borderRadius: 12, 
          padding: 4 
        }}>
          <Heart 
            size={14} 
            color={liked ? "#EC4899" : "#9CA3AF"} 
            fill={liked ? "#EC4899" : "none"}
          />
        </TouchableOpacity>
      </View>
      
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 14, color: "#1F2937", fontWeight: "bold", marginBottom: 2 }}>
          {price}
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
          <MapPin size={10} color="#9CA3AF" style={{ marginRight: 2 }} />
          <Text style={{ fontSize: 10, color: "#9CA3AF" }}>{distance}</Text>
        </View>
        {shipping && (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <View style={{ 
              width: 6, 
              height: 6, 
              borderRadius: 3, 
              backgroundColor: "#EC4899", 
              marginRight: 4 
            }} />
            <Text style={{ fontSize: 10, color: "#EC4899", fontWeight: "500" }}>
              Shipping available
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}