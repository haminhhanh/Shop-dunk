import { base, API_PATHS } from './../index';
export const signIn = async (params: {
  fcmToken: string;
  usernameOrPhone: string;
  password: string;
}) => {
  const result = await base.post(API_PATHS.SIGN_IN, params);
  return result.data;
};
