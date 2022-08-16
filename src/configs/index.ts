import { API_URL, GOOGLE_API_KEY, HEX_KEY, HEX_TOKEN_MESSAGE } from '@env';

type Config = {
  API_URL: string;
  GOOGLE_API_KEY: string;
  HEX_KEY: string;
  HEX_TOKEN_MESSAGE: string;
};

const Configs: Config = {
  API_URL,
  GOOGLE_API_KEY,
  HEX_KEY,
  HEX_TOKEN_MESSAGE,
};

export default Configs;
