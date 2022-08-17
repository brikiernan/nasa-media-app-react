import { useEffect, useRef, useState } from 'react';

import { useAppContext } from 'providers';
import { initialParams } from 'lib/const';
import './dual-range.css';

export const DualRange: React.FC = () => {
  const { params, setParams } = useAppContext();
  const [years, setYears] = useState<number[]>([]);
  const [maxVal] = useState(+initialParams.year_end);
  const [minVal] = useState(+initialParams.year_start);
  const endRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getPercent = (value: number) => {
      return Math.round(((value - minVal) / (maxVal - minVal)) * 100);
    };

    if (endRef.current && range.current) {
      const minPercent = getPercent(+params.year_start);
      const maxPercent = getPercent(+endRef.current.value);

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, params, maxVal]);

  useEffect(() => {
    const yearsDiff = +initialParams.year_end - +initialParams.year_start;
    const additionalTicks = 6;
    const additionalYears = yearsDiff / additionalTicks;
    const yearsArr: number[] = [];
    let year = +initialParams.year_start;
    for (let i = 0; additionalTicks >= i; i++) {
      if (i !== 0) year += additionalYears;
      yearsArr.push(Math.floor(year));
    }
    setYears(yearsArr);
  }, []);

  const handleStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({ ...prev, year_start: event.target.value }));
  };

  const handleEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({ ...prev, year_end: event.target.value }));
  };

  return (
    <div id='dual-range'>
      <input
        type='range'
        value={params.year_start}
        min={minVal}
        max={maxVal}
        onChange={handleStart}
      />
      <input
        ref={endRef}
        type='range'
        value={params.year_end}
        min={minVal}
        max={maxVal}
        onChange={handleEnd}
      />
      <div ref={range} id='dual-range-slider-overlay' />
      <div id='dual-range-ticks'>
        {years.map(year => (
          <div key={year} id='dual-range-tick'>
            <p>{year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
