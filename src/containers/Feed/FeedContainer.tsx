import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '~/redux/hooks';
import {
  appendPost,
  resetPosts,
  setFetching,
} from '~/redux/reducers/postsReducer';
import IPost from '~/services/models/IPost';
import {PostsAPI} from '~/services/posts/PostAPI';
import {CancelTokenSource} from 'axios';
import PostRow from './components/PostRow';
import {Loading} from '~/components/Loading';
import {FeedArea} from './components/FeedArea';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/App';
import IAuthor from '~/services/models/IAuthor';

type Props = NativeStackScreenProps<RootStackParamList, 'Feed'>;

function FeedContainer({navigation}: Props): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const posts: IPost[] = useAppSelector(state => state.posts.entries);
  const page: number = useAppSelector(state => state.posts.page);
  const isFetching: boolean = useAppSelector(state => state.posts.isFetching);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelHandle: CancelTokenSource;
    const fetchPosts = async () => {
      try {
        //fetch posts
        dispatch(setFetching(true));

        const postAPI = PostsAPI.getInstance();
        cancelHandle = postAPI.getSource();
        const {data} = await postAPI.getPosts(1, cancelHandle.token);
        setEndReached(data.length === 0);
        dispatch(resetPosts(data));
      } catch (e) {
        console.error(e);
      } finally {
        setIsRefreshing(false);
      }
    };

    fetchPosts();
    () => {
      if (cancelHandle) {
        cancelHandle.cancel('Abort');
      }
    };
  }, [dispatch, refreshKey]);

  const loadMorePosts = async () => {
    let p = page;

    try {
      if (isFetching || endReached) {
        return;
      }
      //fetch posts
      dispatch(setFetching(true));

      const postAPI = PostsAPI.getInstance();
      const {data} = await postAPI.getPosts(page);
      setEndReached(data.length === 0);
      dispatch(appendPost(data));
    } catch (e) {
      console.error(e);
    }
  };

  const onRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setIsRefreshing(true);
  };

  const renderFooter = () => {
    if (!isFetching) {
      return null;
    }
    return <ActivityIndicator />;
  };

  const onItemPressed = (post: IPost) => {
    navigation.push('Post', {postData: post});
  };

  const onPressAuthor = (author: IAuthor) => {
    navigation.push('Author', {authorData: author});
  };

  return (
    <FeedArea>
      {isRefreshing && posts.length === 0 ? <Loading /> : null}
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostRow
            onPress={onItemPressed}
            onPressAuthor={onPressAuthor}
            item={item}
          />
        )}
        keyExtractor={item => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListFooterComponent={renderFooter}
        onEndReached={loadMorePosts}
      />
    </FeedArea>
  );
}

export default FeedContainer;
