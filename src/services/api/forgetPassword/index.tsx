import { base, API_PATHS } from './../index';
export const forgotPassword = async (params: {
  phone: string;
  idToken: string;
  password: string;
}) => {
  const result = await base.post(API_PATHS.RESET_PASSWORD, params);
  return result.data;
};
