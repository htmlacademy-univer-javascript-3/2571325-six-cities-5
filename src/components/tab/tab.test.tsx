import { render, screen } from '@testing-library/react';
import Tab from './tab';
import { Cities } from '../../constants/cities';

describe('Tab', () => {
  it('render tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <Tab
        cityTitle={Cities.Paris}
        isActiveCity={false}
        handleChangeActiveCity={handleClick}
      />
    );
    expect(screen.getByTestId('tab')).toBeInTheDocument();
  });


  it('renders inactive tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <Tab
        cityTitle={Cities.Paris}
        isActiveCity={false}
        handleChangeActiveCity={handleClick}
      />
    );

    const tab = screen.getByText(Cities.Paris);
    expect(tab.parentElement).not.toHaveClass('tabs__item--active');
  });

  it('renders active tab correctly', () => {
    const handleClick = vi.fn();
    render(
      <Tab
        cityTitle={Cities.Paris}
        isActiveCity
        handleChangeActiveCity={handleClick}
      />
    );

    const tab = screen.getByText(Cities.Paris);
    expect(tab.parentElement).toHaveClass('tabs__item--active');
  });
});
