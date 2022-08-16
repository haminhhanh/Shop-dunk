import { API_PATHS, TokenManager } from '../index';

export const upload = async (
  data: any,
  onSuccess?: any,
  onError?: any,
  onRefresh?: any,
) => {
  const formData = new FormData();
  formData.append('files', {
    originalname: data.filename,
    name: data.fileName,
    type: data.type,
    uri: data.uri,
  });
  const token = await TokenManager.getToken();
  fetch(`http://34.143.191.39:4000${API_PATHS.UPLOAD_FILE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      onSuccess && onSuccess(res);
    })
    .then(() => {
      onRefresh && onRefresh();
    })
    .catch(e => onError(e));
};
