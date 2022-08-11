import { useParams } from 'react-router-dom';
import { RuxButton, RuxContainer } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useItem } from 'hooks';
import { setMediaUrl } from 'lib/utils';
import Breadcrums from 'components/breadcrums';
import MediaDisplay from 'components/media-display';
import './details.css';

export const Details: React.FC = () => {
  const { id } = useParams();
  const { items, search } = useAppContext();
  const item = useItem(items, id);

  if (!item) return <div>Loading...</div>;

  const {
    center,
    date_created,
    description,
    media_type,
    nasa_id,
    title,
    keywords,
  } = item.data[0];
  const src = setMediaUrl(nasa_id, media_type);

  return (
    <>
      <Breadcrums {...{ id, search }} />
      <main id='details-container'>
        <RuxContainer>
          <div slot='header' id='details-download'>
            <RuxButton icon='get-app'>DOWNLOAD</RuxButton>
            <code>{src}</code>
          </div>
          <div id='details-body'>
            <div id='details-left'>
              <MediaDisplay {...{ media_type, src, title }} />
            </div>
            <div id='details-right'>
              <div id='details-data'>
                <h3>{title}</h3>
                <p>NASA ID: {nasa_id}</p>
                <p id='details-description'>{description}</p>
                <p>Date Created: {date_created}</p>
                <p>Center: {center}</p>
                {keywords && (
                  <p>Keywords: {keywords.map(keyword => keyword)}</p>
                )}
              </div>
            </div>
          </div>
          <div slot='footer'>
            <RuxButton icon='add' secondary>
              SHOW EXIF DATA
            </RuxButton>
          </div>
        </RuxContainer>
      </main>

      <pre style={{ overflow: 'hidden', padding: 24 }}>
        {JSON.stringify(item, null, 2)}
      </pre>
    </>
  );
};
