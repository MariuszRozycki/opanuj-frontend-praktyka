// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { renderItems } from './renderer';

const users: User[] = [
  { id: 1, name: 'John', age: 30, role: 'user' },
  { id: 2, name: 'Jane', age: 25, role: 'admin' },
  { id: 3, name: 'Jack', age: 40, role: 'user' },
];

describe('when admin is rendering the list', () => {
  test('should render all users', () => {
    localStorage.setItem('userRole', 'admin');
    const container = document.createElement('div');
    renderItems(container, users);
    const listItems = Array.from(container.querySelectorAll('li'));
    expect(listItems).toHaveLength(3);
  });

  test('should render correct user data', () => {
    localStorage.setItem('userRole', 'admin');
    const container = document.createElement('div');
    renderItems(container, users);
    const listItems = Array.from(container.querySelectorAll('li'));
    expect(listItems[0].textContent).toBe('(User) Name: John, Age: 30');
    expect(listItems[1].textContent).toBe('(Admin) Name: Jane, Age: 25');
    expect(listItems[2].textContent).toBe('(User) Name: Jack, Age: 40');
  });
});

describe('when non-admin is rendering the list', () => {
  test('should render only regular users', () => {
    localStorage.setItem('userRole', 'user');
    const container = document.createElement('div');
    renderItems(container, users);
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
  });

  test('should render correct user data for regular users', () => {
    localStorage.setItem('userRole', 'user');
    const container = document.createElement('div');
    renderItems(container, users);
    const listItems = Array.from(container.querySelectorAll('li'));
    expect(listItems[0].textContent).toBe('(User) Name: John, Age: 30');
    expect(listItems[1].textContent).toBe('(User) Name: Jack, Age: 40');
  });
});
