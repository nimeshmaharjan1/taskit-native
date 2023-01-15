import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, styled } from 'nativewind';
import { useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();

  const StyledView = styled(View, 'flex-1 items-center justify-center dark:bg-black');
  const StyledText = styled(Text, 'font-bold dark:text-white');
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <StyledView>
        <StyledText>Open up App.js to start working on your app!</StyledText>
        <Pressable
          className="bg-white p-4 active:bg-slate-300 transition-all"
          onPress={() => {
            colorScheme.toggleColorScheme();
          }}
        >
          <Text className="text-black active:text-white">Hello</Text>
        </Pressable>
        <StatusBar style="auto" />
      </StyledView>
    </NavigationContainer>
  );
}
