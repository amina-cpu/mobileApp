import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { Filter } from "lucide-react-native";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/Supabase';
import * as Location from 'expo-location';
import SearchBar from "../../components/SearchBar";
import CategoryTabs from "../../components/CategoryTabs";
import ProductCard from "../../components/ProductCard";
import LoginScreen from "./LoginScreen"; // Import the LoginScreen component

// Haversine formula to calculate distance between two lat/long points
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) *
            Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in km
};

export default function AppRouter() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // --- Your original HomePage component, now a sub-component of the AppRouter ---
  const HomePage = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState('Loading...');
    const [userCoordinates, setUserCoordinates] = useState(null);
  
    // Function to set up the location listener
    const startLocationWatcher = async () => {
      try {
        let locationServicesEnabled = await Location.hasServicesEnabledAsync();
        if (!locationServicesEnabled) {
          setUserLocation('Location services disabled');
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setUserLocation('Permission Denied');
          return;
        }

        const subscriber = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        }, async (location) => {
          setUserCoordinates(location.coords);
          let geocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (geocode && geocode.length > 0) {
            setUserLocation(geocode[0].city);
          } else {
            setUserLocation('Unknown');
          }
        });
        
        return subscriber;

      } catch (error) {
        console.error('Error getting location:', error);
        setUserLocation('GPS not available');
        return null;
      }
    };

    // Function to fetch products from Supabase
    const fetchProducts = async () => {
      setLoading(true);
      // Fetch latitude and longitude from the database
      const { data, error } = await supabase
        .from('products')
        .select('*, latitude, longitude');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        const formattedProducts = data.map(product => ({
          ...product,
          price: product.price ? parseFloat(product.price) : null,
        }));
        setProducts(formattedProducts);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchProducts();
      let locationSubscription;
      startLocationWatcher().then(subscriber => {
        locationSubscription = subscriber;
      });

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    }, []);

    // Use a second useEffect to calculate distances once both location and products are available
    useEffect(() => {
      if (userCoordinates && products.length > 0) {
        const productsWithDistance = products.map(product => {
          if (product.latitude && product.longitude) {
            const productCoords = { latitude: product.latitude, longitude: product.longitude };
            const distance = haversineDistance(userCoordinates, productCoords);
            return { ...product, distance: `${distance.toFixed(1)} km` };
          }
          return { ...product, distance: 'N/A' };
        });
        setProducts(productsWithDistance);
      }
    }, [userCoordinates, products.length]);

    const filteredProducts = activeTab === 'All'
      ? products
      : products.filter(p => p.tag.toLowerCase() === activeTab.toLowerCase());

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#D1FAE5" }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header with teal gradient */}
          <View style={{ backgroundColor: "#14B8A6", paddingTop: 20, paddingBottom: 20, paddingHorizontal: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <SearchBar userLocation={userLocation} />
            <CategoryTabs onCategoryPress={(cat, idx) => {}} />
          </View>

          {/* All items section */}
          <View style={{
            backgroundColor: "white",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 16,
            paddingTop: 24,
            marginTop: 10,
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
            {loading ? (
              <Text>Loading products...</Text>
            ) : (
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={idx} {...product} />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  if (loadingSession) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#14B8A6" />
      </View>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return <HomePage />;
}
