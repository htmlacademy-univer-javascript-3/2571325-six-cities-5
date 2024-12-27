import React from 'react';
import Tab from '../tab/tab';

interface TabsProps {
  citiesTitles: string[];
  activeCityIndex: number;
  setActiveCityIndex: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ citiesTitles, activeCityIndex, setActiveCityIndex }) => {

  const handleChangeActiveCityIndex = (index: number) => {
    setActiveCityIndex(index);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesTitles.map((cityTitle, index) => (
            <Tab
              key={`${cityTitle}-items`}
              cityTitle={cityTitle}
              cityIndex={index}
              isActiveCity={activeCityIndex === index}
              handleChangeActiveCityIndex={handleChangeActiveCityIndex}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
