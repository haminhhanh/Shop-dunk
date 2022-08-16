import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const profileState = atom({
  key: 'PROFILE_STATE',
  default: {
    id: 1,
    type: '',
    phone: '',
    // email: '',
    AccountProfile: {
      id: '',
      address: '',
      province: '',
      district: '',
      full_name: '',
      kyc_info_id: '',
      avatar: '',
      date_created: '',
      date_modified: '',
      country: '',
      KycInfo: {
        id: 31,
        kyc_status: 'NOT_VERIFIED',
        identity_card_number: '',
        country_code: 'VN',
        passport_number: 'qdjd',
        dob: '2021-05-31T09:05:00.000Z',
        gender: 'MALE',
        full_name: 'test01',
        date_created: '2022-05-31T09:05:20.691Z',
        date_modified: '2022-05-31T09:05:34.863Z',
        kyc_back_url:
          'https://storage.googleapis.com/hillridge-fake-backend-bucket/media/12_kyc_back_url_2022-05-31T09:05:34.852Z.jpg',
        kyc_front_url: null,
        kyc_self_url: null,
      },
    },
  },
});

export const useProfileState = () => {
  return useRecoilState(profileState);
};

export const useProfileStateValue = () => {
  return useRecoilValue(profileState);
};

export const useSetProfileState = () => {
  return useSetRecoilState(profileState);
};
