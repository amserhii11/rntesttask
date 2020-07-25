import React from 'react';
import {SafeAreaView} from 'react-native';
import {DrinksList} from './components/DrinksList';

export class DrinksScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <DrinksList
          selectedCategories={
            this.props.route.params
              ? this.props.route.params.selectedCategories
              : []
          }
        />
      </SafeAreaView>
    );
  }
}
