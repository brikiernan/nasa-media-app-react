import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppContext } from 'providers';
import { initialParams } from 'lib/const';
import './dual-range.css';

export const DualRange: React.FC = () => {
  const { params, setParams } = useAppContext();
  const [maxVal] = useState(+initialParams.year_end);
  const [minVal] = useState(+initialParams.year_start);
  const endRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - minVal) / (maxVal - minVal)) * 100);
    },
    [maxVal, minVal]
  );

  useEffect(() => {
    if (endRef.current) {
      const minPercent = getPercent(+params.year_start);
      const maxPercent = getPercent(+endRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent, params]);

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
    </div>
  );
};
