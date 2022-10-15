import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import { Provider } from "react-redux";
import { store } from "./store/index";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: { backgroundColor: "#18191a" },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: React.ComponentProps<typeof Ionicons>["name"] =
                  "home";
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                }
                return (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={color}
                  ></Ionicons>
                );
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
          <StatusBar style="light"></StatusBar>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
