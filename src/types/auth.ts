export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  refreshToken?: string;
};
