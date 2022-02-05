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
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import FeedContainer from '~/containers/Feed/FeedContainer';
import store from '~/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostContainer from './containers/Post/PostContainer';
import IPost from './services/models/IPost';
import {Screen} from 'react-native-screens';
import {Screens} from './config/vars';

export type RootStackParamList = {
  Post: {postData: IPost};
  Feed: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Feed'}>
          <Stack.Screen name="Feed" component={FeedContainer} />

          <Stack.Screen name="Post" component={PostContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
