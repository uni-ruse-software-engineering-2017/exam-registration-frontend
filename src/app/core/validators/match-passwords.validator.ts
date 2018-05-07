import { AbstractControl, FormGroup } from '@angular/forms';
import { Validator } from '@angular/forms';

export function MatchPasswordsValidator(form: FormGroup) {
  if (!form) {
    throw new Error(
      `MatchPasswordsValidator requires the parent form group to be passed as an argument.`
    );
  }

  const passwordField = form.get('password');
  const repeatPasswordField =
    form.get('repeatPassword') || form.get('confirmPassword');

  // call the validator function when the original password is changed
  // in order to keep the validity status in sync
  if (passwordField && repeatPasswordField) {
    passwordField.valueChanges.subscribe(() => {
      repeatPasswordField.updateValueAndValidity();
    });
  }

  return () => {
    if (passwordField === null || repeatPasswordField === null) {
      return null;
    }

    const password = passwordField.value as string;
    const repeatPassword = repeatPasswordField.value as string;

    if (!password.length || !repeatPassword.length) {
      return null;
    }

    if (password !== repeatPassword) {
      return {
        matchPasswords: true
      };
    }

    return null;
  };
}
