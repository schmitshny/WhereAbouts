export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  _id: string;
  avatarImage: string;
  bio?: string;
}

export interface SignedUser {
  result?: {
    email?: string;
    firstName?: string;
    secondName?: string;
    imageUrl?: string;
    name?: string;
    lastName?: string;
    _id: string;
    avatarImage: string;
  };
  token?: string;
}
export interface userEditedData {
  name?: string;
  lastName?: string;
  email?: string;
  bio?: string;
}
