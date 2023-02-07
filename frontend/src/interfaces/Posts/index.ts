export interface Post {
  _id: string;
  title: string;
  message: string;
  name?: string;
  creator?: {
    _id: string;
    name: string;
    avatarImage: string;
  };
  tags: string[];
  selectedFile: string;
  likes: string[];
  createdAt?: Date;
  comments?: string[];
}

export interface IFetchPost {
  data: Post[];
  currentPage: number;
  numberOfPages: number;
}
