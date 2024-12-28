import React from 'react';
import { SortingType } from '../../types/sort';

interface SortingMenuProps {
  isOpenSortingMenu: boolean;
  setIsOpenSortingMenu: React.Dispatch<React.SetStateAction<boolean>>;
  sortingType: SortingType;
  setSortingType: React.Dispatch<React.SetStateAction<SortingType>>;
}

const SortingMenu: React.FC<SortingMenuProps> = (props) => {
  const { isOpenSortingMenu, setIsOpenSortingMenu, sortingType, setSortingType } = props;
  const sortingOptions: SortingType[] = [SortingType.Popular, SortingType.LowToHight, SortingType.HightToLow, SortingType.TopRating];

  const handleChangeMenuState = () => {
    setIsOpenSortingMenu((prevState) => !prevState);
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
        isOpenSortingMenu && (
          <ul className="places__options places__options--custom places__options--opened">
            {sortingOptions.map((option) => (
              <li
                key={option}
                className={`places__option ${sortingType === option ? 'places__option--active' : ''}`}
                tabIndex={0}
                onClick={() => setSortingType(option)}
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

export default SortingMenu;
