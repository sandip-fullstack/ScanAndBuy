import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const LoginStack = createStackNavigator({
  Login: LoginScreen
})

LoginStack.navigationOptions =  {
  header: null,
  tabBarVisible: false,
  tabBarOptions: { showLabel: false },
}
HomeStack.navigationOptions = {
  header: null,
  tabBarVisible: false,
  tabBarOptions: { showLabel: false }
};

export default createBottomTabNavigator({
  LoginStack,
  HomeStack,
}
);

