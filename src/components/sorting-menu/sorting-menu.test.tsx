import { render, screen, fireEvent } from '@testing-library/react';
import { SortingType } from '../../types/sort';
import SortingMenu from '../../components/sorting-menu/sorting-menu';

describe('SortingMenu Component', () => {
  const mockOnToggle = vi.fn();
  const mockOnTypeChange = vi.fn();

  const defaultProps = {
    isOpen: false,
    onToggle: mockOnToggle,
    sortingType: SortingType.Popular,
    onTypeChange: mockOnTypeChange
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial sorting type', () => {
    render(<SortingMenu {...defaultProps} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(SortingType.Popular)).toBeInTheDocument();
  });

  it('toggles menu visibility when clicking on sorting type', () => {
    render(<SortingMenu {...defaultProps} />);

    fireEvent.click(screen.getByText(SortingType.Popular));
    expect(mockOnToggle).toHaveBeenCalled();
  });

  it('shows sorting options when menu is open', () => {
    // eslint-disable-next-line
    render(<SortingMenu {...defaultProps} isOpen={true} />);

    [SortingType.LowToHight, SortingType.HightToLow, SortingType.TopRating].forEach((type)=> {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('calls onTypeChange when selecting a sorting option', () => {
    // eslint-disable-next-line
    render(<SortingMenu {...defaultProps} isOpen={true} />);

    fireEvent.click(screen.getByText(SortingType.TopRating));
    expect(mockOnTypeChange).toHaveBeenCalledWith(SortingType.TopRating);
  });
});
