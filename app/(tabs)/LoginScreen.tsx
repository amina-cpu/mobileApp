import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../lib/Supabase';
import { Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D1FAE5", justifyContent: 'center', padding: 24 }}>
      <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#14B8A6", textAlign: 'center', marginBottom: 24 }}>
          LAVA
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: "#1F2937", textAlign: 'center', marginBottom: 24 }}>
          Welcome back!
        </Text>
        
        {/* Email Input */}
        <TextInput
          style={{
            height: 50,
            borderColor: '#D1D5DB',
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            marginBottom: 16,
            color: "#1F2937",
            backgroundColor: "#F9FAFB",
          }}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, marginBottom: 24, backgroundColor: "#F9FAFB" }}>
          <TextInput
            style={{ flex: 1, color: "#1F2937" }}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={signInWithEmail}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#9CA3AF" : "#14B8A6",
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {loading ? <ActivityIndicator color="white" /> : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={signUpWithEmail}
          disabled={loading}
          style={{
            backgroundColor: 'transparent',
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            borderColor: '#14B8A6',
            borderWidth: 1,
          }}>
          <Text style={{ color: "#14B8A6", fontWeight: 'bold', fontSize: 16 }}>
            Create an Account
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
