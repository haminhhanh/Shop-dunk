import Configs from '@shopDunk/configs';
import axios, { AxiosInstance } from 'axios';

type MapSize = {
  vertical: number;
  horizontal: number;
};

type MapType = 'road' | 'terrain' | 'satellite' | 'hybrid';

type IGetImageInputs = {
  latitude: number;
  longitude: number;
  zoom: number;
  size: MapSize;
  maptype: MapType;
};

type TGoogleService = () => {
  getSuggestions: any;
  getPlacesDetails: any;
  getCurrentAddress: any;
  getFindPlace: any;
  getImage: (inputs: IGetImageInputs) => string;
};

type TPATHS = {
  [key: string]: string;
};

const PATHS: TPATHS = {
  AUTO_COMPLETE: '/place/autocomplete/json',
  GEOCODE: '/geocode/json',
  PLACE_DETAILS: '/place/details/json',
  FIND_PLACE: '/place/textsearch/json',
  STATIC_MAP: 'https://maps.googleapis.com/maps/api/staticmap',
};

type SuggestionsInput = {
  location?: string;
  input?: string;
  language?: 'vi' | 'en';
  types?: 'geocode' | 'address' | 'establishment';
};

const geocoder: AxiosInstance = axios.create({
  baseURL: 'https://maps.google.com/maps/api',
});

const place: AxiosInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

const GoogleService: TGoogleService = () => {
  const getSuggestions = async (params: SuggestionsInput) => {
    const result = await place.get(PATHS.AUTO_COMPLETE, {
      params: {
        ...params,
        key: Configs.GOOGLE_API_KEY,
        components: 'country:vn',
        location: 'latitude,longitude',
      },
    });

    return result.data;
  };

  const getFindPlace = async (params: SuggestionsInput) => {
    const result = await place.get(PATHS.FIND_PLACE, {
      params: {
        ...params,
        key: Configs.GOOGLE_API_KEY,
        language: 'vi',
      },
    });

    return result.data;
  };

  const getPlacesDetails = async (params: { place_id: string }) => {
    const result = await place.get(PATHS.PLACE_DETAILS, {
      params: { ...params, key: Configs.GOOGLE_API_KEY },
    });

    return result.data;
  };

  const getCurrentAddress = async ({
    latitude,
    longitude,
  }: {
    latitude: string | number;
    longitude: string | number;
  }) => {
    const result = await geocoder.get(PATHS.GEOCODE, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: Configs.GOOGLE_API_KEY,
      },
    });

    return result?.data?.results[0];
  };

  const getImage = ({
    latitude,
    longitude,
    zoom,
    size,
    maptype,
  }: IGetImageInputs) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size.horizontal}x${size.vertical}&maptype=${maptype}&key=${Configs.GOOGLE_API_KEY}`;
  };

  return {
    getSuggestions,
    getPlacesDetails,
    getCurrentAddress,
    getImage,
    getFindPlace,
  };
};

export default GoogleService();
