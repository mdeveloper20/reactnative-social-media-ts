import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '~/App';
import {AuthorName} from '~/components/AuthorNameComponent';
import {AvatarComponent} from '~/components/AvatarComponent';
import {AuthorWrapper} from './components/AuthorWrapper';

type Props = NativeStackScreenProps<RootStackParamList, 'Author'>;

function AuthorContainer(props: Props): JSX.Element {
  const author = props.route.params.authorData;

  return (
    <AuthorWrapper>
      <AvatarComponent singleMode={true} source={{uri: author.avatar}} />
      <AuthorName>{author.name}</AuthorName>
    </AuthorWrapper>
  );
}

export default AuthorContainer;
