import { replaceString } from '@shopDunk/hooks/replaceString';
import i18n from '../i18n';

export const isNumber = (value: any) => {
  return /^\d[\d,]*$/.test(value.toLowerCase());
};

export const isPhoneNumber = (value: any) => {
  return /^[0-9]{10}$/.test(value.toLowerCase());
};

export const isCCCD = (value: any) => {
  return /^[0-9]{9,15}$/.test(value.toLowerCase());
};

export const isEmail = (value: any) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value.toLowerCase(),
  );
};

export const isPassword = (value: any) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z]).{8,16}$/.test(value);
};

export const validateNumber = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isNumber(value)) {
          throw new Error(i18n.t('invalid_number'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validatePhone = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isPhoneNumber(value)) {
          throw new Error(i18n.t('invalid_phone'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validatePhoneIsTheSame = (user_phone: string) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        const phoneValidateVn = replaceString('0', '84', value, 1);
        if (user_phone === phoneValidateVn) {
          throw new Error(i18n.t('phone_cannot_be_the_same'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validateCCCD = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isCCCD(value)) {
          throw new Error(i18n.t('invalid_cccd'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validateEmail = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isEmail(value)) {
          throw new Error(i18n.t('invalid_email'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validatePassword = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isPassword(value)) {
          throw new Error(i18n.t('invalid_password'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validateConfirmPassword = (form: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (value !== form.getFieldValue('new_password')) {
          throw new Error(i18n.t('password_not_match'));
        }
        return Promise.resolve();
      }
    },
  };
};

export const validateNewPassword = (form: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value === form.getFieldValue('old_password')) {
        throw new Error(i18n.t('password_match_old_password'));
      }
      return Promise.resolve();
    },
  };
};

export const validateMoneyAdd = () => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isNumber(value)) {
          throw new Error(i18n.t('invalid_money_type'));
        }
        if (value < 10000) {
          throw new Error(i18n.t('invalid_money'));
        }
      }
      return Promise.resolve();
    },
  };
};

export const validateMoneySmaller = (
  number: number,
  number2: number,
  form?: any,
) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        value = value.replace(/,/g, '');
        if (!isNumber(value)) {
          throw new Error(i18n.t('invalid_money_type'));
        }
        if (form.getFieldValue(['acc_type']).value === 1) {
          if (value > number) {
            throw new Error(i18n.t('invalid_money_bigger'));
          }
        } else {
          if (value > number2) {
            throw new Error(i18n.t('invalid_money_bigger'));
          }
        }
      }
      return Promise.resolve();
    },
  };
};
