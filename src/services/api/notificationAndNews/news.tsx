import { base, API_PATHS } from '../index';

export const allNews = async () => {
  const result = await base.get(API_PATHS.NEWS);
  return result.data;
};
