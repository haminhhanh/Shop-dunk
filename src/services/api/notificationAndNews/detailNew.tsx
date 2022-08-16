import { base, API_PATHS } from '../index';

export const detailNew = async (data: number) => {
  const result = await base.get(API_PATHS.DETAIL_NEW(data));
  return result.data;
};
