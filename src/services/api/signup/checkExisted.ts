import { base, API_PATHS } from './../index';
export const checkPhone = async (params: { phone: string }) => {
  const result = await base.post(API_PATHS.CHECK_PHONE, params);
  return result.data;
};
