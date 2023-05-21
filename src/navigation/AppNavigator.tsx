import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/user/UserScreen';
import GameScreen from '../screens/game/GameScreen';
import ResultsScreen from '../screens/results/ResultsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PlayerName" screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="PlayerName"
                    component={UserScreen}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={{ title: 'Simon Says Game' }}
                />
                <Stack.Screen
                    name="Results"
                    component={ResultsScreen}
                    options={{ title: 'Results' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;