import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '~/App';
type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

function PostContainer(props: Props): JSX.Element {
  console.log('post rendered', props);
  return (
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text> aa{props.route.params.postData.body}</Text>
    </View>
  );
}

export default PostContainer;
