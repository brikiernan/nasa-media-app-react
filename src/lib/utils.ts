import { Item, MediaType } from 'types';
import { imagesAssets } from './const';

export const findItem = (items: Item[], id?: string) => {
  return items.find(({ data }) => data[0].nasa_id === id);
};

export const setMediaUrl = (id: string, type: MediaType, size?: string) => {
  const base = `${imagesAssets}/${type}/${id}/${id}~${size || 'orig'}`;
  if (type === 'audio') return base + '.mp3';
  if (type === 'video') return base + '.mp4';
  return base + '.jpg';
};
