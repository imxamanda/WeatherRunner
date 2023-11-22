import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import Weather from "../screens/weather/Weather";
import { App } from "../screens/jogo/src";


const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerShown: false
                    }}
                    
                    />

                <Stack.Screen 
                    name="Clima" 
                    component={Weather}
                    options={{
                        headerShown: false
                    }}
                    
                    />
                <Stack.Screen 
                    name="Jogo" 
                    component={App}
                    options={{
                        headerShown: false
                    }}
                    
                    />

            </Stack.Navigator>
        </NavigationContainer>



    )
}