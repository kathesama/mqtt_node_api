/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { languageTypes } from '../../domain/enums/language.enum';
import { tokenTypes } from '../../domain/enums/token.enum';
import { verifyToken } from '../../helpers/token.helper';

const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: any, helpers: any) => {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

  if (!value.match(strongRegex)) {
    return helpers.message(
      'password is weak, must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character and eight characters or longer'
    );
  }
  return value;
};

/**
 * search in array all occurs from another array and return if match
 * */
const acceptedLanguage = (value: any, helpers: any) => {
  const index = value.indexOf(';') > -1 ? value.indexOf(';') : value.length;
  const match = new Array(...value.slice(0, index).split(/,|-|_/)).filter((item: string) => Object.values(languageTypes).includes(item.trim()));
  return match !== null ? match[0] : helpers.message('"{{#label}}" id not supported');
};

const isValidResetToken = async (key: string, helpers: any) => {
  const payload = await verifyToken(key, tokenTypes.RESET_PASSWORD, '');

  if (!payload) {
    return helpers.message('Invalid token');
  }

  return payload;
};

export { objectId, password, acceptedLanguage, isValidResetToken };
