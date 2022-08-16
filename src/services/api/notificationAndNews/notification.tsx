import {
  base,
  API_PATHS,
  privateRequestGetDelete,
  privateRequestPostPut,
} from '../index';

export const myNotification = async () => {
  const result = await privateRequestGetDelete(
    base.get,
    API_PATHS.NOTIFICATION,
  );

  return result.data;
};

export const readNotification = async (data: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.READ_NOTI,
    data,
  );
  return result.data;
};

export const readAllNotification = async () => {
  const result = await privateRequestPostPut(base.post, API_PATHS.READ_ALL);

  return result.data;
};
