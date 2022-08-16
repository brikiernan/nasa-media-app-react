import { useParams } from 'react-router-dom';
import { RuxContainer } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useAssets, useItem } from 'hooks';
import NotFound from 'components/not-found';
import Loading from 'components/loading';
import Breadcrumbs from 'components/breadcrumbs';
import MediaDownload from 'components/media-download';
import MediaDisplay from 'components/media-display';
import MediaExif from 'components/media-exif';
import './details.css';
import { Path } from 'lib/const';

export const Details: React.FC = () => {
  const { id } = useParams();
  const { items, params, search } = useAppContext();
  const { item, notFound } = useItem(items, id);

  const { exif, thumb, ...sizeAssets } = useAssets({
    href: item?.href,
    id,
    type: item?.data[0].media_type,
  });

  const { large, medium, original, small } = sizeAssets;
  const src = medium || large || original || small || thumb || '';

  if (notFound) return <NotFound />;
  if (!item) return <Loading />;

  const setSearchPath = (query: string) => {
    const { media_type, page, year_end, year_start } = params;
    return `${Path.search}?q=${query}&page=${page}&media_type=${media_type}&year_start=${year_start}&year_end=${year_end}`;
  };

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
          <div id='details-header' slot='header'>
            <code>{original || large || medium || small}</code>
          </div>
          <div id='details-body'>
            <div id='details-left'>
              <MediaDisplay {...{ media_type, src, title }} />
            </div>
            <div id='details-right'>
              <div id='details-data'>
                <MediaDownload {...sizeAssets} href={original || large} />
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
              <MediaExif {...{ exif, nasa_id }} />
            </div>
          )}
        </RuxContainer>
      </main>
    </>
  );
};
