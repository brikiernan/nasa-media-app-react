import {
  RuxContainer,
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxCheckbox,
  RuxIcon,
  RuxSlider,
  RuxButton,
} from '@astrouxds/react';

import { useFilter } from 'hooks';
import './media-filter.css';

export const MediaFilter: React.FC = () => {
  const { handleChange, handleClick, isMatch, mediaChecked } = useFilter();

  return (
    <RuxContainer id='media-filter'>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Filter Results By</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          <RuxTableRow>
            <RuxTableCell id='media-filter-cell'>
              <RuxCheckbox
                id='images'
                checked={mediaChecked.images}
                onRuxchange={handleChange}
              />
              <RuxIcon size='1.5rem' icon='photo-library' />
              Images
            </RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell id='media-filter-cell'>
              <RuxCheckbox
                id='videos'
                checked={mediaChecked.videos}
                onRuxchange={handleChange}
              />
              <RuxIcon size='1.5rem' icon='videocam' />
              Videos
            </RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell id='media-filter-cell'>
              <RuxCheckbox
                id='audio'
                checked={mediaChecked.audio}
                onRuxchange={handleChange}
              />
              <RuxIcon size='1.5rem' icon='mic' />
              Audio
            </RuxTableCell>
          </RuxTableRow>
        </RuxTableBody>
      </RuxTable>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Narrow By Year</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          <RuxTableRow>
            <RuxTableCell>
              <RuxSlider />
            </RuxTableCell>
          </RuxTableRow>
        </RuxTableBody>
      </RuxTable>
      {!isMatch && (
        <RuxButton onClick={handleClick} slot='footer'>
          Update Results
        </RuxButton>
      )}
    </RuxContainer>
  );
};
