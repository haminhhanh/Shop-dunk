import { base, API_PATHS } from '../index';

export const scanLidBicycle = async (lid: string) => {
  const result = await base.get(API_PATHS.BICYCLE_SCAN(lid));
  return result.data;
};
