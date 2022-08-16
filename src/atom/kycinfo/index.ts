import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const kycInfoState = atom({
  key: 'MAP_DATA_STATE',
  default: {
    countryCode: 'VN',
    countryName: 'VietNam',
    dateOfBirth: '2004-06-24',
    fullName: 'zxczxc',
    identificationCode: '123123',
    kycType: 'IDENTIFY_CARD',
  },
});

export const useKycInfoState = () => {
  return useRecoilState(kycInfoState);
};

export const useKycInfoStateValue = () => {
  return useRecoilValue(kycInfoState);
};

export const useSetKycInfoState = () => {
  return useSetRecoilState(kycInfoState);
};
