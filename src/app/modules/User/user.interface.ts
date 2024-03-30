export type TUserRegister = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};

export type TUserLogin = {
  email: string;
  password: string;
};
