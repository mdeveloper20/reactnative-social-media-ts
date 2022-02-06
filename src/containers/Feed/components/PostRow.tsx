import React from 'react';
import {Text} from 'react-native';
import IPost from '~/services/models/IPost';
import styled from 'styled-components/native';
import {AvatarComponent} from '~/components/AvatarComponent';
import {AuthorName} from '~/components/AuthorNameComponent';
import IAuthor from '~/services/models/IAuthor';
import {SeperatorComponent} from '~/components/SeperatorComponent';

const PostRowContainer = styled.Pressable``;

const AuthorNameContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
`;

const AuthorContainer = styled.Pressable`
  flex-direction: row;
  margin-top: 20px;
`;

const BodyContainer = styled.View`
  margin-left: 100px;
  margin-top: 20px;
`;
const PostRow = ({
  item,
  onPress,
  onPressAuthor,
}: {
  item: IPost;
  onPress: (post: IPost) => void;
  onPressAuthor: (author: IAuthor) => void;
}) => {
  return (
    <PostRowContainer onPress={() => onPress(item)} key={item.id}>
      <AuthorContainer onPress={() => onPressAuthor(item.author)}>
        <AvatarComponent source={{uri: item.author.avatar}} />
        <AuthorNameContainer>
          <AuthorName>{item.author.name}</AuthorName>
        </AuthorNameContainer>
      </AuthorContainer>
      <BodyContainer>
        <Text>
          {item.body.length > 100
            ? item.body.substring(0, 100) + '...'
            : item.body}
        </Text>
      </BodyContainer>
      <SeperatorComponent />
    </PostRowContainer>
  );
};

export default React.memo(PostRow);
