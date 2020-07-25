import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {getMethod} from '../../../../services/axios-services';
import {filterUrl} from '../../../../constants/constants';

export class CategoryItems extends React.Component {
  state = {
    listOfDrinks: [],
  };

  componentDidMount() {
    this.loadListCurrentCategory();
  }

  loadListCurrentCategory() {
    const {category} = this.props;

    getMethod(filterUrl + category).then((response) => {
      this.setState({listOfDrinks: response.data.drinks});
    });
  }

  render() {
    const {listOfDrinks} = this.state;
    return (
      <View>
        {listOfDrinks.map((item) => {
          return (
            <View key={item.idDrink} style={styles.drinkItem}>
              <Image
                style={styles.drinkImage}
                source={{
                  uri: item.strDrinkThumb,
                }}
              />
              <Text style={styles.drinkText}>{item.strDrink}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drinkImage: {
    width: 100,
    height: 100,
  },
  drinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  drinkText: {
    color: '#7E7E7E',
    fontSize: 16,
    paddingLeft: 20,
  },
});
