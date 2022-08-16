import { base, API_PATHS } from './../index';
export const getTypeTicket = async () => {
  const result = await base.get(API_PATHS.TICKET);
  return result.data;
};
