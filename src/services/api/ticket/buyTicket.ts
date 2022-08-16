import { base, API_PATHS, privateRequestPostPut } from './../index';
export const buyTicket = async (params: { quantity: number }) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.TICKET_BUY,
    params,
  );
  return result.data;
};
