export type TUserRegister = {
  name: string;
  email: string;
  username: string;
  role: string;
  photoUrl?: string;
  password: string;
  profile?: {
    bio?: string;
    age?: number;
  };
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserProfileUpdate = {
  name?: string;
  email?: string;
  username?: string;
  profile?: {
    bio?: string;
    age?: number;
  };
};

export type TUserPhotoUpdate = {
  photoUrl: string;
};

export type TUserPasswordChange = {
  oldPassword: string;
  newPassword: string;
};
