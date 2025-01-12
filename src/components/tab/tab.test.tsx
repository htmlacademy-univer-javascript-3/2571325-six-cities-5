import { render, screen } from '@testing-library/react';
import Tab from './tab';
import { Cities } from '../../constants/cities';
import { MemoryRouter } from 'react-router-dom';

describe('Tab', () => {
  it('render tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Tab
          cityTitle={Cities.Paris}
          isActiveCity={false}
          handleChangeActiveCity={handleClick}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('tab')).toBeInTheDocument();
  });


  it('renders inactive tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Tab
          cityTitle={Cities.Paris}
          isActiveCity={false}
          handleChangeActiveCity={handleClick}
        />
      </MemoryRouter>
    );

    const tab = screen.getByText(Cities.Paris);
    expect(tab.parentElement).not.toHaveClass('tabs__item--active');
  });

  it('renders active tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Tab
          cityTitle={Cities.Paris}
          isActiveCity
          handleChangeActiveCity={handleClick}
        />
      </MemoryRouter>
    );

    const tab = screen.getByText(Cities.Paris);
    expect(tab.parentElement).toHaveClass('tabs__item--active');
  });
});
