import {test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PetCard from './PetCard';

//Render pet name, image, and detail link properly
test('should render pet name, image, link',() => {
  const mockPet = {
    _id: "1",
    name: "Buddy",
    image: "images/buddy.jpg"
  }
  render (
    <MemoryRouter>
      <PetCard pet={mockPet}/>
    </MemoryRouter>
  )
  expect(screen.getByText('Buddy')).toBeInTheDocument();

  const image = screen.getByRole('img', {name: 'Buddy'});
  expect(image).toHaveAttribute('src', 'images/buddy.jpg');

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/pets/1');
})
