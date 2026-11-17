//pet location render properly or not
//render information of name, age, shelter and link works properly

import { vi, test, expect } from 'vitest';
import { render, screen} from '@testing-library/react';
import MapComponent from './MapComponent';
import { MemoryRouter } from 'react-router-dom';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import { Children } from 'react';

//Check pet info on the map
vi.mock('react-leaflet', () => ({
  MapContainer: ({children}: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Marker: ({children}: any) => <div>{children}</div>,
  Popup: ({children}: any) => <div>{children}</div>
}));

test('should render pet info on the map', () => {
  const mockPets = [{
    _id: '1',
    name: "Buddy",
    type: "Dog",
    age: 3,
    location: { lat: 51.5074, lng: -0.1278 },
    city: "London",
    shelterName: "Together",
    phone: "123456789",
    email: "together@gmail.com",
    image: "/images/buddy.jpg",
    gender: "Male",
    favorite: false,
    breed: 'Poodle',
    available: true,
  }]
  render(
    <MemoryRouter>
      <MapComponent pets={mockPets}/>
    </MemoryRouter>
  )
  expect(screen.getByText('Buddy')).toBeInTheDocument();
  expect(screen.getByText('Age: 3')).toBeInTheDocument();

  const detailLink = screen.getByRole('link', {name: 'View Details'});
  expect(detailLink).toHaveAttribute('href', '/pets/1')
})
