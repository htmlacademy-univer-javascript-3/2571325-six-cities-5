import React, { useMemo } from 'react';
import { SortingType } from '../../types/sort';

interface SortingMenuProps {
  isOpen: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  sortingType: SortingType;
  onTypeChange: (type: SortingType) => void;
}

const SortingMenu: React.FC<SortingMenuProps> = (props) => {
  const { isOpen, onToggle, sortingType, onTypeChange } = props;
  const sortingOptions = useMemo(() => [
    SortingType.Popular,
    SortingType.LowToHight,
    SortingType.HightToLow,
    SortingType.TopRating
  ], []);

  const handleChangeMenuState = () => {
    onToggle((prevState) => !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleChangeMenuState}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4" onClick={handleChangeMenuState}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        isOpen && (
          <ul className="places__options places__options--custom places__options--opened">
            {sortingOptions.map((option) => (
              <li
                key={option}
                className={`places__option ${sortingType === option ? 'places__option--active' : ''}`}
                tabIndex={0}
                onClick={() => onTypeChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )
      }
    </form>
  );
};

const MemoizedMenu = React.memo(SortingMenu);
export default MemoizedMenu;
