import { useAppContext } from 'providers';
import './dual-range.css';

export const DualRange: React.FC = () => {
  const year = new Date().getFullYear();
  const { params, setParams } = useAppContext();

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
        min={1920}
        max={year}
        onChange={handleStart}
      />
      <input
        type='range'
        value={params.year_end}
        min={1920}
        max={year}
        onChange={handleEnd}
      />
    </div>
  );
};
