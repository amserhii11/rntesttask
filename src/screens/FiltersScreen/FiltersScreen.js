import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getMethod} from '../../../services/axios-services';
import {listUrl} from '../../../constants/constants';
import {FilterItem} from './components/FilterItem';

export class FiltersScreen extends React.Component {
  state = {
    filterCategories: [],
    selectedCategories: [],
  };

  componentDidMount() {
    this.laodListOfCategories();
  }

  selectCategories(category) {
    let list = this.state.selectedCategories;
    list.push(category);
    this.setState({selectedCategories: list}, () => {});
  }

  deleteCategories(category) {
    let list = this.state.selectedCategories;
    const newList = list.filter((item) => item !== category);
    this.setState({selectedCategories: newList});
  }

  laodListOfCategories() {
    getMethod(listUrl).then((response) => {
      this.setState({filterCategories: response.data.drinks});
    });
  }

  render() {
    const {filterCategories, selectedCategories} = this.state;
    return (
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
          {filterCategories.length > 0 ? (
            filterCategories.map((category) => {
              return (
                <FilterItem
                  category={category.strCategory}
                  selectCategories={() =>
                    this.selectCategories(category.strCategory)
                  }
                  deleteCategories={() =>
                    this.deleteCategories(category.strCategory)
                  }
                />
              );
            })
          ) : (
            <ActivityIndicator
              color="black"
              size="large"
              style={{padding: 10}}
            />
          )}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() =>
            this.props.navigation.push('Drinks', {
              selectedCategories: selectedCategories,
            })
          }>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#272727',
    marginHorizontal: 35,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
