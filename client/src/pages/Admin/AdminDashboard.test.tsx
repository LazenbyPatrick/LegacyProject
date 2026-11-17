
import {test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';


//Verified that button is correctly linked to the route
test('should navigate to the page when clicking the button', () => {
  render(
    <MemoryRouter>
      <AdminDashboard/>
    </MemoryRouter>
  )
  const link = screen.getByRole('link', {name: 'Pet Listings'});
  expect(link).toHaveAttribute('href', '/dashboard/list');

  const messageLink = screen.getByRole('link', {name: 'Messages'});
  expect(messageLink).toHaveAttribute('href', '/dashboard/messages');
})