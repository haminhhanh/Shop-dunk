import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const userDataState = atom({
  key: 'USER_DATA_STATE',
  default: {
    fullname: '',
    address: '',
    dob: '',
    phone: '',
    // email: '',
    gender: {
      label: '',
    },
    id_number: '',
    company_name: '',
    company_address: '',
    company_phone_number: '',
    tax: '',
    representative_title: '',
  },
});

export const useUserDataState = () => {
  return useRecoilState(userDataState);
};

export const useUserDataStateValue = () => {
  return useRecoilValue(userDataState);
};

export const useSetUserDataState = () => {
  return useSetRecoilState(userDataState);
};
