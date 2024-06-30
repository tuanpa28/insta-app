export interface IUser {
  _id: string;
  googleId?: string;
  username: string;
  email: string;
  full_name: string;
  profile_image?: string;
  bio?: string;
  date_of_birth?: string;
  gender?: string;
  current_city?: string;
  from?: string;
  followers?: Array<IUser | string>;
  followings?: Array<IUser | string>;
  tick?: boolean;
  isAdmin?: boolean;
  totalPosts?: number;
  recentImages?: Array<string>;
  createdAt?: string | Date;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  full_name?: string;
  profile_image?: string;
  bio?: string;
  date_of_birth?: string;
  gender?: string;
  current_city?: string;
  from?: string;
}

export interface IAuthLogin {
  emailOrUsername: string;
  password: string;
}

export interface IUserState {
  users: IUser[];
  currentUser: {
    values: IUser | null;
    accessToken: string;
  };
  isLogged: boolean;
  isAdmin: boolean | null;
}
