import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const userTypeState = atom({
  key: 'USER_TYPE_STATE',
  default: '',
});

export const useUserTypeState = () => {
  return useRecoilState(userTypeState);
};

export const useUserTypeStateValue = () => {
  return useRecoilValue(userTypeState);
};

export const useSetUserTypeState = () => {
  return useSetRecoilState(userTypeState);
};
