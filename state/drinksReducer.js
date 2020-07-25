import {ActivityIndicator} from 'react-native';

export function drinksReducer(state, action) {
  switch (action.type) {
    case 'filter': {
      return;
      const {category} = action.payload;
      state.filter((item) => item.strCategory != category);
    }
  }
}
