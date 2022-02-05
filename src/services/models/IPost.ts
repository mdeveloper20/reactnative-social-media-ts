import IAuthor from './IAuthor';

interface IPost {
  readonly id: number;
  readonly body: string;
  readonly author: IAuthor;
}

export default IPost;
