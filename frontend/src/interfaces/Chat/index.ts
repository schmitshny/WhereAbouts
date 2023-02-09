export interface Message {
  fromSelf: boolean;
  message: {
    text: string;
  };
  image?: string;
}
