import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;
