import React from 'react';
import {Text} from 'react-native';
import IPost from '~/services/models/IPost';
import styled from 'styled-components/native';

const AvatarComponent = styled.Image`
  width: 100px;
  height: 100px;
`;

const PostRowContainer = styled.Pressable``;

const AuthorNameContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
`;

const AuthorName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const AuthorContainer = styled.View`
  flex-direction: row;
`;

const BodyContainer = styled.View`
  margin-left: 100px;
  margin-top: 20px;
`;
export const PostRow = ({
  item,
  onPress,
}: {
  item: IPost;
  onPress: (post: IPost) => void;
}) => {
  return (
    <PostRowContainer onPress={() => onPress(item)} key={item.id}>
      <AuthorContainer>
        <AvatarComponent source={{uri: item.author.avatar}} />
        <AuthorNameContainer>
          <AuthorName>{item.author.name}</AuthorName>
        </AuthorNameContainer>
      </AuthorContainer>
      <BodyContainer>
        <Text>{item.body}</Text>
      </BodyContainer>
    </PostRowContainer>
  );
};
