import {test, expect} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';

//Test email and password input handling
test('should update email and password inputs on change', () => {
  render(
    <MemoryRouter>
        <LoginPage/>
    </MemoryRouter>
  )
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  fireEvent.change(emailInput, {target: {value: 'test@gmail.com'}});
  fireEvent.change(passwordInput, {target: {value: 'password'}});

  expect(emailInput).toHaveValue('test@gmail.com');
  expect(passwordInput).toHaveValue('password');
})
