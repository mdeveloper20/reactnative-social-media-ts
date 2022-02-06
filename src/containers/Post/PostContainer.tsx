import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable} from 'react-native';
import {RootStackParamList} from '~/App';
import {AuthorName} from '~/components/AuthorNameComponent';
import {AvatarComponent} from '~/components/AvatarComponent';
import IAuthor from '~/services/models/IAuthor';
import {PostBody} from './components/PostBody';
import {PostWrapper} from './components/PostWrapper';

type Props = NativeStackScreenProps<RootStackParamList, 'Post'>;

function PostContainer({navigation, route}: Props): JSX.Element {
  const onPressAuthor = (author: IAuthor) => {
    navigation.push('Author', {authorData: author});
  };

  const post = route.params.postData;
  return (
    <PostWrapper>
      <Pressable onPress={() => onPressAuthor(post.author)}>
        <AvatarComponent singleMode={true} source={{uri: post.author.avatar}} />
        <AuthorName>{post.author.name}</AuthorName>
      </Pressable>

      <PostBody>{post.body}</PostBody>
    </PostWrapper>
  );
}

export default PostContainer;
