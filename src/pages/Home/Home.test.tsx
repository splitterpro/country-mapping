import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Countries title', () => {
  render(<Home />);
  expect(screen.getByText(/Countries/i)).toBeInTheDocument();
}); 