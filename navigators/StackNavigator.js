import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrinksScreen} from '../src/screens/DrinksScreen/DrinksScreen';
import {FiltersScreen} from '../src/screens/FiltersScreen/FiltersScreen';
import {NavigationContainer} from '@react-navigation/native';

const DrinksStack = createStackNavigator();

export const Drinks = () => {
  return (
    <NavigationContainer>
      <DrinksStack.Navigator>
        <DrinksStack.Screen
          name="Drinks"
          component={DrinksScreen}
          options={({navigation, route}) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
                <Image
                  source={require('../assets/filterslogo.png')}
                  style={{width: 27, height: 29, marginRight: 20}}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => <View></View>,
          })}
        />
        <DrinksStack.Screen
          name="Filters"
          component={FiltersScreen}
          options={{headerBackTitle: 'Back'}}
        />
      </DrinksStack.Navigator>
    </NavigationContainer>
  );
};
