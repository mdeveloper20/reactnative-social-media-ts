import {CancelToken, CancelTokenSource} from 'axios';
import api, {source} from '~/config/axios';
import ServerResponse from '../models/ServerResponse';

export class PostsAPI {
  private static instance: PostsAPI;

  static getInstance = () => {
    if (!PostsAPI.instance) {
      PostsAPI.instance = new PostsAPI();
    }
    return PostsAPI.instance;
  };

  getSource = (): CancelTokenSource => {
    return source();
  };

  getPosts = async (
    page: number,
    cancelToken?: CancelToken,
  ): Promise<ServerResponse> => {
    return await api.get(`/posts?_page=${page}&_limit=10`, {cancelToken});
  };
}
