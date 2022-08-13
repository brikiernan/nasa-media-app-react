import { RuxCard, RuxIcon } from '@astrouxds/react';
import { Link } from 'react-router-dom';

import { Item } from 'types';
import './media-item.css';

export const MediaItem: React.FC<Item> = ({ data, links }) => {
  const { description, nasa_id, title, media_type } = data[0];

  return (
    <Link id='media-item-link' to={`/${nasa_id}`}>
      <RuxCard id='media-item'>
        {links ? (
          <div id='media-item-icon'>
            <img width='100%' alt={title} loading='lazy' src={links[0].href} />
            {media_type === 'video' && (
              <RuxIcon icon='play-arrow' size='6rem' />
            )}
          </div>
        ) : (
          <div id='media-item-audio'>
            <RuxIcon size='6rem' icon='audiotrack' />
          </div>
        )}
        <div id='media-item-title'>
          <h3>{title}</h3>
        </div>
        <div id='media-item-description'>
          <p>{description}</p>
        </div>
        <footer slot='footer'>View full details...</footer>
      </RuxCard>
    </Link>
  );
};
