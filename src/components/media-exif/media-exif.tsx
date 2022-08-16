import { useEffect, useState } from 'react';
import {
  RuxButton,
  RuxCard,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableRow,
} from '@astrouxds/react';

import type { ExifData } from 'types';
import './media-exif.css';

type MediaExifProps = {
  exif: ExifData;
  nasa_id: string;
};

export const MediaExif: React.FC<MediaExifProps> = props => {
  const [isShowExif, setIsShowExif] = useState(false);
  const handleShowExif = async () => setIsShowExif(prev => !prev);

  useEffect(() => {
    if (isShowExif) {
      const top = document.body.scrollHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [isShowExif]);

  return (
    <>
      <RuxButton
        icon={isShowExif ? 'remove' : 'add'}
        secondary
        onClick={handleShowExif}
      >
        Show EXIF Data
      </RuxButton>
      <RuxCard id='media-exif-card' className={isShowExif ? 'show' : ''}>
        <div slot='header'>EXIF data for {props.nasa_id}</div>
        <RuxTable>
          <RuxTableBody>
            {Object.entries(props.exif).map(entry => (
              <RuxTableRow key={entry[0]}>
                <RuxTableCell>{entry[0]}:</RuxTableCell>
                <RuxTableCell>{entry[1]}</RuxTableCell>
              </RuxTableRow>
            ))}
          </RuxTableBody>
        </RuxTable>
        <div slot='footer'>
          <RuxButton
            borderless
            icon='expand-less'
            onClick={() => setIsShowExif(false)}
          >
            Collapse
          </RuxButton>
        </div>
      </RuxCard>
    </>
  );
};
