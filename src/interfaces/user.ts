export interface IUser {
  _id?: string;
  googleId?: string;
  username: string;
  email?: string;
  full_name: string;
  profile_image?: string;
  bio?: string;
  date_of_birth?: string;
  gender?: string;
  current_city?: string;
  from?: string;
  followers?: Array<any>;
  followings?: Array<any>;
  tick?: boolean;
  isAdmin?: boolean;
}

export interface IAuth {
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
