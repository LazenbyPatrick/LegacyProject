import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { test, expect } from 'vitest';

//Render the App component, find the main container element, and verify it exists in the document
test('App rendering', () => {
  render(<App/>);
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
})