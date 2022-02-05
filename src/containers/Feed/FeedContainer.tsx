import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '~/redux/hooks';
import {appendPost, resetPosts} from '~/redux/reducers/postsReducer';
import IPost from '~/services/models/IPost';
import {PostsAPI} from '~/services/posts/PostAPI';
import {CancelTokenSource} from 'axios';
import {PostRow} from './components/PostRow';
import {Loading} from '~/components/Loading';
import {SeperatorComponent} from '~/components/SeperatorComponent';
import {FeedArea} from './components/FeedArea';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/App';

type Props = NativeStackScreenProps<RootStackParamList, 'Feed'>;

function FeedContainer({navigation}: Props): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const posts: IPost[] = useAppSelector(state => state.posts.entries);
  const page: number = useAppSelector(state => state.posts.page);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelHandle: CancelTokenSource;
    const fetchPosts = async () => {
      try {
        //fetch posts
        setIsRefreshing(true);

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
    try {
      if (isFetching || endReached) {
        return;
      }
      //fetch posts
      setIsFetching(true);
      console.log('load page', page);
      const postAPI = PostsAPI.getInstance();
      const {data} = await postAPI.getPosts(page);
      setEndReached(data.length === 0);
      dispatch(appendPost(data));
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
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

  return (
    <FeedArea>
      {isRefreshing && posts.length === 0 ? <Loading /> : null}
      <FlatList
        data={posts}
        renderItem={({item}) => <PostRow onPress={onItemPressed} item={item} />}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={SeperatorComponent}
        initialNumToRender={5}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListFooterComponent={renderFooter}
        onEndReached={loadMorePosts}
      />
    </FeedArea>
  );
}

export default FeedContainer;
