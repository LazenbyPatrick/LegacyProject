import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

//Check when logout, can see login
test('should render login link when user logged out ', () => {
  localStorage.removeItem("token")
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
  expect(screen.getByText('Login')).toBeInTheDocument();
})

//when login, can see logout
test('should render logout when user logged in', () => {
  localStorage.setItem('token', 'fake-token')
  render(
    <MemoryRouter>
      <Navbar/>
    </MemoryRouter>
  )
  const logoutButton = screen.getByRole('button', {name: 'Logout'});
  expect(logoutButton).toBeInTheDocument();

  fireEvent.click(logoutButton);
  expect(localStorage.getItem('token')).toBeNull();
})