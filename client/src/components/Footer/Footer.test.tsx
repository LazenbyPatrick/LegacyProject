import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

//Render the Footer component, find the texts, and verify it exists in the document 
test('should render Footer component correctly', () => {
  render(<Footer/>)
  expect(screen.getByText(/Resources/i)).toBeInTheDocument();
  expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
})

//Check if the current year is displayed dynamically
test('should display current year', () => {
  render(<Footer/>)
  const currentYear = new Date().getFullYear().toString();
  expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
})