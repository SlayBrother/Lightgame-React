import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

describe('Board component', () => {
    test('renders with default props', () => {
        const { getByText } = render(<Board />);
        expect(getByText('Board')).toBeInTheDocument(); // Assuming 'Board' is part of className
    });

    test('creates board with correct dimensions', () => {
        const { container } = render(<Board nrows={5} ncols={5} />);
        const cells = container.querySelectorAll('.Cell');
        expect(cells.length).toBe(25); // 5x5 grid
    });

    test('flips cells correctly on click', () => {
        const { container } = render(<Board nrows={3} ncols={3} />);
        const cellToClick = container.querySelector('.Cell');

        fireEvent.click(cellToClick);
        expect(cellToClick).toHaveClass('lit'); // Assuming 'lit' is the class applied when a cell is lit
    });

    test('winning condition is triggered when all cells are off', () => {
        const { container, getByText } = render(<Board nrows={2} ncols={2} />);
        const cells = container.querySelectorAll('.Cell');

        // Click all cells to turn them off
        cells.forEach(cell => fireEvent.click(cell));

        expect(getByText('You Win!')).toBeInTheDocument();
    });
});