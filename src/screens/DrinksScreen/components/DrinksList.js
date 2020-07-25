import React from 'react';
import {Text, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import {getMethod} from '../../../../services/axios-services';
import {listUrl} from '../../../../constants/constants';
import {CategoryItems} from './CategoryItems';

export class DrinksList extends React.Component {
  state = {
    listOfCategories: [],
    itemToRender: 1,
  };

  componentDidMount() {
    if (this.props.selectedCategories.length > 0) {
      console.log(this.props.selectedCategories);
      this.setState({listOfCategories: this.props.selectedCategories});
    } else {
      this.laodListOfCategories();
    }
  }

  laodListOfCategories() {
    getMethod(listUrl).then((response) => {
      let newList = [];
      response.data.drinks.map((item) => newList.push(item.strCategory));
      this.setState({listOfCategories: newList}, () => console.log(newList));
    });
  }

  render() {
    const {listOfCategories, itemToRender} = this.state;

    const items = listOfCategories.map((category, index) => {
      if (index + 1 <= itemToRender) {
        return (
          <>
            <Text style={styles.title}>{category}</Text>
            <CategoryItems category={category} key={index} />
          </>
        );
      }
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle={'black'}
        onMomentumScrollEnd={(e) => {
          const scrollPosition = e.nativeEvent.contentOffset.y;
          const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
          const contentHeight = e.nativeEvent.contentSize.height;
          const isScrolledToBottom = scrollViewHeight + scrollPosition;
          if (
            isScrolledToBottom >= contentHeight - 50 &&
            itemToRender <= listOfCategories.length
          ) {
            this.setState({itemToRender: itemToRender + 1});
          }
        }}>
        {items}
        {itemToRender - 1 !== listOfCategories.length ? (
          <ActivityIndicator
            color="black"
            size="large"
            style={{marginTop: '10%', marginBottom: '10%'}}
          />
        ) : (
          <Text style={[styles.title, {fontSize: 16}]}>The list is over</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 14,
    color: '#7E7E7E',
  },
});
