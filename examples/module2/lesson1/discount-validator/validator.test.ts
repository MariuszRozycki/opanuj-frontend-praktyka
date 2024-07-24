import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should not return any error with valid data', () => {
    const errors = formValidator('John', 'Doe', 30);
    expect(errors).toHaveLength(0);
  });

  test('should return an error if first name is empty or contains only white spaces', () => {
    const errors = formValidator('   ', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is empty or contains only white spaces', () => {
    const errors = formValidator('Marian', '  ', 30);
    expect(errors).toContain('Last name is required');
  });
});
