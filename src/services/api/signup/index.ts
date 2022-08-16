import { base, API_PATHS } from './../index';
export const signup = async (params: {
  phone: string;
  idToken: string;
  password: string;
  fullName: string;
  // email: string;
  dateOfBirth: string;
  gender: string;
  referralCode: string;
}) => {
  const result = await base.post(API_PATHS.SIGN_UP, params);
  return result.data;
};
