import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export class FilterItem extends React.Component {
  state = {
    selected: false,
  };

  onSelect() {
    const {selectCategories, deleteCategories, category} = this.props;
    this.setState({selected: !this.state.selected}, () => {
      this.state.selected ? selectCategories() : deleteCategories();
    });
  }

  render() {
    const {category} = this.props;
    const {selected} = this.state;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.onSelect()}>
        <View style={styles.filterItem}>
          <Text style={styles.itemText}>{category}</Text>

          <Image
            source={selected && require('../../../../assets/filtermark.png')}
            style={{width: 25, height: 18}}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 35,
  },
  itemText: {
    color: '#7E7E7E',
    fontSize: 16,
  },
});
