import { FormControl } from '@angular/forms';

export function PhoneNumberValidator(
  c: FormControl
): { [key: string]: any } | null {
  const PHONE_REGEXP = /^(\+|0)[1-9]{1}[0-9\s]{1,15}$/;

  return PHONE_REGEXP.test(c.value)
    ? null
    : {
        phone: {
          valid: false,
          error: true
        }
      };
}
