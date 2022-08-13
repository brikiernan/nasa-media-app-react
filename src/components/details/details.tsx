import { useParams } from 'react-router-dom';
import { RuxContainer, RuxIndeterminateProgress } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useAssets, useItem } from 'hooks';
import { setSearchPath } from 'lib/utils';
import Breadcrumbs from 'components/breadcrumbs';
import MediaDownload from 'components/media-download';
import MediaDisplay from 'components/media-display';
import Exif from 'components/exif';
import './details.css';

export const Details: React.FC = () => {
  const { id } = useParams();
  const { items, search } = useAppContext();
  const item = useItem(items, id);

  const { exif, thumb, ...sizeAssets } = useAssets({
    href: item?.href,
    id,
    type: item?.data[0].media_type,
  });

  const { large, medium, original, small } = sizeAssets;
  const src = medium || large || original || small || thumb || '';

  if (!item)
    return (
      <div className='flex-center'>
        <RuxIndeterminateProgress />
      </div>
    );

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

  return (
    <>
      <Breadcrumbs {...{ id, search }} />
      <main id='details-container'>
        <RuxContainer>
          <MediaDownload {...sizeAssets} href={original || large} />
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
                  <b>Center:</b> <a href={setSearchPath(center)}>{center}</a>
                </p>
                {keywords && (
                  <p>
                    <b>Keywords:</b>{' '}
                    {keywords.map(keyword => (
                      <a key={keyword} href={setSearchPath(keyword)}>
                        {keyword}
                        <span id='details-keyword'>,</span>
                      </a>
                    ))}
                  </p>
                )}
                {location && (
                  <p>
                    <b>Location:</b>{' '}
                    <a href={setSearchPath(location)}>{location}</a>
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
          {exif && (
            <div slot='footer'>
              <Exif {...{ exif, nasa_id }} />
            </div>
          )}
        </RuxContainer>
      </main>
    </>
  );
};
