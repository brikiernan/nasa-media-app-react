import { useParams } from 'react-router-dom';
import { RuxButton, RuxContainer } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useAssets, useItem } from 'hooks';
import { setMediaUrl } from 'lib/utils';
import Breadcrumbs from 'components/breadcrumbs';
import MediaDisplay from 'components/media-display';
import './details.css';

export const Details: React.FC = () => {
  const { id } = useParams();
  const { items, search } = useAppContext();
  const item = useItem(items, id);
  const assets = useAssets(item?.href, id, item?.data[0].media_type);

  if (!item) return <div>Loading...</div>;

  const {
    center,
    date_created,
    description,
    media_type,
    nasa_id,
    title,
    keywords,
    location,
    photographer,
  } = item?.data[0];
  const src = setMediaUrl(nasa_id, media_type, 'medium');

  return (
    <>
      <Breadcrumbs {...{ id, search }} />
      <main id='details-container'>
        <RuxContainer>
          <div slot='header' id='details-download'>
            <RuxButton icon='get-app'>DOWNLOAD</RuxButton>
            <code>{assets.origin || assets.large}</code>
          </div>
          <div id='details-body'>
            <div id='details-left'>
              <MediaDisplay {...{ media_type, src, title }} />
            </div>
            <div id='details-right'>
              <div id='details-data'>
                <h3>{title}</h3>
                <p>
                  <b>NASA ID:</b> <span id='details-nasa-id'>{nasa_id}</span>
                </p>
                <p id='details-description'>{description}</p>
                <p>
                  <b>Date Created:</b>{' '}
                  {new Date(date_created).toLocaleDateString()}
                </p>
                <p>
                  <b>Center:</b> {center}
                </p>
                {keywords && (
                  <p>
                    <b>Keywords:</b> {keywords.map(keyword => keyword)}
                  </p>
                )}
                {location && (
                  <p>
                    <b>Location:</b> {location}
                  </p>
                )}
                {photographer && (
                  <p>
                    <b>Photographer:</b> {photographer}
                  </p>
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
