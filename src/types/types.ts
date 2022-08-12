export interface IUser {
  id: string;
  name: string;
  email: string;
  sentMessages?: ISentMessage[];
}

export interface ISentMessage {
  id: number;
  message: string;
}

export interface Icomponent {
  testID?: string;
}
