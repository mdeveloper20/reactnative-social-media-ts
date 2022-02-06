/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import FeedContainer from '~/containers/Feed/FeedContainer';
import store from '~/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostContainer from './containers/Post/PostContainer';
import IPost from './services/models/IPost';
import IAuthor from './services/models/IAuthor';
import AuthorContainer from './containers/Author/AuthorContainer';

export type RootStackParamList = {
  Post: {postData: IPost};
  Feed: undefined;
  Author: {authorData: IAuthor};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Feed'}>
          <Stack.Screen name="Feed" component={FeedContainer} />
          <Stack.Screen name="Post" component={PostContainer} />
          <Stack.Screen name="Author" component={AuthorContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
