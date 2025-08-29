import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { supabase } from '../../lib/Supabase';
import { Camera, MapPin, User } from 'lucide-react-native';

const DEFAULT_AVATAR_URL = 'https://placehold.co/120x120/E5E7EB/4B5563?text=User';

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(DEFAULT_AVATAR_URL);
  const [currentLocation, setCurrentLocation] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  // Function to get the current user's profile from the database
  const fetchUserProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getSession();
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('username, profile_picture_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setUserProfile(data);
        setProfilePicture(data.profile_picture_url || DEFAULT_AVATAR_URL);
      }
    }
    setLoading(false);
  };

  // Function to get the user's real-time location
  const getUserCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentLocation('Permission Denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (geocode && geocode.length > 0) {
        setCurrentLocation(geocode[0].city);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setCurrentLocation('GPS not available');
    }
  };

  // Function to let the user pick a new profile picture and upload it
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const { data: { user } } = await supabase.auth.getSession();
    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const imageUri = result.assets[0].uri;
    const fileExt = imageUri.split('.').pop();
    const fileName = `${user.id}.${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_picture_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setProfilePicture(publicUrl);
      console.log("Profile picture updated successfully!");
      
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    getUserCurrentLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>You</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: profilePicture }} 
            style={styles.profileImage} 
            onError={() => setProfilePicture(DEFAULT_AVATAR_URL)}
          />
          <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
            <Camera size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{userProfile?.username || 'Guest User'}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#4B5563" />
          <Text style={styles.locationText}>{currentLocation}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: "#14B8A6",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#14B8A6',
  },
  defaultProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D1D5DB',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#14B8A6',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#F9FAFB',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 4,
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 50,
  },
});
