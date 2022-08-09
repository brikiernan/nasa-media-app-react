import { RuxButton, RuxCard } from '@astrouxds/react';
import { Link } from 'react-router-dom';

import { Item } from 'types';
import './media-item.css';

export const MediaItem: React.FC<Item> = ({ data, links }) => {
  if (!links) return null;
  const { description, nasa_id, title } = data[0];
  const { href } = links[0];

  return (
    <RuxCard id='media-item'>
      <div slot='header'>
        <div id='media-item-title'>{title}</div>
      </div>
      <img width='100%' alt={title} loading='lazy' src={href} />
      <div id='media-item-description'>
        <p>{description}</p>
      </div>
      <div slot='footer'>
        <Link to={`/${nasa_id}`}>
          <RuxButton borderless>View full details...</RuxButton>
        </Link>
      </div>
    </RuxCard>
  );
};
