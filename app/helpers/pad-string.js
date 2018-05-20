import { helper } from '@ember/component/helper';

export function padString([value, length, padStr]) {
  return String(value).padStart(length, padStr);
}

export default helper(padString);
