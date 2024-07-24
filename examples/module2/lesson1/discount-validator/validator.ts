export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  // trim() is used to remove leading and trailing white spaces.
  // This ensures that firstName and lastName must contain at least one non-white-space character.

  if (!firstName.trim()) {
    errors.push('First name is required');
  }

  if (!lastName.trim()) {
    errors.push('Last name is required');
  }

  if (typeof age !== 'number' || isNaN(age)) {
    throw new Error('Age must be a number');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  return errors;
}
