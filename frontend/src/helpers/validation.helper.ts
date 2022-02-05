export const DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY = '(only digits, Latin letters and special characters allowed)';
export const LATIN_LETTER_ONLY = '(only Latin letters allowed)';
export const DIGITS_LATIN_LETTERS_ONLY = '(only digits, Latin letters allowed)';
export const DIGITS_ONLY = '(only digits allowed)';
export const TITLE_MESSAGE = `Title length must be 1-40 symbols ${DIGITS_LATIN_LETTERS_ONLY}.`;
export const MACS_MESSAGE = `Invalid MAC address entry ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const IPS_MESSAGE = `Invalid IP address entry ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PORTS_MESSAGE = `Invalid port entry ${DIGITS_ONLY}.`;
// export const PAYLOAD_MESSAGE = 'Payload length must be 1-200 symbols.';

/* eslint-disable max-len */
const titleRegex = /^[A-Za-zА-ЯЄІЇЩа-яєіїш0-9 _.-]*$/;
const macRegex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const portRegex = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;
const emailRegex = /^(([!#$%&'*+-/=?^_`{|A-Za-z0-9]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((?![-])([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

export const isValidTitle = (str: string): boolean => titleRegex.test(str.toLowerCase()) && str.length >= 1 && str.length <= 40;
export const isValidMacs = (str: string): boolean => str.split('~').every(mac => macRegex.test(mac));
export const isValidIps = (str: string): boolean => str.split('~').every(ip => ipRegex.test(ip));
export const isValidPorts = (str: string): boolean => str.split('~').every(port => portRegex.test(port));
// export const isValidPayload = (str: string): boolean => str.length >= 1 && str.length <= 200;
