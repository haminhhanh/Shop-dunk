import { base, API_PATHS } from '../index';

export const suggestLocation = async () => {
  const result = await base.get(API_PATHS.SUGGEST_LOCATION);

  return result.data;
};
