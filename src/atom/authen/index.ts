import { storage, StorageKey } from '@shopDunk/storage';
import i18n from '@shopDunk/utils/i18n';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import dayjs from 'dayjs';
import { ATOM } from '../atom';
import { useMount } from 'ahooks';

type TAuthenState = {
  token: string | undefined;
  loading: boolean;
  reinitialized: boolean;
};

const initialState: TAuthenState = {
  token: undefined,
  loading: false,
  reinitialized: true,
};

export const authenAtom = atom<TAuthenState>({
  key: ATOM.AUTHEN,
  default: initialState,
});

export const useAuthenState = () => {
  return useRecoilState(authenAtom);
};

export const useAuthenStateValue = () => {
  return useRecoilValue(authenAtom);
};

export const useSetAuthenState = () => {
  return useSetRecoilState(authenAtom);
};

export const useRehydrateAuthenState = () => {
  const [, setAuthenState] = useAuthenState();

  useMount(() => {
    const locale = storage.getString(StorageKey.Language);
    const token = storage.getString(StorageKey.Authen);

    if (locale) {
      i18n.changeLanguage(locale ? locale : 'en');
    }

    setAuthenState({ loading: false, reinitialized: false, token: token });
  });
};

export const useChangeLanguage = () => {
  const [authenState, setAuthenState] = useAuthenState();
  const changeLanguage = (code: string) => {
    setAuthenState({ ...authenState, loading: true });

    if (code) {
      i18n.changeLanguage(code ? code : 'en');
      storage.set(StorageKey.Language, code);
      dayjs.locale(i18n.language);
    }

    setTimeout(() => {
      setAuthenState({ ...authenState, loading: false });
    }, 2000);
  };

  return { changeLanguage, authenState };
};
